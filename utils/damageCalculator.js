// utils/damageCalculator.js
// 伤害计算工具

/**
 * 计算宝可梦能力值（50级，个体31，努力0，性格修正1.0）
 * @param {number} base 种族值
 * @param {number} iv 个体值 (默认31)
 * @param {number} ev 努力值 (默认0)
 * @param {number} level 等级 (默认50)
 * @param {boolean} isHp 是否为HP (HP公式不同)
 * @returns {number} 实际能力值
 */
function calculateStat(base, iv = 31, ev = 0, level = 50, isHp = false) {
    if (isHp) {
        return Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + level + 10;
    } else {
        return Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + 5;
    }
}

/**
 * 伤害计算公式 (宝可梦第8/9世代)
 * @param {Object} params 
 * @param {number} params.level 等级
 * @param {number} params.power 招式威力
 * @param {number} params.attack 攻击方攻击/特攻能力值
 * @param {number} params.defense 防御方防御/特防能力值
 * @param {number} params.effectiveness 属性倍率 (0, 0.25, 0.5, 1, 2, 4)
 * @param {Array<number>} params.randomRange 随机因子范围 [min, max]，默认 [0.85, 1]
 * @param {number} params.stab 本系加成 (1 或 1.5)
 * @param {number} params.otherModifiers 其他加成（如道具、特性、天气等），默认1
 * @returns {Object} { min, max, stabUsed }
 */
function calculateDamage({ level, power, attack, defense, effectiveness, randomRange = [0.85, 1], stab = 1, otherModifiers = 1 }) {
    if (power === 0) return { min: 0, max: 0, stabUsed: stab };
    
    // 基础伤害公式: (((2 * level / 5 + 2) * power * attack / defense) / 50) + 2
    const baseDamage = Math.floor((Math.floor((Math.floor(2 * level / 5 + 2) * power * attack) / defense) / 50) + 2);
    
    // 最终伤害 = 基础伤害 * 属性倍率 * STAB * 其他修正 * 随机因子
    const rawMin = baseDamage * effectiveness * stab * otherModifiers * randomRange[0];
    const rawMax = baseDamage * effectiveness * stab * otherModifiers * randomRange[1];
    
    // 最小伤害至少1
    const min = Math.max(1, Math.floor(rawMin));
    const max = Math.max(1, Math.floor(rawMax) + 1); // 向上取整确保范围包含上限
    
    return { min, max, stabUsed: stab > 1 };
}

module.exports = {
    calculateStat,
    calculateDamage
};