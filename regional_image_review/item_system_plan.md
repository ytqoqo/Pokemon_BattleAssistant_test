# 道具系统完善方案

## 用户确认

- **道具列表**：扩充到全部对战道具（~80个）
- **粗略模式**：不显示道具
- **道具消耗**：速度加成消失（符合游戏规则）

---

## 当前状态

### 已有功能
- 宝可梦数据中有 `item`(道具名) 和 `itemUsed`(是否已消耗) 两个字段
- `toggleItem('pokemonId')` 函数：点击道具区域切换 `itemUsed` 状态，消耗后显示半透明
- 详细模式卡片渲染道具：Iconify `mdi:bag-personal` 图标 + 道具文字（第 2409-2412 行）
- 粗略模式无道具显示

### 存在的问题
1. **无法切换道具**：道具名只能通过改源码修改，没有 UI 选择器
2. **道具不影响速度排序**：`updateSpeedRanking()` 只考虑麻痹状态，不讲讲究围巾等道具的加减速效果
3. **道具图标用 Iconify**：没有使用 PokeAPI 的道具精灵图
4. **换宝可梦时道具被清空**：`handlePokemonNameChange()` 中 `pokemon.item = ''` 直接重置
5. **道具名不统一**：生命玉/命玉、腰带/气势披带 存在重复别名

---

## 方案设计

### 一、道具数据库（完整版 ~80 个道具）

PokeAPI 精灵 URL 格式：`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/{icon}.png`

**已验证可达**：life-orb、choice-scarf、assault-vest、sitrus-berry、focus-sash 等 Gen1-7 道具精灵图均可用。
**Gen8-9 道具缺失**：booster-energy、covert-cloak、clear-amulet、loaded-dice、throat-spray、safety-goggles、heavy-duty-boots、punching-glove、protective-pads、utility-umbrella、room-service、eject-pack、fairy-feather 等较新道具在 PokeAPI sprites 仓库中没有精灵图，使用默认精灵球回退。

