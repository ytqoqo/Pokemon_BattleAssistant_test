// data/pokemon.js
// 包含名单中所有宝可梦（基础形态 + 超级进化），部分常见宝可梦拥有真实数据，其余使用默认值

// ========== 默认数据模板 ==========
const DEFAULT_STATS = {
    hp: 80, attack: 80, defense: 80, spAttack: 80, spDefense: 80, speed: 80
};
const DEFAULT_ABILITIES = ['未知特性'];
const DEFAULT_MOVES = ['拍击', '叫声'];

// ========== 已知宝可梦的真实数据（仅补充常见部分） ==========
const realPokemonData = {
    "妙蛙花": { types: ["Grass", "Poison"], baseStats: { hp: 80, attack: 82, defense: 83, spAttack: 100, spDefense: 100, speed: 80 }, abilities: ["茂盛", "叶绿素"] },
    "喷火龙": { types: ["Fire", "Flying"], baseStats: { hp: 78, attack: 84, defense: 78, spAttack: 109, spDefense: 85, speed: 100 }, abilities: ["猛火", "太阳之力"] },
    "水箭龟": { types: ["Water"], baseStats: { hp: 79, attack: 83, defense: 100, spAttack: 85, spDefense: 105, speed: 78 }, abilities: ["激流", "雨盘"] },
    "大针蜂": { types: ["Bug", "Poison"], baseStats: { hp: 65, attack: 90, defense: 40, spAttack: 45, spDefense: 80, speed: 75 }, abilities: ["虫之预感", "狙击手"] },
    "大比鸟": { types: ["Normal", "Flying"], baseStats: { hp: 83, attack: 80, defense: 75, spAttack: 70, spDefense: 70, speed: 101 }, abilities: ["锐利目光", "蹒跚", "健壮胸肌"] },
    "阿柏怪": { types: ["Poison"], baseStats: { hp: 60, attack: 95, defense: 69, spAttack: 65, spDefense: 79, speed: 80 }, abilities: ["威吓", "蜕皮", "紧张感"] },
    "皮卡丘": { types: ["Electric"], baseStats: { hp: 35, attack: 55, defense: 40, spAttack: 50, spDefense: 50, speed: 90 }, abilities: ["静电", "避雷针"] },
    "雷丘（关都）": { types: ["Electric"], baseStats: { hp: 60, attack: 90, defense: 55, spAttack: 90, spDefense: 80, speed: 110 }, abilities: ["静电", "避雷针"] },
    "雷丘（阿罗拉）": { types: ["Electric", "Psychic"], baseStats: { hp: 60, attack: 85, defense: 50, spAttack: 95, spDefense: 85, speed: 110 }, abilities: ["冲浪之尾", "电气制造者"] },
    "皮可西": { types: ["Fairy"], baseStats: { hp: 95, attack: 70, defense: 73, spAttack: 95, spDefense: 90, speed: 60 }, abilities: ["迷人之躯", "魔法防守", "纯朴"] },
    "九尾（关都）": { types: ["Fire"], baseStats: { hp: 73, attack: 76, defense: 75, spAttack: 81, spDefense: 100, speed: 100 }, abilities: ["引火", "日照"] },
    "九尾（阿罗拉）": { types: ["Ice", "Fairy"], baseStats: { hp: 73, attack: 67, defense: 75, spAttack: 81, spDefense: 100, speed: 109 }, abilities: ["雪隐", "降雪"] },
    "风速狗（关都）": { types: ["Fire"], baseStats: { hp: 90, attack: 110, defense: 80, spAttack: 100, spDefense: 80, speed: 95 }, abilities: ["威吓", "引火", "正义之心"] },
    "风速狗（洗翠）": { types: ["Fire", "Rock"], baseStats: { hp: 95, attack: 115, defense: 80, spAttack: 95, spDefense: 80, speed: 90 }, abilities: ["威吓", "引火", "岩石皮肤"] },
    "胡地": { types: ["Psychic"], baseStats: { hp: 55, attack: 50, defense: 45, spAttack: 135, spDefense: 95, speed: 120 }, abilities: ["同步", "精神力", "魔法防守"] },
    "怪力": { types: ["Fighting"], baseStats: { hp: 90, attack: 130, defense: 80, spAttack: 65, spDefense: 85, speed: 55 }, abilities: ["毅力", "无防守", "不屈之心"] },
    "大食花": { types: ["Grass", "Poison"], baseStats: { hp: 80, attack: 105, defense: 65, spAttack: 100, spDefense: 70, speed: 70 }, abilities: ["叶绿素", "贪吃鬼"] },
    "呆壳兽（关都）": { types: ["Water", "Psychic"], baseStats: { hp: 95, attack: 75, defense: 110, spAttack: 100, spDefense: 80, speed: 30 }, abilities: ["迟钝", "我行我素", "再生力"] },
    "呆壳兽（伽勒尔）": { types: ["Poison", "Psychic"], baseStats: { hp: 95, attack: 100, defense: 95, spAttack: 100, spDefense: 70, speed: 30 }, abilities: ["速击", "我行我素", "再生力"] },
    "耿鬼": { types: ["Ghost", "Poison"], baseStats: { hp: 60, attack: 65, defense: 60, spAttack: 130, spDefense: 75, speed: 110 }, abilities: ["诅咒之躯"] },
    "袋兽": { types: ["Normal"], baseStats: { hp: 105, attack: 95, defense: 80, spAttack: 40, spDefense: 80, speed: 90 }, abilities: ["早起", "胆量", "精神力"] },
    "宝石海星": { types: ["Water", "Psychic"], baseStats: { hp: 60, attack: 75, defense: 85, spAttack: 100, spDefense: 85, speed: 115 }, abilities: ["发光", "自然回复", "分析"] },
    "凯罗斯": { types: ["Bug"], baseStats: { hp: 65, attack: 125, defense: 100, spAttack: 55, spDefense: 70, speed: 85 }, abilities: ["怪力钳", "破格", "自信过度"] },
    "肯泰罗（关都）": { types: ["Normal"], baseStats: { hp: 75, attack: 100, defense: 95, spAttack: 40, spDefense: 70, speed: 110 }, abilities: ["威吓", "愤怒穴位", "强行"] },
    "肯泰罗（帕底亚-斗战种）": { types: ["Fighting"], baseStats: { hp: 75, attack: 110, defense: 105, spAttack: 30, spDefense: 70, speed: 100 }, abilities: ["威吓", "愤怒穴位", "反刍"] },
    "肯泰罗（帕底亚-火炽种）": { types: ["Fighting", "Fire"], baseStats: { hp: 75, attack: 110, defense: 105, spAttack: 30, spDefense: 70, speed: 100 }, abilities: ["威吓", "愤怒穴位", "反刍"] },
    "肯泰罗（帕底亚-水澜种）": { types: ["Fighting", "Water"], baseStats: { hp: 75, attack: 110, defense: 105, spAttack: 30, spDefense: 70, speed: 100 }, abilities: ["威吓", "愤怒穴位", "反刍"] },
    "暴鲤龙": { types: ["Water", "Flying"], baseStats: { hp: 95, attack: 125, defense: 79, spAttack: 60, spDefense: 100, speed: 81 }, abilities: ["威吓", "自信过度"] },
    "百变怪": { types: ["Normal"], baseStats: { hp: 48, attack: 48, defense: 48, spAttack: 48, spDefense: 48, speed: 48 }, abilities: ["柔软", "变身者"] },
    "水伊布": { types: ["Water"], baseStats: { hp: 130, attack: 65, defense: 60, spAttack: 110, spDefense: 95, speed: 65 }, abilities: ["储水", "湿润之躯"] },
    "雷伊布": { types: ["Electric"], baseStats: { hp: 65, attack: 65, defense: 60, spAttack: 110, spDefense: 95, speed: 130 }, abilities: ["蓄电", "飞毛腿"] },
    "火伊布": { types: ["Fire"], baseStats: { hp: 65, attack: 130, defense: 60, spAttack: 95, spDefense: 110, speed: 65 }, abilities: ["引火", "毅力"] },
    "化石翼龙": { types: ["Rock", "Flying"], baseStats: { hp: 80, attack: 105, defense: 65, spAttack: 60, spDefense: 75, speed: 130 }, abilities: ["坚硬脑袋", "压迫感", "紧张感"] },
    "卡比兽": { types: ["Normal"], baseStats: { hp: 160, attack: 110, defense: 65, spAttack: 65, spDefense: 110, speed: 30 }, abilities: ["免疫", "厚脂肪", "贪吃鬼"] },
    "快龙": { types: ["Dragon", "Flying"], baseStats: { hp: 91, attack: 134, defense: 95, spAttack: 100, spDefense: 100, speed: 80 }, abilities: ["精神力", "多重鳞片"] },
    "大竺葵": { types: ["Grass"], baseStats: { hp: 80, attack: 82, defense: 100, spAttack: 83, spDefense: 100, speed: 80 }, abilities: ["茂盛", "叶子防守"] },
    "火暴兽（城都）": { types: ["Fire"], baseStats: { hp: 78, attack: 84, defense: 78, spAttack: 109, spDefense: 85, speed: 100 }, abilities: ["猛火", "引火"] },
    "火暴兽（洗翠）": { types: ["Fire", "Ghost"], baseStats: { hp: 73, attack: 84, defense: 78, spAttack: 119, spDefense: 85, speed: 95 }, abilities: ["猛火", "引火"] },
    "大力鳄": { types: ["Water"], baseStats: { hp: 85, attack: 105, defense: 100, spAttack: 79, spDefense: 83, speed: 78 }, abilities: ["激流", "强行"] },
    "阿利多斯": { types: ["Bug", "Poison"], baseStats: { hp: 70, attack: 90, defense: 70, spAttack: 60, spDefense: 70, speed: 40 }, abilities: ["虫之预感", "不眠", "狙击手"] },
    "电龙": { types: ["Electric"], baseStats: { hp: 90, attack: 75, defense: 85, spAttack: 115, spDefense: 90, speed: 55 }, abilities: ["静电", "正电"] },
    "玛力露丽": { types: ["Water", "Fairy"], baseStats: { hp: 100, attack: 50, defense: 80, spAttack: 60, spDefense: 80, speed: 50 }, abilities: ["厚脂肪", "大力士", "食草"] },
    "蚊香蛙皇": { types: ["Water"], baseStats: { hp: 90, attack: 75, defense: 75, spAttack: 90, spDefense: 100, speed: 70 }, abilities: ["储水", "潮湿", "降雨"] },
    "太阳伊布": { types: ["Psychic"], baseStats: { hp: 65, attack: 65, defense: 60, spAttack: 130, spDefense: 95, speed: 110 }, abilities: ["同步", "魔法镜"] },
    "月亮伊布": { types: ["Dark"], baseStats: { hp: 95, attack: 65, defense: 110, spAttack: 60, spDefense: 130, speed: 65 }, abilities: ["同步", "精神力"] },
    "呆呆王（关都）": { types: ["Water", "Psychic"], baseStats: { hp: 95, attack: 75, defense: 80, spAttack: 100, spDefense: 110, speed: 30 }, abilities: ["迟钝", "我行我素", "再生力"] },
    "呆呆王（伽勒尔）": { types: ["Poison", "Psychic"], baseStats: { hp: 95, attack: 65, defense: 80, spAttack: 110, spDefense: 110, speed: 30 }, abilities: ["速击", "我行我素", "再生力"] },
    "佛烈托斯": { types: ["Bug", "Steel"], baseStats: { hp: 75, attack: 90, defense: 140, spAttack: 60, spDefense: 60, speed: 40 }, abilities: ["结实", "防尘"] },
    "大钢蛇": { types: ["Steel", "Ground"], baseStats: { hp: 75, attack: 85, defense: 200, spAttack: 55, spDefense: 65, speed: 30 }, abilities: ["坚硬脑袋", "结实", "强行"] },
    "巨钳螳螂": { types: ["Bug", "Steel"], baseStats: { hp: 70, attack: 130, defense: 100, spAttack: 55, spDefense: 80, speed: 65 }, abilities: ["虫之预感", "技术高手", "轻金属"] },
    "赫拉克罗斯": { types: ["Bug", "Fighting"], baseStats: { hp: 80, attack: 125, defense: 75, spAttack: 40, spDefense: 95, speed: 85 }, abilities: ["虫之预感", "毅力", "自信过度"] },
    "盔甲鸟": { types: ["Steel", "Flying"], baseStats: { hp: 65, attack: 80, defense: 140, spAttack: 40, spDefense: 70, speed: 70 }, abilities: ["锐利目光", "结实", "破碎铠甲"] },
    "黑鲁加": { types: ["Dark", "Fire"], baseStats: { hp: 75, attack: 90, defense: 50, spAttack: 110, spDefense: 80, speed: 95 }, abilities: ["早起", "引火", "紧张感"] },
    "班基拉斯": { types: ["Rock", "Dark"], baseStats: { hp: 100, attack: 134, defense: 110, spAttack: 95, spDefense: 100, speed: 61 }, abilities: ["扬沙", "紧张感"] },
    "大嘴鸥": { types: ["Water", "Flying"], baseStats: { hp: 60, attack: 50, defense: 100, spAttack: 95, spDefense: 70, speed: 65 }, abilities: ["锐利目光", "降雨", "雨盘"] },
    "沙奈朵": { types: ["Psychic", "Fairy"], baseStats: { hp: 68, attack: 65, defense: 65, spAttack: 125, spDefense: 115, speed: 80 }, abilities: ["同步", "复制", "心灵感应"] },
    "勾魂眼": { types: ["Dark", "Ghost"], baseStats: { hp: 50, attack: 75, defense: 75, spAttack: 65, spDefense: 65, speed: 50 }, abilities: ["锐利目光", "慢出", "恶作剧之心"] },
    "波士可多拉": { types: ["Steel", "Rock"], baseStats: { hp: 70, attack: 110, defense: 180, spAttack: 60, spDefense: 60, speed: 50 }, abilities: ["结实", "坚硬脑袋", "重金属"] },
    "恰雷姆": { types: ["Fighting", "Psychic"], baseStats: { hp: 60, attack: 60, defense: 75, spAttack: 60, spDefense: 75, speed: 80 }, abilities: ["瑜珈之力", "超幸运", "心灵感应"] },
    "雷电兽": { types: ["Electric"], baseStats: { hp: 70, attack: 75, defense: 60, spAttack: 105, spDefense: 60, speed: 105 }, abilities: ["静电", "避雷针", "负电"] },
    "巨牙鲨": { types: ["Water", "Dark"], baseStats: { hp: 70, attack: 120, defense: 40, spAttack: 95, spDefense: 40, speed: 95 }, abilities: ["鲨鱼皮", "加速"] },
    "喷火驼": { types: ["Fire", "Ground"], baseStats: { hp: 70, attack: 100, defense: 70, spAttack: 105, spDefense: 75, speed: 40 }, abilities: ["熔岩铠甲", "坚硬岩石", "愤怒穴位"] },
    "煤炭龟": { types: ["Fire"], baseStats: { hp: 70, attack: 85, defense: 140, spAttack: 85, spDefense: 70, speed: 20 }, abilities: ["白色烟雾", "日照", "硬壳盔甲"] },
    "七夕青鸟": { types: ["Dragon", "Flying"], baseStats: { hp: 75, attack: 70, defense: 90, spAttack: 70, spDefense: 105, speed: 80 }, abilities: ["自然回复", "无关天气"] },
    "美纳斯": { types: ["Water"], baseStats: { hp: 95, attack: 60, defense: 79, spAttack: 100, spDefense: 125, speed: 81 }, abilities: ["神奇鳞片", "好胜", "迷人之躯"] },
    "飘浮泡泡": { types: ["Normal"], baseStats: { hp: 70, attack: 70, defense: 70, spAttack: 70, spDefense: 70, speed: 70 }, abilities: ["阴晴不定"] },
    "诅咒娃娃": { types: ["Ghost"], baseStats: { hp: 64, attack: 115, defense: 65, spAttack: 83, spDefense: 63, speed: 65 }, abilities: ["不眠", "察觉", "诅咒之躯"] },
    "风铃铃": { types: ["Psychic"], baseStats: { hp: 75, attack: 50, defense: 80, spAttack: 95, spDefense: 90, speed: 65 }, abilities: ["漂浮", "踩影"] },
    "阿勃梭鲁": { types: ["Dark"], baseStats: { hp: 65, attack: 130, defense: 60, spAttack: 75, spDefense: 60, speed: 75 }, abilities: ["压迫感", "超幸运", "正义之心"] },
    "冰鬼护": { types: ["Ice"], baseStats: { hp: 80, attack: 80, defense: 80, spAttack: 80, spDefense: 80, speed: 80 }, abilities: ["精神力", "冰冻之躯", "心意不定"] },
    "土台龟": { types: ["Grass", "Ground"], baseStats: { hp: 95, attack: 109, defense: 105, spAttack: 75, spDefense: 85, speed: 56 }, abilities: ["茂盛", "硬壳盔甲"] },
    "烈焰猴": { types: ["Fire", "Fighting"], baseStats: { hp: 76, attack: 104, defense: 71, spAttack: 104, spDefense: 71, speed: 108 }, abilities: ["猛火", "铁拳"] },
    "帝王拿波": { types: ["Water", "Steel"], baseStats: { hp: 84, attack: 86, defense: 88, spAttack: 111, spDefense: 101, speed: 60 }, abilities: ["激流", "不服输"] },
    "伦琴猫": { types: ["Electric"], baseStats: { hp: 80, attack: 120, defense: 79, spAttack: 95, spDefense: 79, speed: 70 }, abilities: ["斗争心", "威吓", "毅力"] },
    "罗丝雷朵": { types: ["Grass", "Poison"], baseStats: { hp: 60, attack: 70, defense: 65, spAttack: 125, spDefense: 105, speed: 90 }, abilities: ["自然回复", "毒刺", "技术高手"] },
    "战槌龙": { types: ["Rock"], baseStats: { hp: 97, attack: 165, defense: 60, spAttack: 65, spDefense: 50, speed: 58 }, abilities: ["破格", "强行"] },
    "护城龙": { types: ["Rock", "Steel"], baseStats: { hp: 60, attack: 52, defense: 168, spAttack: 47, spDefense: 138, speed: 30 }, abilities: ["结实", "隔音"] },
    "长耳兔": { types: ["Normal"], baseStats: { hp: 65, attack: 76, defense: 84, spAttack: 54, spDefense: 96, speed: 105 }, abilities: ["迷人之躯", "笨拙", "柔软"] },
    "花岩怪": { types: ["Ghost", "Dark"], baseStats: { hp: 50, attack: 92, defense: 108, spAttack: 92, spDefense: 108, speed: 35 }, abilities: ["压迫感", "穿透"] },
    "烈咬陆鲨": { types: ["Dragon", "Ground"], baseStats: { hp: 108, attack: 130, defense: 95, spAttack: 80, spDefense: 85, speed: 102 }, abilities: ["沙隐", "粗糙皮肤"] },
    "路卡利欧": { types: ["Fighting", "Steel"], baseStats: { hp: 70, attack: 110, defense: 70, spAttack: 115, spDefense: 70, speed: 90 }, abilities: ["不屈之心", "精神力", "正义之心"] },
    "河马兽": { types: ["Ground"], baseStats: { hp: 108, attack: 112, defense: 118, spAttack: 68, spDefense: 72, speed: 47 }, abilities: ["扬沙", "沙之力"] },
    "毒骷蛙": { types: ["Poison", "Fighting"], baseStats: { hp: 83, attack: 106, defense: 65, spAttack: 86, spDefense: 65, speed: 85 }, abilities: ["危险预知", "干燥皮肤", "毒手"] },
    "暴雪王": { types: ["Grass", "Ice"], baseStats: { hp: 90, attack: 92, defense: 75, spAttack: 92, spDefense: 85, speed: 60 }, abilities: ["降雪", "隔音"] },
    "玛狃拉": { types: ["Dark", "Ice"], baseStats: { hp: 70, attack: 120, defense: 65, spAttack: 45, spDefense: 85, speed: 125 }, abilities: ["压迫感", "顺手牵羊"] },
    "超甲狂犀": { types: ["Ground", "Rock"], baseStats: { hp: 115, attack: 140, defense: 130, spAttack: 55, spDefense: 55, speed: 40 }, abilities: ["避雷针", "坚硬岩石", "舍身"] },
    "叶伊布": { types: ["Grass"], baseStats: { hp: 65, attack: 110, defense: 130, spAttack: 60, spDefense: 65, speed: 95 }, abilities: ["叶子防守", "叶绿素"] },
    "冰伊布": { types: ["Ice"], baseStats: { hp: 65, attack: 60, defense: 110, spAttack: 130, spDefense: 95, speed: 65 }, abilities: ["雪隐", "冰冻之躯"] },
    "天蝎王": { types: ["Ground", "Flying"], baseStats: { hp: 75, attack: 95, defense: 125, spAttack: 45, spDefense: 75, speed: 95 }, abilities: ["怪力钳", "沙隐", "毒疗"] },
    "象牙猪": { types: ["Ice", "Ground"], baseStats: { hp: 110, attack: 130, defense: 80, spAttack: 70, spDefense: 60, speed: 80 }, abilities: ["迟钝", "雪隐", "厚脂肪"] },
    "艾路雷朵": { types: ["Psychic", "Fighting"], baseStats: { hp: 68, attack: 125, defense: 65, spAttack: 65, spDefense: 115, speed: 80 }, abilities: ["不屈之心", "正义之心"] },
    "雪妖女": { types: ["Ice", "Ghost"], baseStats: { hp: 70, attack: 80, defense: 70, spAttack: 80, spDefense: 70, speed: 110 }, abilities: ["雪隐", "诅咒之躯"] },
    "洛托姆": { types: ["Electric", "Ghost"], baseStats: { hp: 50, attack: 50, defense: 77, spAttack: 95, spDefense: 77, speed: 91 }, abilities: ["漂浮"] },
    "洛托姆（加热形态）": { types: ["Electric", "Fire"], baseStats: { hp: 50, attack: 65, defense: 107, spAttack: 105, spDefense: 107, speed: 86 }, abilities: ["漂浮"] },
    "洛托姆（清洗形态）": { types: ["Electric", "Water"], baseStats: { hp: 50, attack: 65, defense: 107, spAttack: 105, spDefense: 107, speed: 86 }, abilities: ["漂浮"] },
    "洛托姆（结冰形态）": { types: ["Electric", "Ice"], baseStats: { hp: 50, attack: 65, defense: 107, spAttack: 105, spDefense: 107, speed: 86 }, abilities: ["漂浮"] },
    "洛托姆（旋转形态）": { types: ["Electric", "Flying"], baseStats: { hp: 50, attack: 65, defense: 107, spAttack: 105, spDefense: 107, speed: 86 }, abilities: ["漂浮"] },
    "洛托姆（切割形态）": { types: ["Electric", "Grass"], baseStats: { hp: 50, attack: 65, defense: 107, spAttack: 105, spDefense: 107, speed: 86 }, abilities: ["漂浮"] },
    "君主蛇": { types: ["Grass"], baseStats: { hp: 75, attack: 75, defense: 95, spAttack: 75, spDefense: 95, speed: 113 }, abilities: ["茂盛", "唱反调"] },
    "炎武王": { types: ["Fire", "Fighting"], baseStats: { hp: 110, attack: 123, defense: 65, spAttack: 100, spDefense: 65, speed: 65 }, abilities: ["猛火", "舍身"] },
    "大剑鬼（合众）": { types: ["Water"], baseStats: { hp: 95, attack: 100, defense: 85, spAttack: 108, spDefense: 70, speed: 70 }, abilities: ["激流", "贝壳盔甲"] },
    "大剑鬼（洗翠）": { types: ["Water", "Dark"], baseStats: { hp: 90, attack: 108, defense: 80, spAttack: 100, spDefense: 65, speed: 85 }, abilities: ["激流", "正义之心"] },
    "步哨鼠": { types: ["Normal"], baseStats: { hp: 60, attack: 85, defense: 69, spAttack: 60, spDefense: 69, speed: 77 }, abilities: ["发光", "锐利目光", "分析"] },
    "酷豹": { types: ["Dark"], baseStats: { hp: 64, attack: 88, defense: 50, spAttack: 88, spDefense: 50, speed: 106 }, abilities: ["柔软", "轻装", "恶作剧之心"] },
    "花椰猿": { types: ["Grass"], baseStats: { hp: 75, attack: 98, defense: 63, spAttack: 98, spDefense: 63, speed: 101 }, abilities: ["贪吃鬼", "茂盛"] },
    "爆香猿": { types: ["Fire"], baseStats: { hp: 75, attack: 98, defense: 63, spAttack: 98, spDefense: 63, speed: 101 }, abilities: ["贪吃鬼", "猛火"] },
    "冷水猿": { types: ["Water"], baseStats: { hp: 75, attack: 98, defense: 63, spAttack: 98, spDefense: 63, speed: 101 }, abilities: ["贪吃鬼", "激流"] },
    "龙头地鼠": { types: ["Ground", "Steel"], baseStats: { hp: 110, attack: 135, defense: 60, spAttack: 50, spDefense: 65, speed: 88 }, abilities: ["沙之力", "破格", " Mold Breaker"] },
    "差不多娃娃": { types: ["Normal"], baseStats: { hp: 103, attack: 60, defense: 86, spAttack: 60, spDefense: 86, speed: 50 }, abilities: ["治愈之心", "再生力", "笨拙"] },
    "修建老匠": { types: ["Fighting"], baseStats: { hp: 105, attack: 140, defense: 95, spAttack: 55, spDefense: 65, speed: 45 }, abilities: ["毅力", "全力攻击", "铁拳"] },
    "风妖精": { types: ["Grass", "Fairy"], baseStats: { hp: 60, attack: 67, defense: 85, spAttack: 77, spDefense: 75, speed: 116 }, abilities: ["恶作剧之心", "叶绿素", "穿透"] },
    "流氓鳄": { types: ["Ground", "Dark"], baseStats: { hp: 95, attack: 117, defense: 80, spAttack: 65, spDefense: 70, speed: 92 }, abilities: ["威吓", "自信过度", "愤怒穴位"] },
    "死神棺": { types: ["Ghost"], baseStats: { hp: 58, attack: 50, defense: 145, spAttack: 95, spDefense: 105, speed: 30 }, abilities: ["木乃伊"] },
    "灰尘山": { types: ["Poison"], baseStats: { hp: 80, attack: 95, defense: 82, spAttack: 60, spDefense: 82, speed: 75 }, abilities: ["恶臭", "破碎铠甲", "引爆"] },
    "索罗亚克（合众）": { types: ["Dark"], baseStats: { hp: 60, attack: 105, defense: 60, spAttack: 120, spDefense: 60, speed: 105 }, abilities: ["幻影"] },
    "索罗亚克（洗翠）": { types: ["Normal", "Ghost"], baseStats: { hp: 55, attack: 100, defense: 60, spAttack: 125, spDefense: 60, speed: 110 }, abilities: ["幻影"] },
    "人造细胞卵": { types: ["Psychic"], baseStats: { hp: 110, attack: 65, defense: 75, spAttack: 125, spDefense: 85, speed: 30 }, abilities: ["防尘", "魔法防守", "再生力"] },
    "双倍多多冰": { types: ["Ice"], baseStats: { hp: 71, attack: 95, defense: 85, spAttack: 110, spDefense: 95, speed: 79 }, abilities: ["冰冻之躯", "雪隐", "破碎铠甲"] },
    "电飞鼠": { types: ["Electric", "Flying"], baseStats: { hp: 55, attack: 75, defense: 60, spAttack: 75, spDefense: 60, speed: 103 }, abilities: ["静电", "电力引擎"] },
    "水晶灯火灵": { types: ["Ghost", "Fire"], baseStats: { hp: 60, attack: 55, defense: 90, spAttack: 145, spDefense: 90, speed: 80 }, abilities: ["引火", "火焰之躯", "穿透"] },
    "冻原熊": { types: ["Ice"], baseStats: { hp: 95, attack: 130, defense: 80, spAttack: 70, spDefense: 80, speed: 50 }, abilities: ["雪隐", "拨雪", "胆量"] },
    "泥巴鱼（合众）": { types: ["Ground", "Electric"], baseStats: { hp: 109, attack: 66, defense: 84, spAttack: 81, spDefense: 99, speed: 32 }, abilities: ["静电", "柔软", "沙隐"] },
    "泥巴鱼（伽勒尔）": { types: ["Ground", "Steel"], baseStats: { hp: 109, attack: 81, defense: 99, spAttack: 66, spDefense: 84, speed: 32 }, abilities: ["拟态", "镜甲", "沙隐"] },
    "泥偶巨人": { types: ["Ground", "Ghost"], baseStats: { hp: 89, attack: 124, defense: 80, spAttack: 55, spDefense: 80, speed: 55 }, abilities: ["铁拳", "笨拙", " no guard"] },
    "三首恶龙": { types: ["Dark", "Dragon"], baseStats: { hp: 92, attack: 105, defense: 90, spAttack: 125, spDefense: 90, speed: 98 }, abilities: ["漂浮"] },
    "火神蛾": { types: ["Bug", "Fire"], baseStats: { hp: 85, attack: 60, defense: 65, spAttack: 135, spDefense: 105, speed: 100 }, abilities: ["火焰之躯", "虫之预感"] },
    "布里卡隆": { types: ["Grass", "Fighting"], baseStats: { hp: 88, attack: 107, defense: 122, spAttack: 74, spDefense: 75, speed: 64 }, abilities: ["茂盛", "防弹"] },
    "妖火红狐": { types: ["Fire", "Psychic"], baseStats: { hp: 75, attack: 69, defense: 72, spAttack: 114, spDefense: 100, speed: 104 }, abilities: ["猛火", "魔术师"] },
    "甲贺忍蛙": { types: ["Water", "Dark"], baseStats: { hp: 72, attack: 95, defense: 67, spAttack: 103, spDefense: 71, speed: 122 }, abilities: ["激流", "变幻自在"] },
    "掘地兔": { types: ["Normal", "Ground"], baseStats: { hp: 85, attack: 56, defense: 77, spAttack: 50, spDefense: 77, speed: 78 }, abilities: ["捡拾", "颊囊", "大力士"] },
    "烈箭鹰": { types: ["Fire", "Flying"], baseStats: { hp: 78, attack: 81, defense: 71, spAttack: 74, spDefense: 69, speed: 126 }, abilities: ["火焰之躯", "疾风之翼"] },
    "彩粉蝶": { types: ["Bug", "Flying"], baseStats: { hp: 80, attack: 52, defense: 50, spAttack: 90, spDefense: 50, speed: 89 }, abilities: ["鳞粉", "复眼", "友情防守"] },
    "花蓓蓓": { types: ["Fairy"], baseStats: { hp: 44, attack: 38, defense: 39, spAttack: 61, spDefense: 79, speed: 42 }, abilities: ["花幕", "共生"] },
    "花洁夫人": { types: ["Fairy"], baseStats: { hp: 78, attack: 65, defense: 68, spAttack: 112, spDefense: 154, speed: 75 }, abilities: ["花幕", "共生"] },
    "流氓熊猫": { types: ["Fighting", "Dark"], baseStats: { hp: 95, attack: 124, defense: 78, spAttack: 69, spDefense: 71, speed: 58 }, abilities: ["铁拳", "破格", "胆量"] },
    "多丽米亚": { types: ["Normal"], baseStats: { hp: 75, attack: 80, defense: 60, spAttack: 65, spDefense: 90, speed: 102 }, abilities: ["毛皮大衣"] },
    "妙喵": { types: ["Psychic"], baseStats: { hp: 62, attack: 48, defense: 54, spAttack: 63, spDefense: 60, speed: 68 }, abilities: ["锐利目光", "穿透", "我行我素"] },
    "坚盾剑怪": { types: ["Steel", "Ghost"], baseStats: { hp: 60, attack: 50, defense: 150, spAttack: 50, spDefense: 150, speed: 60 }, abilities: ["战斗切换"] },
    "芳香精": { types: ["Fairy"], baseStats: { hp: 101, attack: 72, defense: 72, spAttack: 99, spDefense: 89, speed: 29 }, abilities: ["治愈之心", "芳香幕"] },
    "胖甜妮": { types: ["Fairy"], baseStats: { hp: 82, attack: 80, defense: 86, spAttack: 85, spDefense: 75, speed: 72 }, abilities: ["甜幕", "轻装", " unaware"] },
    "钢炮臂虾": { types: ["Water"], baseStats: { hp: 71, attack: 73, defense: 88, spAttack: 120, spDefense: 89, speed: 59 }, abilities: ["超级发射器"] },
    "光电伞蜥": { types: ["Electric", "Normal"], baseStats: { hp: 62, attack: 55, defense: 52, spAttack: 109, spDefense: 94, speed: 109 }, abilities: ["干燥皮肤", "沙隐", "太阳之力"] },
    "怪颚龙": { types: ["Rock", "Dragon"], baseStats: { hp: 82, attack: 121, defense: 119, spAttack: 69, spDefense: 59, speed: 71 }, abilities: ["强壮之颚", "坚硬脑袋"] },
    "冰雪龙": { types: ["Rock", "Ice"], baseStats: { hp: 77, attack: 59, defense: 50, spAttack: 67, spDefense: 63, speed: 46 }, abilities: ["冰冻皮肤", "降雪"] },
    "仙子伊布": { types: ["Fairy"], baseStats: { hp: 95, attack: 65, defense: 65, spAttack: 110, spDefense: 130, speed: 60 }, abilities: ["迷人之躯", "妖精皮肤"] },
    "摔角鹰人": { types: ["Fighting", "Flying"], baseStats: { hp: 78, attack: 92, defense: 75, spAttack: 74, spDefense: 63, speed: 118 }, abilities: ["柔软", "轻装", "破格"] },
    "咚咚鼠": { types: ["Electric", "Fairy"], baseStats: { hp: 67, attack: 58, defense: 57, spAttack: 81, spDefense: 67, speed: 101 }, abilities: ["颊囊", "捡拾", " plus"] },
    "黏美龙（卡洛斯）": { types: ["Dragon"], baseStats: { hp: 90, attack: 100, defense: 70, spAttack: 110, spDefense: 150, speed: 80 }, abilities: ["食草", "湿润之躯", "黏滑"] },
    "黏美龙（洗翠）": { types: ["Steel", "Dragon"], baseStats: { hp: 80, attack: 100, defense: 100, spAttack: 110, spDefense: 150, speed: 60 }, abilities: ["食草", "贝壳盔甲", "黏着"] },
    "钥圈儿": { types: ["Steel", "Fairy"], baseStats: { hp: 57, attack: 80, defense: 91, spAttack: 80, spDefense: 87, speed: 75 }, abilities: ["恶作剧之心", "魔术师"] },
    "朽木妖": { types: ["Ghost", "Grass"], baseStats: { hp: 85, attack: 110, defense: 76, spAttack: 65, spDefense: 82, speed: 56 }, abilities: ["自然回复", "洞察", "收获"] },
    "南瓜怪人": { types: ["Ghost", "Grass"], baseStats: { hp: 85, attack: 100, defense: 122, spAttack: 58, spDefense: 75, speed: 54 }, abilities: ["捡拾", "洞察", "不眠"] },
    "冰岩怪（卡洛斯）": { types: ["Ice"], baseStats: { hp: 95, attack: 117, defense: 184, spAttack: 44, spDefense: 46, speed: 28 }, abilities: ["我行我素", "冰冻之躯", "结实"] },
    "冰岩怪（洗翠）": { types: ["Ice", "Rock"], baseStats: { hp: 95, attack: 127, defense: 184, spAttack: 34, spDefense: 36, speed: 38 }, abilities: ["强壮之颚", "冰冻之躯", "结实"] },
    "音波龙": { types: ["Flying", "Dragon"], baseStats: { hp: 85, attack: 70, defense: 80, spAttack: 97, spDefense: 80, speed: 123 }, abilities: ["察觉", "穿透", "心灵感应"] },
    "狙射树枭（阿罗拉）": { types: ["Grass", "Ghost"], baseStats: { hp: 78, attack: 107, defense: 75, spAttack: 100, spDefense: 100, speed: 70 }, abilities: ["茂盛", "远隔"] },
    "狙射树枭（洗翠）": { types: ["Grass", "Fighting"], baseStats: { hp: 88, attack: 112, defense: 80, spAttack: 95, spDefense: 95, speed: 60 }, abilities: ["茂盛", "胆量"] },
    "炽焰咆哮虎": { types: ["Fire", "Dark"], baseStats: { hp: 95, attack: 115, defense: 90, spAttack: 80, spDefense: 90, speed: 60 }, abilities: ["猛火", "威吓"] },
    "西狮海壬": { types: ["Water", "Fairy"], baseStats: { hp: 80, attack: 74, defense: 74, spAttack: 126, spDefense: 116, speed: 60 }, abilities: ["激流", "湿润之声"] },
    "铳嘴大鸟": { types: ["Normal", "Flying"], baseStats: { hp: 80, attack: 120, defense: 75, spAttack: 75, spDefense: 75, speed: 60 }, abilities: ["锐利目光", "连续攻击", "强行"] },
    "好胜毛蟹": { types: ["Fighting", "Ice"], baseStats: { hp: 97, attack: 132, defense: 77, spAttack: 62, spDefense: 67, speed: 43 }, abilities: ["铁拳", " hyper cutter", "愤怒穴位"] },
    "鬃岩狼人": { types: ["Rock"], baseStats: { hp: 75, attack: 115, defense: 65, spAttack: 55, spDefense: 65, speed: 112 }, abilities: ["锐利目光", "拨沙", "不屈之心"] },
    "超坏星": { types: ["Poison", "Water"], baseStats: { hp: 50, attack: 63, defense: 152, spAttack: 53, spDefense: 142, speed: 35 }, abilities: ["不仁不义", "柔软", "再生力"] },
    "重泥挽马": { types: ["Ground"], baseStats: { hp: 100, attack: 125, defense: 100, spAttack: 55, spDefense: 85, speed: 35 }, abilities: ["我行我素", "持久力", "精神力"] },
    "滴蛛霸": { types: ["Water", "Bug"], baseStats: { hp: 68, attack: 70, defense: 92, spAttack: 50, spDefense: 132, speed: 42 }, abilities: ["水泡", "储水"] },
    "焰后蜥": { types: ["Poison", "Fire"], baseStats: { hp: 68, attack: 64, defense: 60, spAttack: 111, spDefense: 60, speed: 117 }, abilities: ["腐蚀", "迟钝"] },
    "甜冷美后": { types: ["Grass"], baseStats: { hp: 72, attack: 120, defense: 98, spAttack: 50, spDefense: 98, speed: 72 }, abilities: ["叶子防守", "女王的威严", "甜幕"] },
    "智挥猩": { types: ["Normal", "Psychic"], baseStats: { hp: 90, attack: 60, defense: 80, spAttack: 90, spDefense: 110, speed: 60 }, abilities: ["精神力", "心灵感应", "共生"] },
    "投掷猴": { types: ["Fighting"], baseStats: { hp: 100, attack: 120, defense: 90, spAttack: 40, spDefense: 60, speed: 80 }, abilities: ["接球手", "不服输"] },
    "谜拟丘": { types: ["Ghost", "Fairy"], baseStats: { hp: 55, attack: 90, defense: 80, spAttack: 50, spDefense: 105, speed: 96 }, abilities: ["画皮"] },
    "老翁龙": { types: ["Normal", "Dragon"], baseStats: { hp: 78, attack: 60, defense: 85, spAttack: 135, spDefense: 91, speed: 36 }, abilities: ["怒火冲天", "食草", "无关天气"] },
    "杖尾鳞甲龙": { types: ["Dragon", "Fighting"], baseStats: { hp: 75, attack: 110, defense: 125, spAttack: 100, spDefense: 105, speed: 85 }, abilities: ["防弹", "隔音", "防尘"] },
    "钢铠鸦": { types: ["Flying", "Steel"], baseStats: { hp: 98, attack: 87, defense: 105, spAttack: 53, spDefense: 85, speed: 67 }, abilities: ["压迫感", "紧张感", "镜甲"] },
    "苹裹龙": { types: ["Grass", "Dragon"], baseStats: { hp: 70, attack: 110, defense: 80, spAttack: 95, spDefense: 60, speed: 70 }, abilities: ["熟成", "贪吃鬼", "活力"] },
    "丰蜜龙": { types: ["Grass", "Dragon"], baseStats: { hp: 110, attack: 85, defense: 80, spAttack: 100, spDefense: 80, speed: 30 }, abilities: ["熟成", "贪吃鬼", "厚脂肪"] },
    "沙螺蟒": { types: ["Ground"], baseStats: { hp: 72, attack: 107, defense: 125, spAttack: 65, spDefense: 70, speed: 71 }, abilities: ["吐沙", "蜕皮", "沙隐"] },
    "怖思壶": { types: ["Ghost"], baseStats: { hp: 60, attack: 65, defense: 65, spAttack: 134, spDefense: 114, speed: 70 }, abilities: ["碎裂铠甲", "诅咒之躯"] },
    "布莉姆温": { types: ["Psychic", "Fairy"], baseStats: { hp: 57, attack: 90, defense: 95, spAttack: 136, spDefense: 103, speed: 29 }, abilities: ["治愈之心", "危险预知", "魔法镜"] },
    "踏冰人偶": { types: ["Ice", "Psychic"], baseStats: { hp: 80, attack: 75, defense: 110, spAttack: 110, spDefense: 90, speed: 70 }, abilities: ["蹒跚", "冰冻之躯", "魔术师"] },
    "死神板": { types: ["Ground", "Ghost"], baseStats: { hp: 58, attack: 95, defense: 145, spAttack: 50, spDefense: 105, speed: 30 }, abilities: ["游魂"] },
    "霜奶仙": { types: ["Fairy"], baseStats: { hp: 65, attack: 60, defense: 75, spAttack: 110, spDefense: 121, speed: 64 }, abilities: ["甜幕", "芳香幕"] },
    "莫鲁贝可": { types: ["Electric", "Dark"], baseStats: { hp: 58, attack: 95, defense: 58, spAttack: 70, spDefense: 58, speed: 97 }, abilities: ["饱了又饿"] },
    "多龙巴鲁托": { types: ["Dragon", "Ghost"], baseStats: { hp: 88, attack: 120, defense: 75, spAttack: 100, spDefense: 75, speed: 142 }, abilities: ["恒净之躯", "穿透", "诅咒之躯"] },
    "诡角鹿": { types: ["Normal", "Psychic"], baseStats: { hp: 103, attack: 105, defense: 72, spAttack: 105, spDefense: 75, speed: 65 }, abilities: ["威吓", "食草", "精神力"] },
    "劈斧螳螂": { types: ["Bug", "Rock"], baseStats: { hp: 70, attack: 135, defense: 95, spAttack: 45, spDefense: 70, speed: 85 }, abilities: ["虫之预感", "技术高手", "不屈之心"] },
    "幽尾玄鱼": { types: ["Water", "Ghost"], baseStats: { hp: 120, attack: 112, defense: 65, spAttack: 80, spDefense: 75, speed: 78 }, abilities: ["胆怯", "适应力", "破格"] },
    "大狃拉": { types: ["Fighting", "Poison"], baseStats: { hp: 80, attack: 130, defense: 60, spAttack: 40, spDefense: 80, speed: 120 }, abilities: ["压迫感", "毒手", "顺手牵羊"] },
    "魔幻假面喵": { types: ["Grass", "Dark"], baseStats: { hp: 76, attack: 110, defense: 70, spAttack: 81, spDefense: 70, speed: 123 }, abilities: ["茂盛", "变换自如"] },
    "骨纹巨声鳄": { types: ["Fire", "Ghost"], baseStats: { hp: 104, attack: 75, defense: 100, spAttack: 110, spDefense: 75, speed: 66 }, abilities: ["猛火", "纯朴"] },
    "狂欢浪舞鸭": { types: ["Water", "Fighting"], baseStats: { hp: 85, attack: 120, defense: 80, spAttack: 85, spDefense: 75, speed: 85 }, abilities: ["激流", "自信过度"] },
    "一家鼠": { types: ["Normal"], baseStats: { hp: 74, attack: 75, defense: 70, spAttack: 65, spDefense: 75, speed: 111 }, abilities: ["友情防守", "颊囊", "技术高手"] },
    "盐石巨灵": { types: ["Rock"], baseStats: { hp: 100, attack: 100, defense: 130, spAttack: 45, spDefense: 90, speed: 35 }, abilities: ["洁净之盐", "结实", "恒净之躯"] },
    "红莲铠骑": { types: ["Fire", "Psychic"], baseStats: { hp: 85, attack: 60, defense: 100, spAttack: 125, spDefense: 80, speed: 75 }, abilities: ["引火", "碎裂铠甲"] },
    "苍炎刃鬼": { types: ["Fire", "Ghost"], baseStats: { hp: 75, attack: 125, defense: 80, spAttack: 60, spDefense: 100, speed: 85 }, abilities: ["引火", "碎裂铠甲"] },
    "电肚蛙": { types: ["Electric"], baseStats: { hp: 109, attack: 64, defense: 91, spAttack: 103, spDefense: 83, speed: 45 }, abilities: ["静电", "电力转换"] },
    "狠辣椒": { types: ["Grass", "Fire"], baseStats: { hp: 65, attack: 108, defense: 65, spAttack: 108, spDefense: 65, speed: 75 }, abilities: ["叶绿素", "日照", "不眠"] },
    "超能艳鸵": { types: ["Psychic"], baseStats: { hp: 95, attack: 60, defense: 60, spAttack: 101, spDefense: 60, speed: 105 }, abilities: ["跟风", "察觉", "加速"] },
    "巨锻匠": { types: ["Fairy", "Steel"], baseStats: { hp: 85, attack: 75, defense: 77, spAttack: 70, spDefense: 105, speed: 94 }, abilities: ["破格", "我行我素", "顺手牵羊"] },
    "海豚侠": { types: ["Water"], baseStats: { hp: 100, attack: 70, defense: 72, spAttack: 53, spDefense: 62, speed: 100 }, abilities: ["全能变身"] },
    "拖拖蚓": { types: ["Steel"], baseStats: { hp: 70, attack: 85, defense: 145, spAttack: 60, spDefense: 55, speed: 65 }, abilities: [" Earth Eater", "沙隐"] },
    "晶光花": { types: ["Rock", "Poison"], baseStats: { hp: 85, attack: 55, defense: 90, spAttack: 125, spDefense: 80, speed: 95 }, abilities: ["毒满地", "腐蚀"] },
    "奇麒麟": { types: ["Normal", "Psychic"], baseStats: { hp: 120, attack: 90, defense: 70, spAttack: 110, spDefense: 70, speed: 60 }, abilities: ["反刍", "尾甲", "食草"] },
    "仆刀将军": { types: ["Dark", "Steel"], baseStats: { hp: 100, attack: 135, defense: 120, spAttack: 60, spDefense: 85, speed: 50 }, abilities: ["不服输", "大将", "压迫感"] },
    "厄诡椪": { types: ["Grass"], baseStats: { hp: 80, attack: 120, defense: 84, spAttack: 60, spDefense: 96, speed: 110 }, abilities: ["面影塑造"] },
    "铝钢桥龙": { types: ["Steel", "Dragon"], baseStats: { hp: 90, attack: 105, defense: 130, spAttack: 125, spDefense: 65, speed: 85 }, abilities: ["持久力", "结实", "重金属"] },
    "蜜集大蛇": { types: ["Grass", "Dragon"], baseStats: { hp: 106, attack: 80, defense: 110, spAttack: 120, spDefense: 80, speed: 44 }, abilities: ["熟成", "黏着", " harvest"] },
    // 超级进化形态（只补充类型，种族值已在默认生成中提升）
        // 超级进化形态（含种族值，基于官方数据或合理推算）
    "超级妙蛙花": { types: ["Grass", "Poison"], baseStats: { hp: 80, attack: 82, defense: 83, spAttack: 130, spDefense: 120, speed: 80 }, abilities: ["厚脂肪"] },
    "超级喷火龙 X": { types: ["Fire", "Dragon"], baseStats: { hp: 78, attack: 130, defense: 111, spAttack: 130, spDefense: 85, speed: 100 }, abilities: ["硬爪"] },
    "超级喷火龙 Y": { types: ["Fire", "Flying"], baseStats: { hp: 78, attack: 104, defense: 78, spAttack: 159, spDefense: 115, speed: 100 }, abilities: ["日照"] },
    "超级水箭龟": { types: ["Water"], baseStats: { hp: 79, attack: 103, defense: 120, spAttack: 135, spDefense: 115, speed: 78 }, abilities: ["超级发射器"] },
    "超级大针蜂": { types: ["Bug", "Poison"], baseStats: { hp: 65, attack: 150, defense: 40, spAttack: 15, spDefense: 80, speed: 145 }, abilities: ["适应力"] },
    "超级大比鸟": { types: ["Normal", "Flying"], baseStats: { hp: 83, attack: 80, defense: 80, spAttack: 135, spDefense: 80, speed: 121 }, abilities: ["无防守"] },
    "超级皮可西": { types: ["Fairy"], baseStats: { hp: 95, attack: 70, defense: 93, spAttack: 135, spDefense: 110, speed: 60 }, abilities: ["魔法防守"] }, // 推算
    "超级胡地": { types: ["Psychic"], baseStats: { hp: 55, attack: 50, defense: 65, spAttack: 175, spDefense: 105, speed: 150 }, abilities: ["复制"] },
    "超级大食花": { types: ["Grass", "Poison"], baseStats: { hp: 80, attack: 105, defense: 65, spAttack: 130, spDefense: 90, speed: 70 }, abilities: ["叶绿素"] }, // 推算
    "超级呆壳兽": { types: ["Water", "Psychic"], baseStats: { hp: 95, attack: 75, defense: 180, spAttack: 130, spDefense: 80, speed: 30 }, abilities: ["硬壳盔甲"] },
    "超级耿鬼": { types: ["Ghost", "Poison"], baseStats: { hp: 60, attack: 65, defense: 80, spAttack: 170, spDefense: 95, speed: 130 }, abilities: ["踩影"] },
    "超级袋兽": { types: ["Normal"], baseStats: { hp: 105, attack: 125, defense: 100, spAttack: 60, spDefense: 100, speed: 100 }, abilities: ["亲子爱"] },
    "超级宝石海星": { types: ["Water", "Psychic"], baseStats: { hp: 60, attack: 85, defense: 105, spAttack: 140, spDefense: 105, speed: 125 }, abilities: ["分析"] }, // 推算
    "超级凯罗斯": { types: ["Bug", "Flying"], baseStats: { hp: 65, attack: 155, defense: 120, spAttack: 65, spDefense: 90, speed: 105 }, abilities: ["飞行皮肤"] },
    "超级暴鲤龙": { types: ["Water", "Dark"], baseStats: { hp: 95, attack: 155, defense: 109, spAttack: 70, spDefense: 130, speed: 81 }, abilities: ["破格"] },
    "超级化石翼龙": { types: ["Rock", "Flying"], baseStats: { hp: 80, attack: 135, defense: 85, spAttack: 70, spDefense: 95, speed: 150 }, abilities: ["硬爪"] },
    "超级快龙": { types: ["Dragon", "Flying"], baseStats: { hp: 91, attack: 164, defense: 115, spAttack: 120, spDefense: 120, speed: 90 }, abilities: ["多重鳞片"] }, // 推测
    "超级大竺葵": { types: ["Grass"], baseStats: { hp: 80, attack: 102, defense: 120, spAttack: 103, spDefense: 120, speed: 80 }, abilities: ["叶子防守"] }, // 推测
    "超级大力鳄": { types: ["Water"], baseStats: { hp: 85, attack: 135, defense: 120, spAttack: 99, spDefense: 103, speed: 78 }, abilities: ["强行"] }, // 推测
    "超级电龙": { types: ["Electric", "Dragon"], baseStats: { hp: 90, attack: 95, defense: 105, spAttack: 165, spDefense: 110, speed: 45 }, abilities: ["破格"] },
    "超级大钢蛇": { types: ["Steel", "Ground"], baseStats: { hp: 75, attack: 125, defense: 230, spAttack: 55, spDefense: 95, speed: 30 }, abilities: ["沙之力"] },
    "超级巨钳螳螂": { types: ["Bug", "Steel"], baseStats: { hp: 70, attack: 150, defense: 140, spAttack: 65, spDefense: 100, speed: 75 }, abilities: ["技术高手"] },
    "超级赫拉克罗斯": { types: ["Bug", "Fighting"], baseStats: { hp: 80, attack: 185, defense: 115, spAttack: 40, spDefense: 105, speed: 75 }, abilities: ["连续攻击"] },
    "超级盔甲鸟": { types: ["Steel", "Flying"], baseStats: { hp: 65, attack: 80, defense: 180, spAttack: 40, spDefense: 90, speed: 70 }, abilities: ["结实"] }, // 推测
    "超级黑鲁加": { types: ["Dark", "Fire"], baseStats: { hp: 75, attack: 90, defense: 90, spAttack: 140, spDefense: 90, speed: 115 }, abilities: ["太阳之力"] },
    "超级班基拉斯": { types: ["Rock", "Dark"], baseStats: { hp: 100, attack: 164, defense: 150, spAttack: 95, spDefense: 120, speed: 71 }, abilities: ["扬沙"] },
    "超级大嘴鸥": { types: ["Water", "Flying"], baseStats: { hp: 60, attack: 50, defense: 120, spAttack: 125, spDefense: 90, speed: 65 }, abilities: ["降雨"] }, // 推测
    "超级沙奈朵": { types: ["Psychic", "Fairy"], baseStats: { hp: 68, attack: 85, defense: 65, spAttack: 165, spDefense: 135, speed: 100 }, abilities: ["妖精皮肤"] },
    "超级勾魂眼": { types: ["Dark", "Ghost"], baseStats: { hp: 50, attack: 85, defense: 125, spAttack: 85, spDefense: 115, speed: 20 }, abilities: ["魔法镜"] },
    "超级波士可多拉": { types: ["Steel"], baseStats: { hp: 70, attack: 140, defense: 230, spAttack: 60, spDefense: 80, speed: 50 }, abilities: ["过滤"] },
    "超级恰雷姆": { types: ["Fighting", "Psychic"], baseStats: { hp: 60, attack: 100, defense: 85, spAttack: 80, spDefense: 85, speed: 100 }, abilities: ["大力士"] },
    "超级雷电兽": { types: ["Electric"], baseStats: { hp: 70, attack: 75, defense: 80, spAttack: 135, spDefense: 80, speed: 135 }, abilities: ["威吓"] },
    "超级巨牙鲨": { types: ["Water", "Dark"], baseStats: { hp: 70, attack: 140, defense: 70, spAttack: 110, spDefense: 65, speed: 105 }, abilities: ["强壮之颚"] },
    "超级喷火驼": { types: ["Fire", "Ground"], baseStats: { hp: 70, attack: 120, defense: 100, spAttack: 145, spDefense: 105, speed: 20 }, abilities: ["强行"] },
    "超级七夕青鸟": { types: ["Dragon", "Fairy"], baseStats: { hp: 75, attack: 110, defense: 110, spAttack: 110, spDefense: 105, speed: 80 }, abilities: ["妖精皮肤"] },
    "超级诅咒娃娃": { types: ["Ghost"], baseStats: { hp: 64, attack: 165, defense: 75, spAttack: 83, spDefense: 83, speed: 75 }, abilities: ["恶作剧之心"] },
    "超级风铃铃": { types: ["Psychic","Steel"], baseStats: { hp: 75, attack: 50, defense: 110, spAttack: 135, spDefense: 120, speed: 65 }, abilities: ["漂浮"] }, // 
    "超级阿勃梭鲁": { types: ["Dark"], baseStats: { hp: 65, attack: 150, defense: 60, spAttack: 115, spDefense: 60, speed: 115 }, abilities: ["魔法镜"] },
    "超级冰鬼护": { types: ["Ice"], baseStats: { hp: 80, attack: 120, defense: 80, spAttack: 120, spDefense: 80, speed: 100 }, abilities: ["冰冻皮肤"] },
    "超级长耳兔": { types: ["Normal", "Fighting"], baseStats: { hp: 65, attack: 136, defense: 94, spAttack: 54, spDefense: 96, speed: 135 }, abilities: ["胆量"] },
    "超级烈咬陆鲨": { types: ["Dragon", "Ground"], baseStats: { hp: 108, attack: 170, defense: 115, spAttack: 120, spDefense: 95, speed: 92 }, abilities: ["沙之力"] },
    "超级路卡利欧": { types: ["Fighting", "Steel"], baseStats: { hp: 70, attack: 145, defense: 88, spAttack: 140, spDefense: 70, speed: 112 }, abilities: ["适应力"] },
    "超级暴雪王": { types: ["Grass", "Ice"], baseStats: { hp: 90, attack: 132, defense: 105, spAttack: 132, spDefense: 105, speed: 30 }, abilities: ["降雪"] },
    "超级艾路雷朵": { types: ["Psychic", "Fighting"], baseStats: { hp: 68, attack: 165, defense: 95, spAttack: 65, spDefense: 115, speed: 110 }, abilities: ["精神力"] },
    "超级雪妖女": { types: ["Ice", "Ghost"], baseStats: { hp: 70, attack: 80, defense: 70, spAttack: 140, spDefense: 100, speed: 120 }, abilities: ["降雪"] }, // 
    "超级炎武王": { types: ["Fire", "Fighting"], baseStats: { hp: 110, attack: 148, defense: 75, spAttack: 110, spDefense: 110, speed: 75 }, abilities: ["破格"] }, // 
    "超级龙头地鼠": { types: ["Ground", "Steel"], baseStats: { hp: 110, attack: 165, defense: 100, spAttack: 65, spDefense: 65, speed: 103 }, abilities: ["贯穿钻"] }, // 
    "超级差不多娃娃": { types: ["Normal", "Fairy"], baseStats: { hp: 103, attack: 60, defense: 126, spAttack: 80, spDefense: 126, speed: 50 }, abilities: ["治愈之心"] },
    "超级水晶灯火灵": { types: ["Ghost", "Fire"], baseStats: { hp: 60, attack: 75, defense: 110, spAttack: 175, spDefense: 110, speed: 90 }, abilities: ["穿透"] }, // 
    "超级泥偶巨人": { types: ["Ground", "Ghost"], baseStats: { hp: 89, attack: 159, defense: 105, spAttack: 70, spDefense: 105, speed: 55 }, abilities: ["无形拳"] }, // 
    "超级布里卡隆": { types: ["Grass", "Fighting"], baseStats: { hp: 88, attack: 137, defense: 172, spAttack: 74, spDefense: 115, speed: 44 }, abilities: ["防弹"] }, // 
    "超级妖火红狐": { types: ["Fire", "Psychic"], baseStats: { hp: 75, attack: 69, defense: 72, spAttack: 159, spDefense: 125, speed: 134 }, abilities: ["飘浮"] }, // 
    "超级甲贺忍蛙": { types: ["Water", "Dark"], baseStats: { hp: 72, attack: 125, defense: 77, spAttack: 133, spDefense: 81, speed: 142 }, abilities: ["变幻自如"] }, // 
    "超级花叶蒂": { types: ["Fairy"], baseStats: { hp: 74, attack: 85, defense: 87, spAttack: 155, spDefense: 148, speed: 102 }, abilities: ["妖精气场"] }, // 
    "超级妙喵": { types: ["Psychic"], baseStats: { hp: 62, attack: 58, defense: 64, spAttack: 93, spDefense: 80, speed: 88 }, abilities: ["锐利目光"] }, // 推测
    "超级摔角鹰人": { types: ["Fighting", "Flying"], baseStats: { hp: 78, attack: 132, defense: 85, spAttack: 84, spDefense: 83, speed: 128 }, abilities: ["柔软"] }, // 推测
    "超级好胜毛蟹": { types: ["Fighting", "Ice"], baseStats: { hp: 97, attack: 162, defense: 97, spAttack: 72, spDefense: 87, speed: 53 }, abilities: ["铁拳"] }, // 推测
    "超级老翁龙": { types: ["Normal", "Dragon"], baseStats: { hp: 78, attack: 70, defense: 105, spAttack: 165, spDefense: 111, speed: 46 }, abilities: ["怒火冲天"] }, // 推测
    "超级狠辣椒": { types: ["Grass", "Fire"], baseStats: { hp: 65, attack: 128, defense: 75, spAttack: 128, spDefense: 75, speed: 85 }, abilities: ["叶绿素"] }, // 推测
    "超级晶光花": { types: ["Rock", "Poison"], baseStats: { hp: 83, attack: 90, defense: 105, spAttack: 150, spDefense: 96, speed: 101 }, abilities: ["适应力"] }  // 
};

