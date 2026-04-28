// data/templates.js
// 队伍模板，用于 GET /api/team/templates
const teamTemplates = [
    {
        id: "template_vgc_2026_rain",
        name: "雨天重空间队 (示例)",
        description: "基于盖欧卡和闪电鸟的雨天平衡队",
        format: "VGC 2026 Regulation G",
        team: [
            { name: "盖欧卡", item: "蓝靛宝珠", ability: "始源之海", moves: ["根源波动", "打雷", "冰冻束", "守住"] },
            { name: "黑马蕾冠王", item: "气势披带", ability: "人马一体", moves: ["星碎", "精神强念", "诡计", "守住"] },
            { name: "闪电鸟", item: "文柚果", ability: "静电", moves: ["十万伏特", "暴风", "羽栖", "顺风"] },
            { name: "轰擂金刚猩", item: "突击背心", ability: "青草制造者", moves: ["滑梯", "拍落", "十万马力", "极速折返"] },
            { name: "长毛巨魔", item: "光之黏土", ability: "恶作剧之心", moves: ["灵魂冲击", "光墙", "反射壁", "电磁波"] },
            { name: "武道熊师", item: "神秘水滴", ability: "无形拳", moves: ["水流连打", "近身战", "水流喷射", "看穿"] }
        ]
    },
    {
        id: "template_sword_shield_champ",
        name: "剑盾冠军配置",
        description: "苍响核心构筑",
        format: "Series 12",
        team: [
            { name: "苍响", item: "腐朽的剑", ability: "不挠之剑", moves: ["巨兽斩", "嬉闹", "圣剑", "守住"] },
            { name: "咆哮虎", item: "勿花果", ability: "威吓", moves: ["击掌奇袭", "闪焰冲锋", "抛下狠话", "拍落"] },
            { name: "多龙巴鲁托", item: "生命玉", ability: "恒净之躯", moves: ["龙箭", "潜灵奇袭", "飞身重压", "守住"] },
            { name: "雷电云", item: "气势披带", ability: "不服输", moves: ["疯狂伏特", "飞翔", "蛮力", "守住"] },
            { name: "风妖精", item: "腰带", ability: "恶作剧之心", moves: ["能量球", "月亮之力", "顺风", "再来一次"] },
            { name: "猛犸", item: "命玉", ability: "厚脂肪", moves: ["地震", "冰旋", "冰砾", "守住"] }
        ]
    }
];

module.exports = { teamTemplates };