```javascript
const ITEM_DATA = {
    // ==================== 树果类 ====================
    '文柚果':       { en: 'Sitrus Berry',       speedMul: 1.0, icon: 'sitrus-berry' },
    '勿花果':       { en: 'Figy Berry',         speedMul: 1.0, icon: 'figy-berry' },
    '异奇果':       { en: 'Wiki Berry',         speedMul: 1.0, icon: 'wiki-berry' },
    '乐芭果':       { en: 'Iapapa Berry',       speedMul: 1.0, icon: 'iapapa-berry' },
    '芭亚果':       { en: 'Aguav Berry',        speedMul: 1.0, icon: 'aguav-berry' },
    '芒芒果':       { en: 'Mago Berry',          speedMul: 1.0, icon: 'mago-berry' },
    '亚开果':       { en: 'Kee Berry',           speedMul: 1.0, icon: 'kee-berry' },
    '香罗果':       { en: 'Maranga Berry',       speedMul: 1.0, icon: 'maranga-berry' },
    '榴石果':       { en: 'Rowap Berry',         speedMul: 1.0, icon: 'rowap-berry' },
    '棱瓜果':       { en: 'Jaboca Berry',        speedMul: 1.0, icon: 'jaboca-berry' },
    '灯浆果':       { en: 'Lansat Berry',        speedMul: 1.0, icon: 'lansat-berry' },
    '星桃果':       { en: 'Starf Berry',         speedMul: 1.0, icon: 'starf-berry' },
    '谜芝果':       { en: 'Enigma Berry',        speedMul: 1.0, icon: 'enigma-berry' },
    '雾莲果':       { en: 'Custap Berry',        speedMul: 1.0, icon: 'custap-berry' },
    '释陀果':       { en: 'Lum Berry',           speedMul: 1.0, icon: 'lum-berry' },
    '嘉珍果':       { en: 'Chilan Berry',        speedMul: 1.0, icon: 'chilan-berry' },
    '烛木果':       { en: 'Occa Berry',          speedMul: 1.0, icon: 'occa-berry' },
    '福禄果':       { en: 'Passho Berry',        speedMul: 1.0, icon: 'passho-berry' },
    '千香果':       { en: 'Wacan Berry',         speedMul: 1.0, icon: 'wacan-berry' },
    '罗子果':       { en: 'Rindo Berry',         speedMul: 1.0, icon: 'rindo-berry' },
    '扁樱果':       { en: 'Yache Berry',         speedMul: 1.0, icon: 'yache-berry' },
    '草蚕果':       { en: 'Chople Berry',        speedMul: 1.0, icon: 'chople-berry' },
    '佛柑果':       { en: 'Kebia Berry',         speedMul: 1.0, icon: 'kebia-berry' },
    '莓榴果':       { en: 'Shuca Berry',         speedMul: 1.0, icon: 'shuca-berry' },
    '刺耳果':       { en: 'Coba Berry',          speedMul: 1.0, icon: 'coba-berry' },
    '霹霹果':       { en: 'Payapa Berry',        speedMul: 1.0, icon: 'payapa-berry' },
    '巧可果':       { en: 'Tanga Berry',         speedMul: 1.0, icon: 'tanga-berry' },
    '腰木果':       { en: 'Charti Berry',        speedMul: 1.0, icon: 'charti-berry' },
    '棱瓜果':       { en: 'Kasib Berry',         speedMul: 1.0, icon: 'kasib-berry' },
    '莲蒲果':       { en: 'Haban Berry',         speedMul: 1.0, icon: 'haban-berry' },
    '通通果':       { en: 'Colbur Berry',        speedMul: 1.0, icon: 'colbur-berry' },
    '玉虫果':       { en: 'Babiri Berry',        speedMul: 1.0, icon: 'babiri-berry' },
    '洛玫果':       { en: 'Roseli Berry',        speedMul: 1.0, icon: 'roseli-berry' },
    '沙鳞果':       { en: 'Liechi Berry',        speedMul: 1.0, icon: 'liechi-berry' },
    '龙火果':       { en: 'Petaya Berry',        speedMul: 1.0, icon: 'petaya-berry' },
    '枝荔果':       { en: 'Salac Berry',         speedMul: 1.0, icon: 'salac-berry' },
    '龙睛果':       { en: 'Ganlon Berry',        speedMul: 1.0, icon: 'ganlon-berry' },
    '杏仔果':       { en: 'Apicot Berry',        speedMul: 1.0, icon: 'apicot-berry' },
    '兰萨果':       { en: 'Lansat Berry',        speedMul: 1.0, icon: 'lansat-berry' },

    // ==================== 讲究系列 ====================
    '讲究围巾':     { en: 'Choice Scarf',       speedMul: 1.5,  icon: 'choice-scarf' },
    '讲究头带':     { en: 'Choice Band',        speedMul: 1.0,  icon: 'choice-band' },
    '讲究眼镜':     { en: 'Choice Specs',       speedMul: 1.0,  icon: 'choice-specs' },

    // ==================== 属性增强道具 ====================
    '神秘水滴':     { en: 'Mystic Water',       speedMul: 1.0, icon: 'mystic-water' },
    '木炭':         { en: 'Charcoal',           speedMul: 1.0, icon: 'charcoal' },
    '奇迹种子':     { en: 'Miracle Seed',       speedMul: 1.0, icon: 'miracle-seed' },
    '磁铁':         { en: 'Magnet',             speedMul: 1.0, icon: 'magnet' },
    '锐利鸟嘴':     { en: 'Sharp Beak',         speedMul: 1.0, icon: 'sharp-beak' },
    '毒针':         { en: 'Poison Barb',        speedMul: 1.0, icon: 'poison-barb' },
    '柔软沙子':     { en: 'Soft Sand',          speedMul: 1.0, icon: 'soft-sand' },
    '硬石头':       { en: 'Hard Stone',         speedMul: 1.0, icon: 'hard-stone' },
    '银粉':         { en: 'Silver Powder',      speedMul: 1.0, icon: 'silver-powder' },
    '诅咒之符':     { en: 'Spell Tag',          speedMul: 1.0, icon: 'spell-tag' },
    '金属膜':       { en: 'Metal Coat',         speedMul: 1.0, icon: 'metal-coat' },
    '不融冰':       { en: 'Never-Melt Ice',     speedMul: 1.0, icon: 'never-melt-ice' },
    '龙之牙':       { en: 'Dragon Fang',        speedMul: 1.0, icon: 'dragon-fang' },
    '黑色眼镜':     { en: 'Black Glasses',      speedMul: 1.0, icon: 'black-glasses' },
    '妖精之羽':     { en: 'Fairy Feather',      speedMul: 1.0, icon: 'fairy-feather' },
    '弯曲的汤匙':   { en: 'Twisted Spoon',      speedMul: 1.0, icon: 'twisted-spoon' },
    '丝绸围巾':     { en: 'Silk Scarf',         speedMul: 1.0, icon: 'silk-scarf' },
    '黑带':         { en: 'Black Belt',         speedMul: 1.0, icon: 'black-belt' },

    // ==================== 传说宝可梦专属道具 ====================
    '腐朽的剑':     { en: 'Rusted Sword',       speedMul: 1.0, icon: 'rusted-sword' },
    '腐朽的盾':     { en: 'Rusted Shield',      speedMul: 1.0, icon: 'rusted-shield' },
    '蓝靛宝珠':     { en: 'Blue Orb',           speedMul: 1.0, icon: 'blue-orb' },
    '朱红宝珠':     { en: 'Red Orb',            speedMul: 1.0, icon: 'red-orb' },
    '白金宝珠':     { en: 'Griseous Orb',       speedMul: 1.0, icon: 'griseous-orb' },
    '金刚宝珠':     { en: 'Adamant Orb',        speedMul: 1.0, icon: 'adamant-orb' },
    '白玉宝珠':     { en: 'Lustrous Orb',       speedMul: 1.0, icon: 'lustrous-orb' },
    '惩戒之壶':     { en: 'Prison Bottle',      speedMul: 1.0, icon: 'prison-bottle' },
    '心之水滴':     { en: 'Soul Dew',           speedMul: 1.0, icon: 'soul-dew' },
    '基因之楔':     { en: 'DNA Splicers',       speedMul: 1.0, icon: 'dna-splicers' },

    // ==================== 天气/场地延长道具 ====================
    '炽热岩石':     { en: 'Heat Rock',          speedMul: 1.0, icon: 'heat-rock' },
    '潮湿岩石':     { en: 'Damp Rock',          speedMul: 1.0, icon: 'damp-rock' },
    '冰冷岩石':     { en: 'Icy Rock',           speedMul: 1.0, icon: 'icy-rock' },
    '沙沙岩石':     { en: 'Smooth Rock',        speedMul: 1.0, icon: 'smooth-rock' },
    '大地膜':       { en: 'Terrain Extender',   speedMul: 1.0, icon: 'terrain-extender' },

    // ==================== 核心对战斗具 ====================
    '生命玉':       { en: 'Life Orb',           speedMul: 1.0, icon: 'life-orb' },
    '气势披带':     { en: 'Focus Sash',         speedMul: 1.0, icon: 'focus-sash' },
    '突击背心':     { en: 'Assault Vest',       speedMul: 1.0, icon: 'assault-vest' },
    '吃剩的东西':   { en: 'Leftovers',           speedMul: 1.0, icon: 'leftovers' },
    '光之黏土':     { en: 'Light Clay',         speedMul: 1.0, icon: 'light-clay' },
    '弱点保险':     { en: 'Weakness Policy',    speedMul: 1.0, icon: 'weakness-policy' },
    '凸凸头盔':     { en: 'Rocky Helmet',       speedMul: 1.0, icon: 'rocky-helmet' },
    '进化奇石':     { en: 'Eviolite',           speedMul: 1.0, icon: 'eviolite' },
    '达人带':       { en: 'Expert Belt',        speedMul: 1.0, icon: 'expert-belt' },
    '气球':         { en: 'Air Balloon',         speedMul: 1.0, icon: 'air-balloon' },
    '先制之爪':     { en: 'Quick Claw',         speedMul: 1.0, icon: 'quick-claw' },
    '焦点镜':       { en: 'Scope Lens',         speedMul: 1.0, icon: 'scope-lens' },
    '广角镜':       { en: 'Wide Lens',          speedMul: 1.0, icon: 'wide-lens' },
    '对焦镜':       { en: 'Zoom Lens',          speedMul: 1.0, icon: 'zoom-lens' },
    '王者之证':     { en: 'King\'s Rock',       speedMul: 1.0, icon: 'kings-rock' },
    '锐利之爪':     { en: 'Razor Claw',         speedMul: 1.0, icon: 'razor-claw' },
    '光粉':         { en: 'Bright Powder',      speedMul: 1.0, icon: 'bright-powder' },
    '白色香草':     { en: 'White Herb',         speedMul: 1.0, icon: 'white-herb' },
    '心灵香草':     { en: 'Mental Herb',        speedMul: 1.0, icon: 'mental-herb' },
    '逃脱按键':     { en: 'Eject Button',       speedMul: 1.0, icon: 'eject-button' },
    '红牌':         { en: 'Red Card',           speedMul: 1.0, icon: 'red-card' },
    '部位护具':     { en: 'Protective Pads',    speedMul: 1.0, icon: 'protective-pads' },
    '客房服务':     { en: 'Room Service',       speedMul: 1.0, icon: 'room-service' },
    '避难背包':     { en: 'Eject Pack',         speedMul: 1.0, icon: 'eject-pack' },
    '打空保险':     { en: 'Blunder Policy',     speedMul: 1.0, icon: 'blunder-policy' },

    // ==================== 速度影响道具（特殊）============
    '黑色铁球':     { en: 'Iron Ball',          speedMul: 0.5,  icon: 'iron-ball' },
    '力量护踝':     { en: 'Power Anklet',       speedMul: 0.5,  icon: 'power-anklet' },
    '力量负重':     { en: 'Power Bracer',       speedMul: 0.5,  icon: 'power-bracer' },
    '力量束带':     { en: 'Power Belt',         speedMul: 0.5,  icon: 'power-belt' },
    '力量镜':       { en: 'Power Lens',         speedMul: 0.5,  icon: 'power-lens' },
    '力量头带':     { en: 'Power Band',         speedMul: 0.5,  icon: 'power-band' },
    '力量护腕':     { en: 'Power Weight',       speedMul: 0.5,  icon: 'power-weight' },

    // ==================== Gen8-9 新道具（PokeAPI 精灵可能缺失）====================
    '爽喉喷雾':     { en: 'Throat Spray',       speedMul: 1.0, icon: null },
    '防尘护目镜':   { en: 'Safety Goggles',     speedMul: 1.0, icon: null },
    '厚底靴':       { en: 'Heavy-Duty Boots',   speedMul: 1.0, icon: null },
    '密探斗篷':     { en: 'Covert Cloak',       speedMul: 1.0, icon: null },
    '清净坠饰':     { en: 'Clear Amulet',       speedMul: 1.0, icon: null },
    '老千骰子':     { en: 'Loaded Dice',        speedMul: 1.0, icon: null },
    '驱劲能量':     { en: 'Booster Energy',     speedMul: 1.0, icon: null },
    '拳击手套':     { en: 'Punching Glove',     speedMul: 1.0, icon: null },
    '万能伞':       { en: 'Utility Umbrella',   speedMul: 1.0, icon: null },
    '模仿香草':     { en: 'Mirror Herb',         speedMul: 1.0, icon: null },
    '机变骰子':     { en: 'Loaded Dice',        speedMul: 1.0, icon: null },  // 老千骰子别名

    // ==================== 别名（兼容旧数据）====================
    '命玉':         { en: 'Life Orb',           speedMul: 1.0, icon: 'life-orb', alias: '生命玉' },
    '腰带':         { en: 'Focus Sash',         speedMul: 1.0, icon: 'focus-sash', alias: '气势披带' },
};
```