// ========== 从名单文本转换而来的所有宝可梦名称 ==========
const pokemonNamesFromList = [
    // 基础形态（含地区形态）
    '妙蛙花', '喷火龙', '水箭龟', '大针蜂', '大比鸟', '阿柏怪', '皮卡丘', '雷丘（关都）', '雷丘（阿罗拉）', '皮可西',
    '九尾（关都）', '九尾（阿罗拉）', '风速狗（关都）', '风速狗（洗翠）', '胡地', '怪力', '大食花', '呆壳兽（关都）', '呆壳兽（伽勒尔）', '耿鬼',
    '袋兽', '宝石海星', '凯罗斯', '肯泰罗（关都）', '肯泰罗（帕底亚-斗战种）', '肯泰罗（帕底亚-火炽种）', '肯泰罗（帕底亚-水澜种）', '暴鲤龙', '百变怪', '水伊布', '雷伊布', '火伊布',
    '化石翼龙', '卡比兽', '快龙', '大竺葵', '火暴兽（城都）', '火暴兽（洗翠）', '大力鳄', '阿利多斯', '电龙', '玛力露丽',
    '蚊香蛙皇', '太阳伊布', '月亮伊布', '呆呆王（关都）', '呆呆王（伽勒尔）', '佛烈托斯', '大钢蛇', '巨钳螳螂', '赫拉克罗斯', '盔甲鸟',
    '黑鲁加', '班基拉斯', '大嘴鸥', '沙奈朵', '勾魂眼', '波士可多拉', '恰雷姆', '雷电兽', '巨牙鲨', '喷火驼',
    '煤炭龟', '七夕青鸟', '美纳斯', '飘浮泡泡', '诅咒娃娃', '风铃铃', '阿勃梭鲁', '冰鬼护', '土台龟', '烈焰猴',
    '帝王拿波', '伦琴猫', '罗丝雷朵', '战槌龙', '护城龙', '长耳兔', '花岩怪', '烈咬陆鲨', '路卡利欧', '河马兽',
    '毒骷蛙', '暴雪王', '玛狃拉', '超甲狂犀', '叶伊布', '冰伊布', '天蝎王', '象牙猪', '艾路雷朵', '雪妖女',
    '洛托姆', '洛托姆（加热形态）', '洛托姆（清洗形态）', '洛托姆（结冰形态）', '洛托姆（旋转形态）', '洛托姆（切割形态）', '君主蛇', '炎武王', '大剑鬼（合众）', '大剑鬼（洗翠）', '步哨鼠', '酷豹', '花椰猿', '爆香猿', '冷水猿',
    '龙头地鼠', '差不多娃娃', '修建老匠', '风妖精', '流氓鳄', '死神棺', '灰尘山', '索罗亚克（合众）', '索罗亚克（洗翠）', '人造细胞卵',
    '双倍多多冰', '电飞鼠', '水晶灯火灵', '冻原熊', '泥巴鱼（合众）', '泥巴鱼（伽勒尔）', '泥偶巨人', '三首恶龙', '火神蛾', '布里卡隆',
    '妖火红狐', '甲贺忍蛙', '掘地兔', '烈箭鹰', '彩粉蝶', '花蓓蓓', '花洁夫人', '流氓熊猫', '多丽米亚', '妙喵',
    '坚盾剑怪', '芳香精', '胖甜妮', '钢炮臂虾', '光电伞蜥', '怪颚龙', '冰雪龙', '仙子伊布', '摔角鹰人', '咚咚鼠',
    '黏美龙（卡洛斯）', '黏美龙（洗翠）', '钥圈儿', '朽木妖', '南瓜怪人', '冰岩怪（卡洛斯）', '冰岩怪（洗翠）', '音波龙', '狙射树枭（阿罗拉）', '狙射树枭（洗翠）',
    '炽焰咆哮虎', '西狮海壬', '铳嘴大鸟', '好胜毛蟹', '鬃岩狼人', '超坏星', '重泥挽马', '滴蛛霸', '焰后蜥', '甜冷美后',
    '智挥猩', '投掷猴', '谜拟丘', '老翁龙', '杖尾鳞甲龙', '钢铠鸦', '苹裹龙', '丰蜜龙', '沙螺蟒', '怖思壶',
    '布莉姆温', '踏冰人偶', '死神板', '霜奶仙', '莫鲁贝可', '多龙巴鲁托', '诡角鹿', '劈斧螳螂', '幽尾玄鱼', '大狃拉',
    '魔幻假面喵', '骨纹巨声鳄', '狂欢浪舞鸭', '一家鼠', '盐石巨灵', '红莲铠骑', '苍炎刃鬼', '电肚蛙', '狠辣椒', '超能艳鸵',
    '巨锻匠', '海豚侠', '拖拖蚓', '晶光花', '奇麒麟', '仆刀将军', '厄诡椪', '铝钢桥龙', '蜜集大蛇',
    // 超级进化形态
    '超级妙蛙花', '超级喷火龙 X', '超级喷火龙 Y', '超级水箭龟', '超级大针蜂', '超级大比鸟', '超级皮可西', '超级胡地', '超级大食花', '超级呆壳兽',
    '超级耿鬼', '超级袋兽', '超级宝石海星', '超级凯罗斯', '超级暴鲤龙', '超级化石翼龙', '超级快龙', '超级大竺葵', '超级大力鳄', '超级电龙',
    '超级大钢蛇', '超级巨钳螳螂', '超级赫拉克罗斯', '超级盔甲鸟', '超级黑鲁加', '超级班基拉斯', '超级沙奈朵', '超级勾魂眼', '超级波士可多拉', '超级恰雷姆',
    '超级雷电兽', '超级巨牙鲨', '超级喷火驼', '超级七夕青鸟', '超级诅咒娃娃', '超级风铃铃', '超级阿勃梭鲁', '超级冰鬼护', '超级长耳兔', '超级烈咬陆鲨',
    '超级路卡利欧', '超级暴雪王', '超级艾路雷朵', '超级雪妖女', '超级炎武王', '超级龙头地鼠', '超级差不多娃娃', '超级水晶灯火灵', '超级泥偶巨人', '超级布里卡隆',
    '超级妖火红狐', '超级甲贺忍蛙', '超级花叶蒂', '超级妙喵', '超级摔角鹰人', '超级好胜毛蟹', '超级老翁龙', '超级狠辣椒', '超级晶光花'
];

