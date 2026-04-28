// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

// 导入数据模块
const { pokedex, findPokemon } = require('./data/pokemon');
const { movesDB } = require('./data/moves');
const { typeEffectiveness, getEffectivenessMultiplier } = require('./data/typeChart');
const { teamTemplates } = require('./data/templates');
const { calculateDamage, calculateStat } = require('./utils/damageCalculator');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors()); // 允许跨域
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 存储对战同步数据（内存存储，生产环境建议使用数据库）
let battleSyncStore = [];

// ========== API 路由 ==========

/**
 * GET /api/pokemon/:nameOrId
 * 获取宝可梦基本信息（种族值、属性、特性池、招式池）
 */
app.get('/api/pokemon/:nameOrId', (req, res) => {
    const { nameOrId } = req.params;
    const pokemon = findPokemon(nameOrId);
    
    if (!pokemon) {
        return res.status(404).json({ error: 'Pokemon not found', message: `未找到宝可梦: ${nameOrId}` });
    }
    
    // 返回简化但完整的信息
    const response = {
        id: pokemon.id,
        name: pokemon.name,
        types: pokemon.types,
        baseStats: pokemon.baseStats,
        abilities: pokemon.abilities,
        moves: pokemon.learnableMoves || [], // 可学习的招式列表（名称）
        genderRatio: pokemon.genderRatio || 'genderless',
        evolution: null,
    };
    
    res.json(response);
});

/**
 * GET /api/team/templates
 * 获取预设的竞技场常用队伍模板
 */
app.get('/api/team/templates', (req, res) => {
    res.json({
        success: true,
        templates: teamTemplates,
        count: teamTemplates.length
    });
});

/**
 * POST /api/battle/sync
 * 上传当前前端状态，保存对战记录
 * 请求体示例: { battleState, playerTeam, enemyTeam, timestamp }
 */
app.post('/api/battle/sync', (req, res) => {
    const syncData = req.body;
    
    if (!syncData || Object.keys(syncData).length === 0) {
        return res.status(400).json({ error: 'Invalid data', message: '请求体不能为空' });
    }
    
    const record = {
        id: generateSyncId(),
        timestamp: new Date().toISOString(),
        data: syncData,
    };
    
    battleSyncStore.push(record);
    // 限制存储数量最多100条，避免内存无限增长
    if (battleSyncStore.length > 100) battleSyncStore.shift();
    
    res.json({
        success: true,
        message: '对战状态已同步',
        syncId: record.id,
        storedCount: battleSyncStore.length
    });
});

/**
 * GET /api/battle/sync/:id? (可选)
 * 获取历史同步记录，如果提供ID则返回单条，否则返回所有记录摘要
 */
app.get('/api/battle/sync/:id?', (req, res) => {
    const { id } = req.params;
    
    if (id) {
        const record = battleSyncStore.find(r => r.id === id);
        if (!record) {
            return res.status(404).json({ error: 'Not found', message: `未找到同步记录: ${id}` });
        }
        return res.json(record);
    }
    
    // 返回所有记录的摘要（不包含完整data，节约带宽）
    const summaries = battleSyncStore.map(r => ({
        id: r.id,
        timestamp: r.timestamp,
        hasData: !!r.data
    }));
    res.json({ total: battleSyncStore.length, records: summaries });
});

/**
 * POST /api/battle/calc_damage
 * 伤害计算接口
 * 请求体: 
 * {
 *   attacker: { pokemonName: string, moveName: string, attackBoost?: number, specialBoost?: number, ... },
 *   defender: { pokemonName: string, defenseBoost?: number, spDefBoost?: number, ... },
 *   // 可选覆盖能力值: attackerAtk, defenderDef 等
 * }
 * 返回伤害预估区间
 */