---

### 二、道具精灵图函数

```javascript
function getItemSprite(itemName) {
    const data = ITEM_DATA[itemName];
    if (!data || !data.icon) {
        return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';
    }
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${data.icon}.png`;
}
```

- `icon: null` 的道具 → 回退到精灵球图标
- 不在 ITEM_DATA 中的道具 → 同样回退

---

### 三、道具选择器 UI

#### 3.1 触发方式

详细模式卡片中，**道具图标和道具名变为可点击**，点击后弹出道具选择面板。

#### 3.2 道具区域改造（第 2409-2412 行）

```html
<!-- 新代码 -->
<div class="flex items-center gap-1.5 cursor-pointer ${pk.itemUsed ? 'opacity-30' : ''}"
     onclick="showItemSelector('${pk.id}')" title="${pk.item || '点击选择道具'}">
    <img src="${getItemSprite(pk.item)}" class="w-5 h-5 object-contain"
         onerror="this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png'">
    <span class="text-[9px] text-slate-400 truncate w-16 text-right hover:text-amber-400">
        ${pk.item || '无道具'}
    </span>
</div>
```

- 保留 `itemUsed` 的 `opacity-30` 效果
- `toggleItem` 逻辑合并：点击道具区域 → 打开选择器；选择"无道具" → 清空；通过选择器切换道具

#### 3.3 弹出选择面板

风格与现有队伍方案面板一致（暗色玻璃面板）：

```
┌─────────────────────────────────────┐
│  🔍 [搜索道具...]         ✕ 关闭   │
├─────────────────────────────────────┤
│  [全部] [树果] [速度影响] [增强] [其他]   │ ← 分类标签
├─────────────────────────────────────┤
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐      │
│  │图标│ │图标│ │图标│ │图标│      │
│  │名称│ │名称│ │名称│ │名称│      │
│  └────┘ └────┘ └────┘ └────┘      │
│  ... 4列网格滚动 ...                 │
└─────────────────────────────────────┘
```

**实现函数**：`showItemSelector(pokemonId)` 
- 创建/复用覆盖层 + 面板 DOM
- 搜索框 `oninput` 实时过滤
- 点击道具 → 设置 `pokemon.item = selectedItem` → 关闭面板 → 重新渲染

#### 3.4 itemUsed 切换

- 道具右侧增加一个小勾选框或点击道具图标切换 `itemUsed`
- 消耗态：道具名加删除线、图标半透明

---

### 四、速度排序整合道具

#### 4.1 新增 `getEffectiveSpeed(pk)` 函数

```javascript
function getEffectiveSpeed(pk) {
    let speed = pk.speed;
    // 道具影响（未消耗才生效）
    if (pk.item && !pk.itemUsed) {
        const itemData = ITEM_DATA[pk.item];
        if (itemData) {
            speed *= itemData.speedMul;
        }
    }
    // 麻痹状态
    if (pk.status === '麻痹') {
        speed *= 0.5;
    }
    return Math.floor(speed);
}
```

#### 4.2 修改 `updateSpeedRanking()`（第 2497-2537 行）

- 排序时使用 `getEffectiveSpeed(a)` / `getEffectiveSpeed(b)` 代替 `a.speed` / `b.speed`（仅考虑麻痹）
- 显示速度值时也使用有效速度

---

### 五、换宝可梦时保留道具

修改 `handlePokemonNameChange()`（第 2470-2471 行）：

```javascript
// 旧代码：
pokemon.item = '';          // ← 删除此行
pokemon.itemUsed = false;   // ← 删除此行

