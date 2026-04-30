# 宝可梦冠军对战助手技术文档 

## 1. 项目概述

宝可梦冠军对战助手是一个专为 Pokemon Champion（宝可梦冠军）竞技设计的辅助决策系统。帮助选手在紧张对战中快速追踪双方队伍状态、计算行动顺位、分析属性克制关系，并实时监控对战环境因素。

**当前版本：** V6.2.0
**更新日期：** 2026-04-29  
**规则格式：** Pokemon Champiao M-A

## 目录

- [2. 项目架构总览](#2-项目架构总览)
  - [2.1 技术栈](#21-技术栈)
  - [2.2 项目文件结构](#22-项目文件结构)
  - [2.3 运行方式](#23-运行方式)
- [3. 前端功能详情](#3-前端功能详情)
  - [3.1 对战环境监控面板](#31-对战环境监控面板)
  - [3.2 队伍展示与管理](#32-队伍展示与管理)
  - [3.3 宝可梦状态卡片](#33-宝可梦状态卡片)
  - [3.4 速度排名系统](#34-速度排名系统)
  - [3.5 队伍弱点分析](#35-队伍弱点分析)
  - [3.6 属性克制计算](#36-属性克制计算)
  - [3.7 队伍方案管理](#37-队伍方案管理)
  - [3.8 道具系统](#38-道具系统)
  - [3.9 属性图标系统](#39-属性图标系统)
- [4. 后端 API 详细文档](#4-后端-api-详细文档)
  - [4.1 GET /api/pokemon/:nameOrId](#41-get-apipokemonnameorid)
  - [4.2 GET /api/team/templates](#42-get-apiteamtemplates)
  - [4.3 POST /api/battle/sync](#43-post-apibattlesync)
  - [4.4 GET /api/battle/sync/:id?](#44-get-apibattlesyncid)
  - [4.5 POST /api/battle/calc_damage](#45-post-apibattlecalc_damage)
- [5. 数据层详细说明](#5-数据层详细说明)
  - [5.1 data/pokemon.js - 宝可梦图鉴](#51-datapokemonjs---宝可梦图鉴)
  - [5.2 data/moves.js - 招式数据库](#52-datamovesjs---招式数据库)
  - [5.3 data/typeChart.js - 属性克制表](#53-datatypechartjs---属性克制表)
  - [5.4 data/templates.js - 队伍模板](#54-datatemplatesjs---队伍模板)
  - [5.5 utils/damageCalculator.js - 伤害计算器](#55-utilsdamagecalculatorjs---伤害计算器)
- [6. 前端 JavaScript 核心逻辑](#6-前端-javascript-核心逻辑)
  - [6.1 全局常量](#61-全局常量)
  - [6.2 核心函数调用链](#62-核心函数调用链)
  - [6.3 初始化队伍数据](#63-初始化队伍数据)
  - [6.4 计时器](#64-计时器)
- [7. 前后端交互时序](#7-前后端交互时序)
- [8. 已知限制和待完善项](#8-已知限制和待完善项)
  - [8.1 前端限制](#81-前端限制)
  - [8.2 后端限制](#82-后端限制)
  - [8.3 数据层限制](#83-数据层限制)
- [9. 后续扩展方向](#9-后续扩展方向)
  - [9.1 高优先级](#91-高优先级)
  - [9.2 中优先级](#92-中优先级)
  - [9.3 低优先级](#93-低优先级)
- [10. 附录：属性对照表](#10-附录属性对照表)
- [11. 联系方式](#11-联系方式)

---

## 2. 项目架构总览

### 2.1 技术栈

| 层级 | 技术 | 文件 |
|------|------|------|
| 前端 UI | 纯 HTML + Tailwind CSS 3.4.3 (CDN) + Iconify | `pokemon_battle_assistant.html` |
| 前端逻辑 | 原生 JavaScript (ES6+) | `pokemon_battle_assistant.html` (内嵌 `<script>`) |
| 后端框架 | Express.js 4.18.2 | `server.js` |
| 数据存储 | 内存 (无数据库)，上限100条同步记录 | `server.js` |
| 外部 API | PokeAPI (宝可梦图片 + 属性数据) | 前端图片加载 + `fetch_pokemon_types.js` |

### 2.2 项目文件结构

```
Pokemon_BattleBackend/
├── pokemon_battle_assistant.html       # 前端主文件 (~2800行)
├── public/
│   └── index.html                      # GitHub Pages 部署前端主文件
├── Pokemon_icon/type/                  # 本地属性图标 SVG (18个文件)
├── server.js                           # Express 后端 (258行)
├── package.json                        # npm 配置 (dependencies: express, cors, body-parser, axios, pokedex-promise-v2)
├── fetch_pokemon_types.js              # PokeAPI 数据抓取脚本 (中文名→英文名→属性)
├── AI_Model_Introduction.md            # AI 模型介绍
├── 宝可梦对战助手功能列表 _V4.3.0.md  # 本文档
├── Document log/                       # 版本变更日志
├── data/
│   ├── pokemon.js                      # 宝可梦图鉴 (~495行, 178+只)
│   ├── moves.js                        # 招式数据库 (~65个招式)
│   ├── typeChart.js                    # 18属性克制表 + 倍率计算函数
│   └── templates.js                    # 预设队伍模板 (2个)
└── utils/
    └── damageCalculator.js             # 伤害公式计算 (Gen 8/9)
```

### 2.3 运行方式

```bash
# 启动后端 (端口 3000)
npm start
# 或开发模式 (自动重启)
npm run dev

# 前端：直接用浏览器打开 pokemon_battle_assistant.html
# 或通过后端托管静态文件访问
```

---

## 3. 前端功能详情

### 3.1 对战环境监控面板

**实现位置：** `pokemon_battle_assistant.html` 第158-209行 (HTML), 第1717-1747行 (JS)

| 功能 | 实现方式 | 可选值 |
|------|----------|--------|
| 回合数追踪 | `battleState.turn`，两位数字显示 | 01-99 |
| 天气系统 | 点击循环切换 `cycleWeather()` | 晴朗 / 雨天 / 沙暴 / 冰雹 / 无 |
| 场地系统 | 点击循环切换 `cycleTerrain()` | 无 / 青草 / 电气 / 薄雾 / 精神 |
| 计时器 | `setInterval` 每秒减1，从15分钟倒计时 | 15:00 → 00:00 |

**battleState 数据结构 (第1630-1638行):**
```javascript
let battleState = {
    turn: 1,
    weather: '晴朗',
    terrain: '无',
    sides: {
        player: { tailwind: 0, screens: [] },
        enemy: { tailwind: 0, screens: [] }
    }
};
```

### 3.2 队伍展示与管理

**实现位置：** 第232-246行 (HTML 结构), 第1683-1695行 (`renderTeams()`)

- **分栏布局**：左侧我方 (Team Blue, 600px), 右侧敌方 (Team Red, 600px)
- **模式切换**：`togglePlayerMode()` / `toggleEnemyMode()` (第1663-1681行)
  - **详细模式**：头像、属性标签（中文）、名称输入框、性别、速度数值、状态按钮、HP滑块+数值+血条、道具（可标记已消耗）、特性、4个招式
  - **粗略模式** (`isSimple`)：紧凑布局，突出弱点倍率 (2x/4x)，隐藏招式详情

### 3.3 宝可梦状态卡片

**实现位置：** `createPokemonCard()` 函数 (第2078-2207行)

**宝可梦对象数据结构 (Pokemon Object):**
```javascript
{
    id: 'p1',                // 唯一标识 (p1-p6 我方, e1-e6 敌方)
    name: '苍响',            // 中文名
    level: 50,               // 等级
    sex: 'none',             // 'male' | 'female' | 'none'
    types: ['Fairy', 'Steel'], // 属性数组 (英文)
    hp: 100,                 // HP 百分比 (0-100)
    speed: 220,              // 速度数值 (实际值，非种族值)
    item: '腐朽的剑',         // 持有道具
    itemUsed: false,         // 道具是否已消耗
    ability: '不挠之剑',      // 特性名称
    status: 'none',          // 'none' | '麻痹' | '灼伤' | '中毒' | '睡眠' | '冰冻'
    moves: [                 // 招式列表 (最多4个)
        { name: '巨兽斩', pp: 8 },
        { name: '嬉闹', pp: 10 },
        { name: '圣剑', pp: 15 },
        { name: '守住', pp: 10 }
    ]
}
```

**卡片交互功能：**

| 交互 | 函数 | 行为 |
|------|------|------|
| HP 滑块 | `updateHP(id, val)` | 拖动 0-100% 滑块实时调整血量，触发重新渲染 |
| 血条颜色 | CSS 类名切换 | >50% 绿色 / 20-50% 黄色 / <20% 红色 |
| 状态切换 | `toggleStatus(id)` | 循环切换: none → 麻痹 → 灼伤 → 中毒 → 睡眠 → 冰冻 |
| 道具标记 | 点击道具图标切换 itemUsed，点击道具名打开选择器 | 已消耗时 opacity:30%，速度加成消失 |
| 道具切换 | `showItemSelector(id)` 弹出面板 | 搜索+分类Tab+网格选择，~110个道具，实�时更新 |
| 名称修改 | `handlePokemonNameChange()` | 通过输入框/datalist 修改名称，调用后端 API 获取新宝可梦数据 |
| 性别显示 | 图标渲染 | male=蓝色♂ / female=粉色♀ / none=不显示 |
| 速度显示 | 数字展示 | 卡片右上角显示速度值 |
| 头像图片 | `getPokemonImageUrl()` | 从 PokeAPI official-artwork 加载高清图，失败降级为精灵球图标 |

**状态对速度的影响：** 麻痹状态速度减半，道具影响通过 `getEffectiveSpeed()` 统一计算

**道具对速度的影响：**
- 讲究围巾：×1.5 速度
- 黑色铁球 / 力量系列：×0.5 速度
- 道具消耗后（`itemUsed=true`）速度加成消失
- 速度排名中修正后的速度值以琥珀色高亮显示，并标注来源

**弱点/抗性面板：** 粗略模式下自动显示 `getWeaknesses()` 计算的多倍弱点 (第2084-2111行)

### 3.4 速度排名系统 (Speed Tracker)

**实现位置：** `updateSpeedRanking()` (第2266-2306行)

- 收集双方12只宝可梦，按速度降序排列
- 麻痹状态自动将速度 ×0.5
- 蓝色标识条 (我方) / 红色标识条 (敌方)
- 显示序号 (1-12)、名称、状态标签、修正后速度值
- 规划中：顺风/空间支持 (`battleState.sides` 已预留字段但未接入排序逻辑)

### 3.5 队伍弱点分析 (Team Analysis)

**实现位置：** `calculateTeamAnalysis()` (~1980行)

- 统计全队属性分布 (`typeDist`)
- 遍历18种攻击属性，对每位宝可梦计算双属性综合倍率（计入抗性/免疫抵消）
- 仅统计倍率 >1 的真正弱点，计入抗性抵消后的结果
- 显示 Top 5 弱点属性，≥3次标红
- 属性分布使用彩色小圆点 + 中文名称 + 计数
- 弱点统计使用 PokeAPI type 精灵图（117×29px）

### 3.6 属性克制计算 (V4.3.0 重写)

**前端与后端现在使用同一份 `typeChart` 数据**（攻击方视角：攻击属性 → 防御属性 → 倍率），从 `data/typeChart.js` 完整复制到前端。

**`getWeaknesses(types)` 新逻辑：**
1. 遍历18种攻击属性
2. 对每种攻击属性，乘算其对宝可梦每个防御属性的倍率
3. 倍率 >1 的即为弱点（返回 [属性, 倍率] 对），=0 为免疫，<1 为抗性
4. 正确处理双属性：4x（双弱点叠加）、2x、1x（抗性抵消）、0x（免疫抵消）

**`calculateTeamAnalysis()` 新逻辑：**
- 使用相同的 `typeChart` 数据源，每位宝可梦独立计算弱点集合
- 统计队伍中每种攻击属性有几位队员弱于它（而非简单的弱点次数累加）

**示例 — 苍响 (Fairy/Steel)：**
- 旧算法：误判 5 个弱点 (Poison, Steel, Fire, Fighting, Ground)
- 新算法：正确判为仅 1 个弱点 (Ground 2x)，Fire/Fighting 被另一半属性抗性抵消，Poison 被 Steel 免疫抵消

### 3.7 队伍方案管理 (Team Presets)

**实现位置：** ~1780行区域

- **localStorage 持久化**：键名 `pokemon_team_schemes_v2`
- **实时编辑队伍名称**：点击队伍名称直接修改，失焦自动保存
- **新增队伍方案**：一键创建空白方案，默认6个待填写槽位
- **替换队伍**：选择方案后一键替换当前我方6只配置
- **保存到方案**：将当前我方队伍保存到指定方案
- **删除方案**：即时删除，无确认弹窗
- **滚动条**：方案列表带自定义滚动条 (`custom-scrollbar`)
- **颜色标记**：每个方案带颜色标识条

**数据结构：**
```javascript
teamSchemes = [
    {
        id: 'scheme_1714300000000',
        name: '我的队伍方案',
        color: 'blue',  // 颜色标识
        team: [ /* 6只宝可梦 */ ]
    }
]
```

**核心函数：**
| 函数 | 功能 |
|------|------|
| `renderTeamSchemes()` | 渲染方案列表 UI |
| `addTeamScheme()` | 新增空白方案 |
| `renameTeamScheme(id, name)` | 重命名方案 |
| `selectTeam(id)` | 替换当前队伍为选中方案 |
| `saveToScheme(id)` | 保存当前队伍到方案 |
| `deleteTeamScheme(id)` | 删除方案 |

### 3.8 道具系统 (Item System)

**实现位置：** `ITEM_DATA` 对象 + 相关函数（~100行）

**道具数据库：** ~110个对战道具，包含：
- 树果类（35+种）：文柚果、勿花果、异奇果、减伤果系列等
- 讲究系列：讲究围巾（×1.5速）、讲究头带、讲究眼镜
- 属性增强（17种）：神秘水滴、木炭等
- 传说专属：腐朽的剑/盾、蓝靛宝珠、白金宝珠等
- 天气场地延长：炽热/潮湿/冰冷/沙沙岩石、大地膜
- 核心对战（20+种）：生命玉、气势披带、突击背心、弱点保险、凸凸头盔等
- 速度影响：黑色铁球（×0.5速）、力量系列（×0.5速）
- Gen8-9 新道具：爽喉喷雾、厚底靴、密探斗篷、驱劲能量等

**道具选择器 UI：**
- 点击道具文字打开弹出面板
- 顶部分类 Tab：全部 / 速度影响 / 树果 / 讲究 / 属性增强 / 专属 / 天气场地 / 核心对战 / Gen8-9
- 搜索框实时过滤
- 4列网格，每格显示道具精灵图 + 中文名
- 速度影响道具显示倍率标注（×1.5 / ÷2）
- 底部"清除道具"按钮

**道具精灵图：**
- URL 格式：`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/{英文名}.png`
- Gen8-9 新道具（15个）在 PokeAPI 仓库中缺失（返回404），回退到精灵球图标
- 不在 ITEM_DATA 中的道具名也回退到精灵球图标

**道具交互：**
| 操作 | 行为 |
|------|------|
| 点击道具图标 | 切换 `itemUsed` 状态（消耗/未消耗） |
| 点击道具名称 | 打开道具选择器弹出面板 |
| 选择道具 | 设置 `pk.item`，重置 `itemUsed=false`，立即重新渲染 |
| 清除道具 | `pk.item=''`，`itemUsed=false` |
| 道具消耗后 | 图标/文字半透明（opacity:30%），速度加成消失 |

**核心函数：**
| 函数 | 功能 |
|------|------|
| `getItemSprite(itemName)` | 返回道具 PokeAPI 精灵图 URL |
| `getEffectiveSpeed(pk)` | 计算道具 × 状态修正后的有效速度 |
| `showItemSelector(pokemonId)` | 创建道具选择弹出面板 |
| `selectItem(itemName)` | 设置宝可梦道具并关闭面板 |
| `clearSelectedItem()` | 清除宝可梦道具 |
| `filterItemGrid()` | 搜索框实时过滤道具网格 |
| `selectItemCat(category)` | 切换分类 Tab |

### 3.9 属性图标系统 (V5-V6)

**实现位置：** `TYPES` 常量、防守弱点统计面板、属性分布面板、详细模式属性条

- 属性图标从 PokeAPI 远程 URL 替换为本地 SVG 文件 (`Pokemon_icon/type/type{1-18}.svg`)
- SVG 文件部署于根目录和 `public/` 下，确保两种访问路径均可用
- 朱/紫第九世代风格，18种属性各有独立图标，30×30 viewBox 圆角矩形

**详细模式属性条 (V5 引入 CSS 变量化)：**
- 六项属性（HP/A/D/SA/SD/S）带图标 + 进度条 + 数值
- 所有关键尺寸通过 CSS 变量控制，支持实时调节面板
- 属性种族值在切换宝可梦时从 API 完整填充（V6.2 修复）

**粗略模式 (V4 引入标题栏)：**
- 自身属性图标 + 中文名称，弱点属性图标 + 倍率文字
- 属性/弱点区域带标题栏，图标通过 CSS 变量控制尺寸

**防守弱点统计 (V6.1 优化)：**
- 图标尺寸从 117×29px PNG 精灵图改为 38×38px SVG 正方形
- 数字气泡紧密贴合图标，容器使用 `relative inline-block`

**属性分布面板：**
- 保留彩色小圆点（不使用图片）

---

## 4. 后端 API 详细文档

**基础地址：** `http://localhost:3000/api`

### 4.1 GET /api/pokemon/:nameOrId

获取宝可梦基本信息。

**实现位置：** `server.js` 第32-52行，调用 `data/pokemon.js` 的 `findPokemon()`

**请求示例：** `GET /api/pokemon/苍响` 或 `GET /api/pokemon/1001`

**响应格式：**
```json
{
    "id": 1001,
    "name": "苍响",
    "types": ["Fairy", "Steel"],
    "baseStats": { "hp": 92, "attack": 130, "defense": 115, "spAttack": 80, "spDefense": 115, "speed": 138 },
    "abilities": ["不挠之剑"],
    "moves": ["巨兽斩", "嬉闹", "圣剑", "守住"],
    "genderRatio": "genderless",
    "evolution": null
}
```

**查找逻辑 (`findPokemon()` 第437-490行)：**
1. 按 ID 精确匹配
2. 按名称精确匹配（忽略大小写）
3. 按名称标准化后模糊匹配（去掉括号内地区信息）
4. 从 `realPokemonData` 临时构建（兜底）

**错误响应 (404)：**
```json
{ "error": "Pokemon not found", "message": "未找到宝可梦: xxx" }
```

### 4.2 GET /api/team/templates

获取预设竞技场队伍模板。

**实现位置：** `server.js` 第58-65行，数据来自 `data/templates.js`

**响应格式：**
```json
{
    "success": true,
    "templates": [
        {
            "id": "template_vgc_2026_rain",
            "name": "雨天重空间队 (示例)",
            "description": "基于盖欧卡和闪电鸟的雨天平衡队",
            "format": "VGC 2026 Regulation G",
            "team": [ /* 6只宝可梦配置 */ ]
        }
    ],
    "count": 2
}
```

**现有模板：**
1. `template_vgc_2026_rain` - 雨天重空间队 (盖欧卡 + 黑马蕾冠王 + 闪电鸟 + 轰擂金刚猩 + 长毛巨魔 + 武道熊师)
2. `template_sword_shield_champ` - 剑盾冠军配置 (苍响 + 咆哮虎 + 多龙巴鲁托 + 雷电云 + 风妖精 + 猛犸)

### 4.3 POST /api/battle/sync

上传前端对战状态，保存记录。

**实现位置：** `server.js` 第72-95行

**请求体：**
```json
{
    "battleState": { /* 对战状态对象 */ },
    "playerTeam": [ /* 6只宝可梦对象 */ ],
    "enemyTeam": [ /* 6只宝可梦对象 */ ],
    "timestamp": "2026-04-28T..."
}
```

**响应格式：**
```json
{
    "success": true,
    "message": "对战状态已同步",
    "syncId": "sync_1714300000000_abc12345",
    "storedCount": 1
}
```

**存储策略：** 内存数组 `battleSyncStore`，最多100条，超出时 shift 最旧记录

**前端调用时机：** 每次 `renderTeams()` 完成后自动调用 `syncBattleToBackend()` (第1697-1715行)

### 4.4 GET /api/battle/sync/:id?

获取历史同步记录。

**实现位置：** `server.js` 第101-119行

- 带 `:id`：返回单条完整记录
- 不带 `:id`：返回所有记录的摘要（仅含 id + timestamp + hasData）

### 4.5 POST /api/battle/calc_damage

伤害计算接口。

**实现位置：** `server.js` 第132-229行

**请求体：**
```json
{
    "attacker": {
        "pokemonName": "苍响",
        "moveName": "巨兽斩",
        "attackStat": 200,        // 可选，覆盖默认计算
        "spAttackStat": 100       // 可选
    },
    "defender": {
        "pokemonName": "咆哮虎",
        "defenseStat": 120,       // 可选
        "spDefenseStat": 100,     // 可选
        "hpStat": 200             // 可选，用于百分比计算
    }
}
```

**响应格式：**
```json
{
    "success": true,
    "damage": { "min": 85, "max": 100, "range": "85 ~ 100" },
    "percent": { "min": "42.5", "max": "50.0", "range": "42.5% ~ 50.0%" },
    "effectiveness": 2,
    "effectivenessText": "效果绝佳(2x)",
    "moveCategory": "physical",
    "moveType": "Steel",
    "details": { "attackerStat": 200, "defenderStat": 120, "level": 50, "power": 100, "stab": true }
}
```

**计算流程：**
1. 从 `data/pokemon.js` 查找攻击方和防御方宝可梦
2. 从 `data/moves.js` 查找招式信息
3. 使用 `utils/damageCalculator.js` 的 `calculateStat()` 计算能力值（默认50级、31个体、0努力、无性格修正）
4. 使用 `data/typeChart.js` 的 `getEffectivenessMultiplier()` 计算属性倍率
5. 使用 `calculateDamage()` 计算伤害区间 (随机因子 0.85-1.0)

---

## 5. 数据层详细说明

### 5.1 data/pokemon.js - 宝可梦图鉴 (~495行)

**导出：** `{ pokedex, findPokemon }`

**核心结构：**
- `realPokemonData` (第12-274行)：178+只宝可梦的真实数据，含基础形态、地区形态、超级进化
  - 每只包含：`types[]`, `baseStats{}`, `abilities[]`
- `DEFAULT_STATS`：未知宝可梦的兜底种族值 (全80)
- `pokemonNamesFromList` (第277-306行)：所有宝可梦名称列表
- `pokedex` 数组：从名称列表遍历生成，调用 `getTypes()` / `getBaseStats()` / `getAbilities()` 填充
- `originalDetailedPokemons` (第408-421行)：12只精选宝可梦的完整数据（苍响、咆哮虎等），覆盖自动生成的默认版本
- `findPokemon(query)` 函数 (第437-490行)：支持 ID/名称/模糊匹配

**宝可梦数量统计：**
- 基础形态 + 地区形态：约120只
- 超级进化形态：约55只
- 精选详细数据：12只

### 5.2 data/moves.js - 招式数据库 (~65个招式)

**导出：** `{ movesDB }`

**招式对象格式：**
```javascript
{
    power: 100,           // 威力 (0=变化招式)
    type: 'Steel',        // 属性 (英文)
    category: 'physical', // 'physical' | 'special' | 'status'
    pp: 5,                // PP 值
    multiHit: 3           // 可选，多段攻击次数 (如水流连打)
}
```

**招式分类：**
- 物理招式 (~25个)：巨兽斩、闪焰冲锋、地震、水流连打等
- 特殊招式 (~20个)：根源波动、星碎、月亮之力、暴风等
- 变化招式 (~15个)：光墙、反射壁、顺风、电磁波、守住等

### 5.3 data/typeChart.js - 属性克制表

**导出：** `{ typeChart, getEffectivenessMultiplier }`

- `typeChart`：18×18 映射表，攻击属性 → 防御属性 → 倍率
- 支持倍率：0 (免疫), 0.25, 0.5, 1, 2, 4
- `getEffectivenessMultiplier(attackType, defenderTypes)`：计算攻击属性对防御方双属性的总倍率（两者相乘）

**完整18属性：**
Normal, Fire, Water, Electric, Grass, Ice, Fighting, Poison, Ground, Flying, Psychic, Bug, Rock, Ghost, Dragon, Dark, Steel, Fairy

### 5.4 data/templates.js - 队伍模板

**导出：** `{ teamTemplates }`

每个模板包含：id, name, description, format, team[] (6只宝可梦，含 name/item/ability/moves)

### 5.5 utils/damageCalculator.js - 伤害计算器

**导出：** `{ calculateStat, calculateDamage }`

**`calculateStat(base, iv=31, ev=0, level=50, isHp=false)`:**
- HP 公式：`floor(((2*base + iv + floor(ev/4)) * level) / 100) + level + 10`
- 非HP公式：`floor(((2*base + iv + floor(ev/4)) * level) / 100) + 5`

**`calculateDamage({ level, power, attack, defense, effectiveness, randomRange, stab, otherModifiers })`:**
- 基础伤害：`floor((floor((floor(2*level/5 + 2) * power * attack / defense) / 50) + 2)`
- 最终伤害：基础 × effectiveness × stab × otherModifiers × random
- 随机因子默认 [0.85, 1.0]
- 最小伤害 ≥1

---

## 6. 前端 JavaScript 核心逻辑

### 6.1 全局常量

| 变量 | 位置 | 说明 |
|------|------|------|
| `API_BASE` | 第11行 | 后端 API 基础地址 `http://localhost:3000/api` |
| `typeNameMap` | 第13-32行 | 18属性英文 → 中文映射 |
| `allPokemonNames` | 第34-61行 | 178+只宝可梦中文名列表（用于 datalist 下拉建议） |
| `typeChart` | typeChart 下方 | 18属性完整克制表（攻击方视角），前后端共用 |
| `ITEM_DATA` | typeChart 下方 | ~110个道具数据库（中文名→英文名/精灵图/速度倍率） |
| `TYPES` | ITEM_DATA 下方 | 18属性颜色和 PokeAPI 精灵图 URL（朱/紫第九世代风格） |
| `pokemonImageMap` | 第1794-2056行 | 中文名 → PokeAPI 高清图 URL 映射（178+条目） |

### 6.2 核心函数调用链

```
页面加载
  → createDatalist()           // 创建宝可梦名称 datalist
  → renderTeamSchemes()        // 从 localStorage 加载队伍方案
  → renderTeams()              // 初始渲染双方队伍
      → createPokemonCard()    // 为每只宝可梦生成 HTML
          → getPokemonImageUrl()  // 获取头像 URL
          → getWeaknesses()       // 粗略模式下计算弱点
          → getItemSprite()       // 道具精灵图 URL
      → updateSpeedRanking()    // 更新速度排名（使用 getEffectiveSpeed()）
      → updateAnalysis()        // 更新弱点分析
          → calculateTeamAnalysis()
      → updateBattleDisplay()   // 更新回合/天气/场地显示
      → syncBattleToBackend()   // 异步同步到后端

用户交互
  → updateHP()         → renderTeams()
  → toggleStatus()     → renderTeams()
  → toggleItem()       → renderTeams()
  → showItemSelector() → selectItem() → renderTeams()
  → togglePlayerMode() / toggleEnemyMode() → renderTeams()
  → cycleWeather()     → updateBattleDisplay()
  → cycleTerrain()     → updateBattleDisplay()
  → handlePokemonNameChange() → fetch API → renderTeams()
  → addTeamScheme() / renameTeamScheme() / selectTeam() / saveToScheme() / deleteTeamScheme()
```

### 6.3 初始化队伍数据

**我方 (INITIAL_PLAYER_TEAM, 第1640-1647行)：**
苍响、咆哮虎、多龙巴鲁托、轰擂金刚猩、武道熊师、雷电云

**敌方 (INITIAL_ENEMY_TEAM, 第1649-1656行)：**
盖欧卡、黑马蕾冠王、猛犸、闪电鸟、长毛巨魔、风妖精

### 6.4 计时器

**实现位置：** 第2336-2344行
- `timeLeft` 初始 900 秒 (15分钟)
- `setInterval` 每秒减1并更新 `#timer` 显示
- 无暂停/重置功能（需手动刷新页面重置）

---

## 7. 前后端交互时序

```
1. [初始化] 浏览器加载 HTML → 运行 renderTeams() → 渲染默认队伍
2. [状态变更] 用户拖动 HP 滑块 / 点击状态切换
3. [前端计算] 立即重新计算速度排名 + 弱点分析 + 重新渲染
4. [后端同步] renderTeams() 内自动调用 POST /api/battle/sync
5. [名称变更] 用户修改宝可梦名称 → GET /api/pokemon/:name → 更新对象 → renderTeams()
6. [伤害计算] (手动调用) POST /api/battle/calc_damage → 返回伤害区间
```

---

## 8. 已知限制和待完善项

### 8.1 前端限制

| 问题 | 说明 |
|------|------|
| 顺风/空间未接入排序 | `battleState.sides.tailwind` 已预留字段但未接入 `getEffectiveSpeed()` |
| 计时器无暂停 | 无法暂停/重置，刷新页面后重新从15分钟开始 |
| 招式 PP 固定 | PP 不随使用而减少，无 PP 追踪 |
| 图片加载依赖外网 | 所有图片从 raw.githubusercontent.com 加载，无网络则无法显示 |
| 无伤害计算 UI | `POST /api/battle/calc_damage` 存在但前端无调用入口 |
| 固定分辨率 | body 固定 1920×1080，非响应式 |
| 道具精灵图部分缺失 | Gen8-9 的15个道具在 PokeAPI sprites 仓库中不存在，回退到精灵球图标 |

**已修复 (V4.3.0)：**
- ✅ 属性克制计算：前端改用完整 `typeChart`，正确计算双属性弱点（计入抗性/免疫抵消）
- ✅ 道具系统：~110个道具可选，精灵图显示，实时影响速度排序
- ✅ 队伍方案管理：localStorage 持久化保存/加载/编辑队伍方案
- ✅ 属性图标替换：从 Iconify 图标改为 PokeAPI type 精灵图
- ✅ 速度排序: 道具（讲究围巾×1.5、铁球×0.5）+ 麻痹状态统一通过 `getEffectiveSpeed()` 修正

**已修复 (V5-V6.2)：**
- ✅ 页面响应式：固定 1920×1080 改为 `100vw × 100vh`，适配 2K 等高分辨率屏幕
- ✅ CSS 变量化：所有关键尺寸通过 CSS 变量控制，支持实时调节面板（`Ctrl+Shift+D`）
- ✅ 粗略模式标题栏：属性/弱点区域新增标题栏，图标放大
- ✅ 属性图标本地化：18 种属性图标从 PokeAPI 远程 URL 替换为本地 SVG，离线可用
- ✅ 防守弱点统计优化：图标改为 38×38px SVG，数字气泡紧密贴合
- ✅ 六项属性种族值修复：切换宝可梦时完整填充 HP/A/D/SA/SD/S 种族值（之前仅速度正确）

### 8.2 后端限制

| 问题 | 位置 | 说明 |
|------|------|------|
| 内存存储 | `battleSyncStore` | 服务重启后数据丢失，限制100条 |
| 无持久化数据库 | - | 无 MongoDB/PostgreSQL 等 |
| 学习招式列表为空 | `getMoves()` | 大部分宝可梦的 `learnableMoves` 返回 `[]` |
| 伤害计算不完整 | `calculateDamage()` | 未考虑道具、特性、天气、场地、暴击等因素 |

### 8.3 数据层限制

| 问题 | 说明 |
|------|------|
| 超级进化种族值推测 | 部分 Mega 进化种族值为推算值（标注"推测"） |
| 中文名映射不完整 | `fetch_pokemon_types.js` 的 `nameMap` 仅10条映射 |
| 地区形态编号不准确 | 洗翠/伽勒尔形态的 PokeAPI 编号部分为推测 |

---

## 9. 后续扩展方向

基于当前代码架构，以下是可以添加的新功能方向（供后续开发参考）：

### 9.1 高优先级
- **顺风/戏法空间接入速度排序**：`battleState.sides` 已预留字段，只需在 `updateSpeedRanking()` 中接入
- **伤害计算器前端 UI**：为 `POST /api/battle/calc_damage` 添加前端调用界面
- **回合数递增**：添加"下一回合"按钮，自动回合+1
- **计时器暂停/重置**：添加计时器控制按钮

### 9.2 中优先级
- **队伍保存/加载**：利用 `POST /api/battle/sync` 和 `GET /api/battle/sync/:id` 实现队伍持久化
- **PP 追踪**：招式使用后 PP 减少
- **数据库持久化**：将内存存储替换为 SQLite/PostgreSQL
- **响应式布局**：支持不同屏幕尺寸

### 9.3 低优先级
- **完整伤害计算**：接入道具、特性、天气/场地修正
- **招式池补全**：为所有宝可梦填充 `learnableMoves`
- **对战回放**：基于同步记录实现回合回放
- **WebSocket 实时同步**：替换 HTTP 轮询

---

## 10. 附录：属性对照表

| 英文 | 中文 | 颜色代码 |
|------|------|----------|
| Normal | 一般 | #94a3b8 |
| Fire | 火 | #ef4444 |
| Water | 水 | #3b82f6 |
| Electric | 电 | #eab308 |
| Grass | 草 | #22c55e |
| Ice | 冰 | #7dd3fc |
| Fighting | 格斗 | #ea580c |
| Poison | 毒 | #a855f7 |
| Ground | 地面 | #a16207 |
| Flying | 飞行 | #0ea5e9 |
| Psychic | 超能力 | #f43f5e |
| Bug | 虫 | #84cc16 |
| Rock | 岩石 | #b45309 |
| Ghost | 幽灵 | #a855f7 |
| Dragon | 龙 | #6366f1 |
| Dark | 恶 | #475569 |
| Steel | 钢 | #94a3b8 |
| Fairy | 妖精 | #ec4899 |


### 11. 联系方式
如果您有任何疑问，请提出问题或通过 271637566@qq.com 联系我们。