app.post('/api/battle/calc_damage', (req, res) => {
    try {
        const { attacker, defender } = req.body;
        
        if (!attacker || !defender) {
            return res.status(400).json({ error: 'Missing parameters', message: '需要 attacker 和 defender 字段' });
        }
        
        // 获取攻击方宝可梦数据
        const attackerPokemon = findPokemon(attacker.pokemonName);
        if (!attackerPokemon) {
            return res.status(404).json({ error: 'Pokemon not found', message: `未找到攻击方宝可梦: ${attacker.pokemonName}` });
        }
        
        // 获取招式信息
        const moveName = attacker.moveName;
        const move = movesDB[moveName];
        if (!move) {
            return res.status(404).json({ error: 'Move not found', message: `未找到招式: ${moveName}` });
        }
        
        // 获取防御方宝可梦数据
        const defenderPokemon = findPokemon(defender.pokemonName);
        if (!defenderPokemon) {
            return res.status(404).json({ error: 'Pokemon not found', message: `未找到防御方宝可梦: ${defender.pokemonName}` });
        }
        
        // 获取或计算攻击方的实际攻击/特攻能力值 (默认为50级，无努力，性格中性)
        const level = 50;
        let attackStat;
        if (move.category === 'physical') {
            attackStat = attacker.attackStat || calculateStat(attackerPokemon.baseStats.attack, 31, 0, level, false);
        } else {
            attackStat = attacker.spAttackStat || calculateStat(attackerPokemon.baseStats.spAttack, 31, 0, level, false);
        }
        
        // 防御方的防御/特防
        let defenseStat;
        if (move.category === 'physical') {
            defenseStat = defender.defenseStat || calculateStat(defenderPokemon.baseStats.defense, 31, 0, level, false);
        } else {
            defenseStat = defender.spDefenseStat || calculateStat(defenderPokemon.baseStats.spDefense, 31, 0, level, false);
        }
        
        // 属性倍率计算
        const effectiveness = getEffectivenessMultiplier(move.type, defenderPokemon.types);
        
        // 其他加成暂不考虑，暴击默认不计算，特性忽略
        // 计算伤害范围
        const damageRange = calculateDamage({
            level,
            power: move.power,
            attack: attackStat,
            defense: defenseStat,
            effectiveness,
            randomRange: [0.85, 1.0],
            stab: move.type === attackerPokemon.types[0] ? 1.5 : 1.0, // 简单本系加成
            otherModifiers: 1.0
        });
        
        // 转换为整数伤害值
        const minDamage = Math.floor(damageRange.min);
        const maxDamage = Math.floor(damageRange.max);
        
        // 预估目标HP百分比 (可选)
        const defenderHP = defender.hpStat || calculateStat(defenderPokemon.baseStats.hp, 31, 0, level, true);
        const minPercent = (minDamage / defenderHP) * 100;
        const maxPercent = (maxDamage / defenderHP) * 100;
        
        res.json({
            success: true,
            damage: {
                min: minDamage,
                max: maxDamage,
                range: `${minDamage} ~ ${maxDamage}`
            },
            percent: {
                min: minPercent.toFixed(1),
                max: maxPercent.toFixed(1),
                range: `${minPercent.toFixed(1)}% ~ ${maxPercent.toFixed(1)}%`
            },
            effectiveness: effectiveness,
            effectivenessText: getEffectivenessText(effectiveness),
            moveCategory: move.category,
            moveType: move.type,
            details: {
                attackerStat: attackStat,
                defenderStat: defenseStat,
                level: level,
                power: move.power,
                stab: damageRange.stabUsed
            }
        });
        
    } catch (error) {
        console.error('Damage calculation error:', error);
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
});

// 静态文件服务（提供前端页面）
const publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir));
app.get('/', (req, res) => {
    res.sendFile(path.join(publicDir, 'index.html'));
});

// 辅助函数：生成简单的同步ID
function generateSyncId() {
    return `sync_${Date.now()}_${Math.random().toString(36).substr(2, 8)}`;
}

function getEffectivenessText(multiplier) {
    if (multiplier === 0) return '免疫';
    if (multiplier === 0.25) return '非常微弱(0.25x)';
    if (multiplier === 0.5) return '微弱(0.5x)';
    if (multiplier === 1) return '正常(1x)';
    if (multiplier === 2) return '效果绝佳(2x)';
    if (multiplier === 4) return '超级有效(4x)';
    return `${multiplier}x`;
}

// 启动服务器（本地开发时运行，serverless 环境不执行）
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`宝可梦对战助手后端服务已启动`);
        console.log(`监听端口: ${PORT}`);
        console.log(`API 基础地址: http://localhost:${PORT}/api`);
        console.log(`可用的端点:`);
        console.log(`  GET    /api/pokemon/:nameOrId`);
        console.log(`  GET    /api/team/templates`);
        console.log(`  POST   /api/battle/sync`);
        console.log(`  GET    /api/battle/sync/:id?`);
        console.log(`  POST   /api/battle/calc_damage`);
    });
}

// 导出 app 供 serverless 入口使用
module.exports = { app };