// ========== 生成完整 pokedex ==========
const pokedex = [];
let nextId = 1;

// 辅助函数：标准化名称（去除地区后缀用于查找真实数据）
function normalizeName(name) {
    return name.replace(/（.*?）/, '').trim(); // 去掉括号内的地区标注
}

// 辅助函数：获取类型（优先真实数据，否则默认 Normal）
function getTypes(pokemonName) {
    // 先用完整名称（含地区后缀）查找
    if (realPokemonData[pokemonName]) {
        return realPokemonData[pokemonName].types;
    }
    // 再尝试标准化名称（去除地区后缀）
    const baseName = normalizeName(pokemonName);
    if (realPokemonData[baseName]) {
        return realPokemonData[baseName].types;
    }
    // 超级进化的类型通常继承基础形态
    if (pokemonName.startsWith('超级')) {
        const basicName = pokemonName.replace('超级', '');
        if (realPokemonData[basicName]) {
            return realPokemonData[basicName].types;
        }
        const normalizedBasic = normalizeName(basicName);
        if (realPokemonData[normalizedBasic]) {
            return realPokemonData[normalizedBasic].types;
        }
    }
    return ['Normal'];
}

// 辅助函数：获取基础种族值
function getBaseStats(pokemonName) {
    // 先用完整名称（含地区后缀）查找
    if (realPokemonData[pokemonName]) {
        return realPokemonData[pokemonName].baseStats;
    }
    // 再尝试标准化名称（去除地区后缀）
    const baseName = normalizeName(pokemonName);
    if (realPokemonData[baseName]) {
        return realPokemonData[baseName].baseStats;
    }
    // 超级进化：优先用完整名查真实数据，否则基于基础形态推算
    if (pokemonName.startsWith('超级')) {
        const basicName = pokemonName.replace('超级', '');
        if (realPokemonData[basicName]) {
            const basicStats = realPokemonData[basicName].baseStats;
            return {
                hp: basicStats.hp + 10,
                attack: basicStats.attack + 20,
                defense: basicStats.defense + 20,
                spAttack: basicStats.spAttack + 20,
                spDefense: basicStats.spDefense + 20,
                speed: basicStats.speed + 10
            };
        }
        const normalizedBasic = normalizeName(basicName);
        if (realPokemonData[normalizedBasic]) {
            const basicStats = realPokemonData[normalizedBasic].baseStats;
            return {
                hp: basicStats.hp + 10,
                attack: basicStats.attack + 20,
                defense: basicStats.defense + 20,
                spAttack: basicStats.spAttack + 20,
                spDefense: basicStats.spDefense + 20,
                speed: basicStats.speed + 10
            };
        }
    }
    return { ...DEFAULT_STATS };
}