// 新代码：保留道具，不做清空
// 用户可通过道具选择器自行更改
```

---

### 六、粗略模式

**不显示道具**（用户已确认）。

---

## 实施步骤

| 步骤 | 内容 | 说明 |
|------|------|------|
| 1 | 新增 `ITEM_DATA` 对象（~80个道具） | typeChart 下方插入 |
| 2 | 新增 `getItemSprite()` 函数 | 返回 PokeAPI 精灵 URL |
| 3 | 新增 `getEffectiveSpeed()` 函数 | 计算道具+状态修正后速度 |
| 4 | 修改 `updateSpeedRanking()` | 使用 `getEffectiveSpeed()` 排序和显示 |
| 5 | 修改详细模式道具渲染（2409-2412行） | Iconify→PokeAPI精灵图，增加点击 |
| 6 | 新增 `showItemSelector()` 弹出面板 | 搜索+分类+网格选择 |
| 7 | 修改 `handlePokemonNameChange()` | 不再清空道具 |
| 8 | 调整 `toggleItem()` | 兼容新的 itemUsed 切换方式 |

---

## 边界情况

| 情况 | 处理 |
|------|------|
| 道具不在 ITEM_DATA 中 | 显示精灵球图标，speedMul = 1.0 |
| icon 为 null（Gen8-9） | 回退到精灵球图标 |
| 道具为别名 | 可识别，渲染时不影响（或自动转为主名） |
| 无道具（空字符串） | 显示"无道具"文字 + 半透明精灵球 |
| itemUsed = true | 速度加成消失，道具图标/文字半透明 |
| 道具暂时用不到 | 用户未选择时维持空道具，speedMul = 1.0 |

---

## 附录：PokeAPI 道具精灵图缺失清单（已验证）

经 HTTP HEAD 批量验证，以下 **15 个道具**在 PokeAPI sprites 仓库中不存在（404），已设为 `icon: null`，前端回退到精灵球图标：

### Gen8-9 缺失（9个）
| 道具名 | 备注 |
|--------|------|
| 爽喉喷雾 | Gen8 |
| 厚底靴 | Gen8 |
| 密探斗篷 | Gen9 |
| 清净坠饰 | Gen9 |
| 老千骰子 | Gen9 |
| 驱劲能量 | Gen9 |
| 拳击手套 | Gen9 |
| 万能伞 | Gen8 |
| 模仿香草 | Gen9 |

### 其他缺失（6个）
| 道具名 | 备注 |
|--------|------|
| 妖精之羽 | Gen7 |
| 腐朽的剑 | Gen8 苍响专属 |
| 腐朽的盾 | Gen8 藏玛然特专属 |
| 客房服务 | Gen8 |
| 避难背包 | Gen8 |
| 打空保险 | Gen8 |

### 已验证存在的 Gen8-9 道具
- 防尘护目镜 (Safety Goggles)、大地膜 (Terrain Extender) ✓

**总计**：~110 个道具，100+ 个可用精灵图，15 个回退到精灵球。
