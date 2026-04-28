# 防守弱点计算问题与解决方案

## 问题描述

当前前端弱点计算基于 `TYPE_CHART`（pokemon_battle_assistant.html 第1596-1615行），存在以下问题：

### 1. 数据结构设计错误

当前 `TYPE_CHART` 是"被什么属性克制"的反向查找表，只记录了弱点（2x），**没有记录抗性（0.5x）和免疫（0x）**。

以苍响（Fairy/Steel）为例，正确计算应为：
- Fire 对 Fairy 1x，对 Steel 2x → 总 2x
- Fighting 对 Fairy 2x，对 Steel 0.5x → 总 1x（抵消）
- Ground 对 Fairy 1x，对 Steel 2x → 总 2x
- Ghost 对 Fairy 1x，对 Steel 1x → 总 1x（**不应该是弱点**）
- Poison 对 Fairy 0x，对 Steel 0.5x → 总 0x（免疫）

但当前代码只能累加弱点，无法计算抗性抵消，导致：
- **4x 弱点算成 2x**（两个单弱点叠加，没有乘以 2×2）
- **1x 抵消也算成弱点**（如 Ghost 对 Fairy/Steel 本应无效但被标为弱点）
- **免疫无法识别**（如 Poison 对 Steel 是 0x，无法抵消另一个属性的弱点）

### 2. 缺失属性

`TYPE_CHART` 缺少 Normal 和 Dragon 属性的弱点记录（Normal 无弱点不记录是对的，但 Dragon 有 Fighting 弱点和 Ghost/Dark 抗性未记录）。

### 3. 队伍分析逻辑不完整

`calculateTeamAnalysis()`（第1964行）遍历每只宝可梦的属性弱点并简单累加计数，同样没有考虑抗性抵消和免疫。

---

## 后端参考

后端 `data/typeChart.js` 使用**攻击方视角**的完整映射表，是正确的标准格式：

```javascript
// 攻击属性 → 防御属性 → 倍率
typeChart['Fire'] = { 'Fire': 0.5, 'Water': 0.5, 'Grass': 2, 'Ice': 2, 'Bug': 2, 'Rock': 0.5, 'Dragon': 0.5, 'Steel': 2 };
// ... 完整 18 属性
```

---

## 解决方案

### 方案一：前端复用后端 typeChart（推荐）

**思路：** 将后端的 `typeChart.js` 数据直接复制到前端，复用同一份数据源。

**实现：**
1. 将 `data/typeChart.js` 中的 `typeChart` 对象完整复制到前端 HTML 的 `<script>` 中
2. 重写 `getWeaknesses()` 和 `calculateTeamAnalysis()`：遍历 18 种攻击属性，计算每种攻击对宝可梦双属性组合的总倍率
3. 过滤出倍率 >1 的属性即为弱点，=0 的为免疫，<1 的为抗性

**优点：**
- 前后端使用同一份属性表，保证一致性
- 计算准确，支持 4x/2x/1x/0.5x/0x 全部情况
- 维护成本低，修改一处即可

**缺点：**
- 前端代码量增加约 20 行（typeChart 数据）

---

### 方案二：前端反向补全 TYPE_CHART

**思路：** 保持现有数据结构（防御方视角），但补全所有弱点、抗性和免疫信息。

**实现：**
将 `TYPE_CHART` 从弱点列表改为完整的防御映射：
```javascript
const TYPE_CHART = {
    'Normal':   { weak: ['Fighting'], resist: [], immune: ['Ghost'] },
    'Fire':     { weak: ['Water', 'Ground', 'Rock'], resist: ['Fire', 'Water', 'Grass', 'Ice', 'Bug', 'Rock', 'Dragon', 'Steel'], immune: [] },
    // ... 补全 18 属性
};
```

然后 `getWeaknesses()` 改为计算两个属性的倍率相乘。

**优点：**
- 不改变现有数据结构方向，代码改动较小

**缺点：**
- 容易和后端 typeChart.js 不同步
- 需要手动补全，出错概率高

---

### 方案三：从后端 API 实时计算

**思路：** 前端请求后端 `POST /api/battle/calc_defense` 接口，后端用 `getEffectivenessMultiplier` 计算弱点。

**实现：**
1. 后端新增 `POST /api/battle/calc_defense` 接口
2. 接收宝可梦属性数组，返回所有弱点/抗性/免疫属性及倍率
3. 前端 `calculateTeamAnalysis()` 改为调用该 API

**优点：**
- 计算逻辑完全在后端，最可靠

**缺点：**
- 增加 API 请求延迟
- 需要新增后端接口
- 离线状态不可用

---

## 推荐方案

**方案一** 是最佳选择：复制后端 `typeChart.js` 到前端，计算逻辑改为"遍历攻击属性 × 防御属性相乘"，保证前后端一致且无额外网络开销。