// 辅助函数：获取特性
function getAbilities(pokemonName) {
    // 先用完整名称（含地区后缀）查找
    if (realPokemonData[pokemonName]) {
        return realPokemonData[pokemonName].abilities;
    }
    // 再尝试标准化名称（去除地区后缀）
    const baseName = normalizeName(pokemonName);
    if (realPokemonData[baseName]) {
        return realPokemonData[baseName].abilities;
    }
    return DEFAULT_ABILITIES;
}

// 辅助函数：可学招式（默认空，可以后续补充）
function getMoves(pokemonName) {
    return []; // 或返回 DEFAULT_MOVES
}

// 遍历所有名称，生成 pokedex 条目
for (const name of pokemonNamesFromList) {
    // 避免重复（如果名字完全相同）
    if (pokedex.some(p => p.name === name)) continue;
    
    pokedex.push({
        id: nextId++,
        name: name,
        types: getTypes(name),
        baseStats: getBaseStats(name),
        abilities: getAbilities(name),
        learnableMoves: getMoves(name),
        genderRatio: 'mixed', // 大部分可公母
    });
}

// 确保原有的12只详细数据覆盖生成的默认版本（如果名称已在列表中）
const originalDetailedPokemons = [
    { id: 1001, name: '苍响', types: ['Fairy', 'Steel'], baseStats: { hp: 92, attack: 130, defense: 115, spAttack: 80, spDefense: 115, speed: 138 }, abilities: ['不挠之剑'], learnableMoves: ['巨兽斩', '嬉闹', '圣剑', '守住'], genderRatio: 'genderless' },
    { id: 1002, name: '咆哮虎', types: ['Fire', 'Dark'], baseStats: { hp: 95, attack: 115, defense: 90, spAttack: 80, spDefense: 90, speed: 60 }, abilities: ['威吓', '猛火'], learnableMoves: ['击掌奇袭', '闪焰冲锋', '抛下狠话', '拍落'], genderRatio: 'male' },
    { id: 1003, name: '多龙巴鲁托', types: ['Dragon', 'Ghost'], baseStats: { hp: 88, attack: 120, defense: 75, spAttack: 100, spDefense: 75, speed: 142 }, abilities: ['恒净之躯', '穿透', '诅咒之躯'], learnableMoves: ['龙箭', '潜灵奇袭', '飞身重压', '守住'], genderRatio: 'female' },
    { id: 1004, name: '轰擂金刚猩', types: ['Grass'], baseStats: { hp: 100, attack: 125, defense: 90, spAttack: 60, spDefense: 70, speed: 85 }, abilities: ['青草制造者', '茂盛'], learnableMoves: ['滑梯', '拍落', '十万马力', '极速折返'], genderRatio: 'male' },
    { id: 1005, name: '武道熊师', types: ['Water', 'Fighting'], baseStats: { hp: 100, attack: 130, defense: 100, spAttack: 63, spDefense: 60, speed: 97 }, abilities: ['无形拳'], learnableMoves: ['水流连打', '近身战', '水流喷射', '看穿'], genderRatio: 'male' },
    { id: 1006, name: '雷电云', types: ['Electric', 'Flying'], baseStats: { hp: 79, attack: 115, defense: 70, spAttack: 125, spDefense: 80, speed: 111 }, abilities: ['不服输', '恶作剧之心'], learnableMoves: ['疯狂伏特', '飞翔', '蛮力', '守住'], genderRatio: 'male' },
    { id: 1007, name: '盖欧卡', types: ['Water'], baseStats: { hp: 100, attack: 100, defense: 90, spAttack: 150, spDefense: 140, speed: 90 }, abilities: ['始源之海'], learnableMoves: ['根源波动', '打雷', '冰冻束', '守住'], genderRatio: 'genderless' },
    { id: 1008, name: '黑马蕾冠王', types: ['Psychic', 'Ghost'], baseStats: { hp: 100, attack: 85, defense: 80, spAttack: 165, spDefense: 100, speed: 150 }, abilities: ['人马一体'], learnableMoves: ['星碎', '精神强念', '诡计', '守住'], genderRatio: 'genderless' },
    { id: 1009, name: '猛犸', types: ['Ice', 'Ground'], baseStats: { hp: 110, attack: 130, defense: 80, spAttack: 70, spDefense: 60, speed: 80 }, abilities: ['厚脂肪', '雪隐', '强行'], learnableMoves: ['地震', '冰旋', '冰砾', '守住'], genderRatio: 'female' },
    { id: 1010, name: '闪电鸟', types: ['Electric', 'Flying'], baseStats: { hp: 90, attack: 90, defense: 85, spAttack: 125, spDefense: 90, speed: 100 }, abilities: ['静电', '压迫感'], learnableMoves: ['十万伏特', '暴风', '羽栖', '顺风'], genderRatio: 'genderless' },
    { id: 1011, name: '长毛巨魔', types: ['Dark', 'Fairy'], baseStats: { hp: 95, attack: 120, defense: 65, spAttack: 95, spDefense: 75, speed: 60 }, abilities: ['恶作剧之心', '察觉', '顺手牵羊'], learnableMoves: ['灵魂冲击', '光墙', '反射壁', '电磁波'], genderRatio: 'male' },
    { id: 1012, name: '风妖精', types: ['Grass', 'Fairy'], baseStats: { hp: 60, attack: 67, defense: 85, spAttack: 77, spDefense: 75, speed: 116 }, abilities: ['恶作剧之心', '叶绿素', '穿透'], learnableMoves: ['能量球', '月亮之力', '顺风', '再来一次'], genderRatio: 'female' },
];

// 合并详细数据（如果名称已存在则覆盖）
for (const detailed of originalDetailedPokemons) {
    const existingIndex = pokedex.findIndex(p => p.name === detailed.name);
    if (existingIndex !== -1) {
        pokedex[existingIndex] = detailed;
    } else {
        pokedex.push(detailed);
    }
}

// 重新排序 ID
pokedex.forEach((p, idx) => { p.id = idx + 1; });

// 导出函数
function findPokemon(query) {
    // 先尝试按 ID 或名称在 pokedex 中查找
    const lowerQuery = query.toString().toLowerCase();
    let pokemon = null;

    // 1. 按 ID 查找
    if (!isNaN(query) || /^\d+$/.test(query)) {
        const id = parseInt(query);
        pokemon = pokedex.find(p => p.id === id);
    }
    // 2. 按名称精确查找（忽略括号内地区信息）
    if (!pokemon) {
        pokemon = pokedex.find(p => p.name.toLowerCase() === lowerQuery);
    }
    if (!pokemon) {
        // 尝试标准化名称后精确匹配（去除括号内容，避免地区形态混淆）
        const normalizedQuery = lowerQuery.replace(/[（(].*?[）)]/g, '').trim();
        pokemon = pokedex.find(p => normalizeName(p.name).toLowerCase() === normalizedQuery);
    }
    if (!pokemon) {
        // 最后兜底：模糊包含匹配
        const normalizedQuery = lowerQuery.replace(/[（(].*?[）)]/g, '').trim();
        pokemon = pokedex.find(p => p.name.toLowerCase().includes(normalizedQuery));
    }

    // 如果找不到，尝试从 realPokemonData 中临时构建一个
    if (!pokemon && realPokemonData[query]) {
        const data = realPokemonData[query];
        pokemon = {
            id: 0, // 临时 ID
            name: query,
            types: data.types || ['Normal'],
            baseStats: data.baseStats || { hp: 80, attack: 80, defense: 80, spAttack: 80, spDefense: 80, speed: 80 },
            abilities: data.abilities || ['未知特性'],
            learnableMoves: [],
            genderRatio: 'mixed'
        };
    }

    if (!pokemon) return null;

    // 确保 baseStats 存在（兜底）
    let baseStats = pokemon.baseStats;
    if (!baseStats) {
        baseStats = { hp: 80, attack: 80, defense: 80, spAttack: 80, spDefense: 80, speed: 80 };
    }

    const response = {
        id: pokemon.id,
        name: pokemon.name,
        types: pokemon.types,
        baseStats: baseStats,
        abilities: pokemon.abilities || ['未知特性'],
        learnableMoves: pokemon.learnableMoves || [],
        genderRatio: pokemon.genderRatio || 'mixed',
        spriteUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id || 0}.png`
    };
    return response;
}

// 浏览器/Node.js 双环境兼容
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { pokedex, findPokemon };
}