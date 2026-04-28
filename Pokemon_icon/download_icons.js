const fs = require('fs');
const path = require('path');
const axios = require('axios');

const BASE_DIR = path.join(__dirname, 'Pokemon_icon');
const MEGA_DIR = path.join(BASE_DIR, 'Pokemon_Mega');

// ======== Chinese → English mapping for all Pokemon ========
const nameMap = {
    // Kanto base
    '妙蛙花': { en: 'Venusaur', id: 3 },
    '喷火龙': { en: 'Charizard', id: 6 },
    '水箭龟': { en: 'Blastoise', id: 9 },
    '大针蜂': { en: 'Beedrill', id: 15 },
    '大比鸟': { en: 'Pidgeot', id: 18 },
    '阿柏怪': { en: 'Arbok', id: 24 },
    '皮卡丘': { en: 'Pikachu', id: 25 },
    '雷丘（关都）': { en: 'Raichu', id: 26 },
    '雷丘（阿罗拉）': { en: 'Raichu', id: 10100, region: 'Alola' },
    '皮可西': { en: 'Clefable', id: 36 },
    '九尾（关都）': { en: 'Ninetales', id: 38 },
    '九尾（阿罗拉）': { en: 'Ninetales', id: 38, region: 'Alola' },
    '风速狗（关都）': { en: 'Arcanine', id: 59 },
    '风速狗（洗翠）': { en: 'Arcanine', id: 59, region: 'Hisui' },
    '胡地': { en: 'Alakazam', id: 65 },
    '怪力': { en: 'Machamp', id: 68 },
    '大食花': { en: 'Victreebel', id: 71 },
    '呆壳兽（关都）': { en: 'Slowbro', id: 80 },
    '呆壳兽（伽勒尔）': { en: 'Slowbro', id: 80, region: 'Galar' },
    '耿鬼': { en: 'Gengar', id: 94 },
    '袋兽': { en: 'Kangaskhan', id: 115 },
    '宝石海星': { en: 'Starmie', id: 121 },
    '凯罗斯': { en: 'Pinsir', id: 127 },
    '肯泰罗（关都）': { en: 'Tauros', id: 128 },
    '肯泰罗（帕底亚-斗战种）': { en: 'Tauros', id: 128, region: 'Paldea-Combat' },
    '肯泰罗（帕底亚-火炽种）': { en: 'Tauros', id: 128, region: 'Paldea-Blaze' },
    '肯泰罗（帕底亚-水澜种）': { en: 'Tauros', id: 128, region: 'Paldea-Aqua' },
    '暴鲤龙': { en: 'Gyarados', id: 130 },
    '百变怪': { en: 'Ditto', id: 132 },
    '水伊布': { en: 'Vaporeon', id: 134 },
    '雷伊布': { en: 'Jolteon', id: 135 },
    '火伊布': { en: 'Flareon', id: 136 },
    '化石翼龙': { en: 'Aerodactyl', id: 142 },
    '卡比兽': { en: 'Snorlax', id: 143 },
    '快龙': { en: 'Dragonite', id: 149 },
    // Johto
    '大竺葵': { en: 'Meganium', id: 154 },
    '火暴兽（城都）': { en: 'Typhlosion', id: 157 },
    '火暴兽（洗翠）': { en: 'Typhlosion', id: 157, region: 'Hisui' },
    '大力鳄': { en: 'Feraligatr', id: 160 },
    '阿利多斯': { en: 'Ariados', id: 168 },
    '电龙': { en: 'Ampharos', id: 181 },
    '玛力露丽': { en: 'Azumarill', id: 184 },
    '蚊香蛙皇': { en: 'Politoed', id: 186 },
    '太阳伊布': { en: 'Espeon', id: 196 },
    '月亮伊布': { en: 'Umbreon', id: 197 },
    '呆呆王（关都）': { en: 'Slowking', id: 199 },
    '呆呆王（伽勒尔）': { en: 'Slowking', id: 199, region: 'Galar' },
    '佛烈托斯': { en: 'Forretress', id: 205 },
    '大钢蛇': { en: 'Steelix', id: 208 },
    '巨钳螳螂': { en: 'Scizor', id: 212 },
    '赫拉克罗斯': { en: 'Heracross', id: 214 },
    '盔甲鸟': { en: 'Skarmory', id: 227 },
    '黑鲁加': { en: 'Houndoom', id: 229 },
    '班基拉斯': { en: 'Tyranitar', id: 248 },
    // Hoenn
    '大嘴鸥': { en: 'Pelipper', id: 279 },
    '沙奈朵': { en: 'Gardevoir', id: 282 },
    '勾魂眼': { en: 'Sableye', id: 302 },
    '波士可多拉': { en: 'Aggron', id: 306 },
    '恰雷姆': { en: 'Medicham', id: 308 },
    '雷电兽': { en: 'Manectric', id: 310 },
    '巨牙鲨': { en: 'Sharpedo', id: 319 },
    '喷火驼': { en: 'Camerupt', id: 323 },
    '煤炭龟': { en: 'Torkoal', id: 324 },
    '七夕青鸟': { en: 'Altaria', id: 334 },
    '美纳斯': { en: 'Milotic', id: 350 },
    '飘浮泡泡': { en: 'Castform', id: 351 },
    '诅咒娃娃': { en: 'Banette', id: 353 },
    '风铃铃': { en: 'Chimecho', id: 358 },
    '阿勃梭鲁': { en: 'Absol', id: 359 },
    '冰鬼护': { en: 'Glalie', id: 362 },
    // Sinnoh
    '土台龟': { en: 'Torterra', id: 389 },
    '烈焰猴': { en: 'Infernape', id: 392 },
    '帝王拿波': { en: 'Empoleon', id: 395 },
    '伦琴猫': { en: 'Luxray', id: 405 },
    '罗丝雷朵': { en: 'Roserade', id: 407 },
    '战槌龙': { en: 'Rampardos', id: 409 },
    '护城龙': { en: 'Bastiodon', id: 411 },
    '长耳兔': { en: 'Lopunny', id: 428 },
    '花岩怪': { en: 'Spiritomb', id: 442 },
    '烈咬陆鲨': { en: 'Garchomp', id: 445 },
    '路卡利欧': { en: 'Lucario', id: 448 },
    '河马兽': { en: 'Hippowdon', id: 450 },
    '毒骷蛙': { en: 'Toxicroak', id: 454 },
    '暴雪王': { en: 'Abomasnow', id: 460 },
    '玛狃拉': { en: 'Weavile', id: 461 },
    '超甲狂犀': { en: 'Rhyperior', id: 464 },
    '叶伊布': { en: 'Leafeon', id: 470 },
    '冰伊布': { en: 'Glaceon', id: 471 },
    '天蝎王': { en: 'Gliscor', id: 472 },
    '象牙猪': { en: 'Mamoswine', id: 473 },
    '艾路雷朵': { en: 'Gallade', id: 475 },
    '雪妖女': { en: 'Froslass', id: 478 },
    '洛托姆': { en: 'Rotom', id: 479 },
    // Unova
    '君主蛇': { en: 'Serperior', id: 497 },
    '炎武王': { en: 'Emboar', id: 500 },
    '大剑鬼（合众）': { en: 'Samurott', id: 503 },
    '大剑鬼（洗翠）': { en: 'Samurott', id: 503, region: 'Hisui' },
    '步哨鼠': { en: 'Watchog', id: 505 },
    '酷豹': { en: 'Liepard', id: 510 },
    '花椰猿': { en: 'Simisage', id: 512 },
    '爆香猿': { en: 'Simisear', id: 514 },
    '冷水猿': { en: 'Simipour', id: 516 },
    '龙头地鼠': { en: 'Excadrill', id: 530 },
    '差不多娃娃': { en: 'Audino', id: 531 },
    '修建老匠': { en: 'Conkeldurr', id: 534 },
    '风妖精': { en: 'Whimsicott', id: 547 },
    '流氓鳄': { en: 'Krookodile', id: 553 },
    '死神棺': { en: 'Cofagrigus', id: 563 },
    '灰尘山': { en: 'Garbodor', id: 569 },
    '索罗亚克（合众）': { en: 'Zoroark', id: 571 },
    '索罗亚克（洗翠）': { en: 'Zoroark', id: 571, region: 'Hisui' },
    '人造细胞卵': { en: 'Reuniclus', id: 579 },
    '双倍多多冰': { en: 'Vanilluxe', id: 584 },
    '电飞鼠': { en: 'Emolga', id: 587 },
    '水晶灯火灵': { en: 'Chandelure', id: 609 },
    '冻原熊': { en: 'Beartic', id: 614 },
    '泥巴鱼（合众）': { en: 'Stunfisk', id: 618 },
    '泥巴鱼（伽勒尔）': { en: 'Stunfisk', id: 618, region: 'Galar' },
    '泥偶巨人': { en: 'Golurk', id: 623 },
    '三首恶龙': { en: 'Hydreigon', id: 635 },
    '火神蛾': { en: 'Volcarona', id: 637 },
    // Kalos
    '布里卡隆': { en: 'Chesnaught', id: 652 },
    '妖火红狐': { en: 'Delphox', id: 655 },
    '甲贺忍蛙': { en: 'Greninja', id: 658 },
    '掘地兔': { en: 'Diggersby', id: 660 },
    '烈箭鹰': { en: 'Talonflame', id: 663 },
    '彩粉蝶': { en: 'Vivillon', id: 666 },
    '花蓓蓓': { en: 'Floette', id: 669 },
    '花洁夫人': { en: 'Florges', id: 671 },
    '流氓熊猫': { en: 'Pangoro', id: 675 },
    '多丽米亚': { en: 'Furfrou', id: 676 },
    '妙喵': { en: 'Meowstic', id: 677 },
    '坚盾剑怪': { en: 'Aegislash', id: 681 },
    '芳香精': { en: 'Aromatisse', id: 683 },
    '胖甜妮': { en: 'Slurpuff', id: 685 },
    '钢炮臂虾': { en: 'Clawitzer', id: 693 },
    '光电伞蜥': { en: 'Heliolisk', id: 695 },
    '怪颚龙': { en: 'Tyrantrum', id: 697 },
    '冰雪龙': { en: 'Aurorus', id: 698 },
    '仙子伊布': { en: 'Sylveon', id: 700 },
    '摔角鹰人': { en: 'Hawlucha', id: 701 },
    '咚咚鼠': { en: 'Dedenne', id: 702 },
    '黏美龙（卡洛斯）': { en: 'Goodra', id: 706 },
    '黏美龙（洗翠）': { en: 'Goodra', id: 10242, region: 'Hisui' },
    '钥圈儿': { en: 'Klefki', id: 707 },
    '朽木妖': { en: 'Trevenant', id: 709 },
    '南瓜怪人': { en: 'Gourgeist', id: 711 },
    '冰岩怪（卡洛斯）': { en: 'Avalugg', id: 713 },
    '冰岩怪（洗翠）': { en: 'Avalugg', id: 10243, region: 'Hisui' },
    '音波龙': { en: 'Noivern', id: 715 },
    // Alola
    '狙射树枭（阿罗拉）': { en: 'Decidueye', id: 724 },
    '狙射树枭（洗翠）': { en: 'Decidueye', id: 10244, region: 'Hisui' },
    '炽焰咆哮虎': { en: 'Incineroar', id: 727 },
    '西狮海壬': { en: 'Primarina', id: 730 },
    '铳嘴大鸟': { en: 'Toucannon', id: 733 },
    '好胜毛蟹': { en: 'Crabominable', id: 740 },
    '鬃岩狼人': { en: 'Lycanroc', id: 745 },
    '超坏星': { en: 'Toxapex', id: 748 },
    '重泥挽马': { en: 'Mudsdale', id: 750 },
    '滴蛛霸': { en: 'Araquanid', id: 752 },
    '焰后蜥': { en: 'Salazzle', id: 758 },
    '甜冷美后': { en: 'Tsareena', id: 763 },
    '智挥猩': { en: 'Oranguru', id: 765 },
    '投掷猴': { en: 'Passimian', id: 766 },
    '谜拟丘': { en: 'Mimikyu', id: 778 },
    '老翁龙': { en: 'Drampa', id: 780 },
    '杖尾鳞甲龙': { en: 'Kommo-o', id: 784 },
    // Galar
    '钢铠鸦': { en: 'Corviknight', id: 823 },
    '苹裹龙': { en: 'Flapple', id: 841 },
    '丰蜜龙': { en: 'Appletun', id: 842 },
    '沙螺蟒': { en: 'Sandaconda', id: 844 },
    '怖思壶': { en: 'Polteageist', id: 855 },
    '布莉姆温': { en: 'Hatterene', id: 858 },
    '踏冰人偶': { en: 'Mr. Rime', id: 866 },
    '死神板': { en: 'Runerigus', id: 867 },
    '霜奶仙': { en: 'Alcremie', id: 869 },
    '莫鲁贝可': { en: 'Morpeko', id: 877 },
    '多龙巴鲁托': { en: 'Dragapult', id: 887 },
    // Hisui / Paldea
    '诡角鹿': { en: 'Wyrdeer', id: 899 },
    '劈斧螳螂': { en: 'Kleavor', id: 900 },
    '幽尾玄鱼': { en: 'Basculegion', id: 902 },
    '大狃拉': { en: 'Sneasler', id: 903 },
    '魔幻假面喵': { en: 'Meowscarada', id: 908 },
    '骨纹巨声鳄': { en: 'Skeledirge', id: 911 },
    '狂欢浪舞鸭': { en: 'Quaquaval', id: 914 },
    '一家鼠': { en: 'Maushold', id: 925 },
    '盐石巨灵': { en: 'Garganacl', id: 933 },
    '红莲铠骑': { en: 'Armarouge', id: 936 },
    '苍炎刃鬼': { en: 'Ceruledge', id: 937 },
    '电肚蛙': { en: 'Bellibolt', id: 939 },
    '狠辣椒': { en: 'Scovillain', id: 952 },
    '超能艳鸵': { en: 'Espathra', id: 956 },
    '巨锻匠': { en: 'Tinkaton', id: 958 },
    '海豚侠': { en: 'Palafin', id: 964 },
    '拖拖蚓': { en: 'Orthworm', id: 968 },
    '晶光花': { en: 'Glimmora', id: 969 },
    '奇麒麟': { en: 'Farigiraf', id: 981 },
    '仆刀将军': { en: 'Kingambit', id: 983 },
    '厄诡椪': { en: 'Ogerpon', id: 1017 },
    '铝钢桥龙': { en: 'Archaludon', id: 1018 },
    '蜜集大蛇': { en: 'Hydrapple', id: 1019 },

    // ======== MEGA EVOLUTIONS ========
    '超级妙蛙花': { en: 'Mega Venusaur', id: 10033 },
    '超级喷火龙 X': { en: 'Mega Charizard X', id: 10034 },
    '超级喷火龙 Y': { en: 'Mega Charizard Y', id: 10035 },
    '超级水箭龟': { en: 'Mega Blastoise', id: 10036 },
    '超级大针蜂': { en: 'Mega Beedrill', id: 15, mega: true },
    '超级大比鸟': { en: 'Mega Pidgeot', id: 10073 },
    '超级皮可西': { en: 'Mega Clefable', id: 10278 },
    '超级胡地': { en: 'Mega Alakazam', id: 10037 },
    '超级大食花': { en: 'Mega Victreebel', id: 10279 },
    '超级呆壳兽': { en: 'Mega Slowbro', id: 10071 },
    '超级耿鬼': { en: 'Mega Gengar', id: 10038 },
    '超级袋兽': { en: 'Mega Kangaskhan', id: 10039 },
    '超级宝石海星': { en: 'Mega Starmie', id: 10280 },
    '超级凯罗斯': { en: 'Mega Pinsir', id: 10040 },
    '超级暴鲤龙': { en: 'Mega Gyarados', id: 10041 },
    '超级化石翼龙': { en: 'Mega Aerodactyl', id: 10042 },
    '超级快龙': { en: 'Mega Dragonite', id: 10281 },
    '超级大竺葵': { en: 'Mega Meganium', id: 10282 },
    '超级大力鳄': { en: 'Mega Feraligatr', id: 10283 },
    '超级电龙': { en: 'Mega Ampharos', id: 10045 },
    '超级大钢蛇': { en: 'Mega Steelix', id: 10072 },
    '超级巨钳螳螂': { en: 'Mega Scizor', id: 10046 },
    '超级赫拉克罗斯': { en: 'Mega Heracross', id: 10047 },
    '超级盔甲鸟': { en: 'Mega Skarmory', id: 10284 },
    '超级黑鲁加': { en: 'Mega Houndoom', id: 10048 },
    '超级班基拉斯': { en: 'Mega Tyranitar', id: 10049 },
    '超级沙奈朵': { en: 'Mega Gardevoir', id: 10051 },
    '超级勾魂眼': { en: 'Mega Sableye', id: 10066 },
    '超级波士可多拉': { en: 'Mega Aggron', id: 10053 },
    '超级恰雷姆': { en: 'Mega Medicham', id: 10054 },
    '超级雷电兽': { en: 'Mega Manectric', id: 10055 },
    '超级巨牙鲨': { en: 'Mega Sharpedo', id: 10070 },
    '超级喷火驼': { en: 'Mega Camerupt', id: 10087 },
    '超级七夕青鸟': { en: 'Mega Altaria', id: 10067 },
    '超级诅咒娃娃': { en: 'Mega Banette', id: 10056 },
    '超级风铃铃': { en: 'Mega Chimecho', id: 10306 },
    '超级阿勃梭鲁': { en: 'Mega Absol', id: 10057 },
    '超级冰鬼护': { en: 'Mega Glalie', id: 10074 },
    '超级长耳兔': { en: 'Mega Lopunny', id: 10088 },
    '超级烈咬陆鲨': { en: 'Mega Garchomp', id: 10058 },
    '超级路卡利欧': { en: 'Mega Lucario', id: 10059 },
    '超级暴雪王': { en: 'Mega Abomasnow', id: 10060 },
    '超级艾路雷朵': { en: 'Mega Gallade', id: 10068 },
    '超级雪妖女': { en: 'Mega Froslass', id: 10285 },
    '超级炎武王': { en: 'Mega Emboar', id: 10286 },
    '超级龙头地鼠': { en: 'Mega Excadrill', id: 10287 },
    '超级差不多娃娃': { en: 'Mega Audino', id: 10069 },
    '超级水晶灯火灵': { en: 'Mega Chandelure', id: 10291 },
    '超级泥偶巨人': { en: 'Mega Golurk', id: 10313 },
    '超级布里卡隆': { en: 'Mega Chesnaught', id: 10292 },
    '超级妖火红狐': { en: 'Mega Delphox', id: 10293 },
    '超级甲贺忍蛙': { en: 'Mega Greninja', id: 10294 },
    '超级花蓓蓓': { en: 'Mega Floette', id: 10296 },
    '超级妙喵': { en: 'Mega Meowstic', id: 10314 },
    '超级摔角鹰人': { en: 'Mega Hawlucha', id: 10300 },
    '超级好胜毛蟹': { en: 'Mega Crabominable', id: 10315 },
    '超级老翁龙': { en: 'Mega Drampa', id: 10302 },
    '超级狠辣椒': { en: 'Mega Scovillain', id: 10320 },
    '超级晶光花': { en: 'Mega Glimmora', id: 10321 },
};

function extractIdFromUrl(url) {
    const match = url.match(/\/(\d+)\.png/);
    return match ? parseInt(match[1]) : null;
}

function isMega(name) {
    return name.startsWith('超级');
}

function hasRegion(name) {
    return name.includes('（') && name.includes('）');
}

function buildFilename(chineseName) {
    const info = nameMap[chineseName];
    if (!info) {
        console.warn(`  [WARN] No mapping for: ${chineseName}`);
        const safeName = chineseName.replace(/[/\\?%*:|"<>]/g, '_');
        return safeName + '.png';
    }

    // Filename: EnglishName_ID[_Region].png
    let filename = `${info.en}_${info.id}`;
    if (info.region) {
        filename += `_${info.region}`;
    }
    filename += '.png';
    return filename;
}

async function downloadImage(url, filepath) {
    const response = await axios.get(url, {
        responseType: 'stream',
        timeout: 30000,
        headers: { 'User-Agent': 'PokemonIconDownloader/1.0' }
    });
    const writer = fs.createWriteStream(filepath);
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
        response.data.on('error', reject);
    });
}

async function main() {
    // Parse the pokemonImageMap from the HTML file
    const htmlPath = path.join(__dirname, 'pokemon_battle_assistant.html');
    const html = fs.readFileSync(htmlPath, 'utf-8');

    // Extract the pokemonImageMap object using regex
    const mapMatch = html.match(/const pokemonImageMap = \{([\s\S]*?)\n\};/);
    if (!mapMatch) {
        console.error('Could not find pokemonImageMap in HTML file');
        process.exit(1);
    }

    // Parse each line
    const lines = mapMatch[1].split('\n');
    const entries = [];
    for (const line of lines) {
        const kvMatch = line.match(/'([^']+)'\s*:\s*'([^']+)'/);
        if (!kvMatch) continue;
        const name = kvMatch[1];
        const url = kvMatch[2];
        if (name.startsWith('//') || name === '==========') continue;
        entries.push({ name, url });
    }

    console.log(`Found ${entries.length} entries in pokemonImageMap\n`);

    // Separate mega and non-mega
    const mega = entries.filter(e => isMega(e.name));
    const normal = entries.filter(e => !isMega(e.name));

    console.log(`Base + Regional: ${normal.length}`);
    console.log(`Mega Evolutions: ${mega.length}`);
    console.log('');

    // Create directories
    if (!fs.existsSync(BASE_DIR)) fs.mkdirSync(BASE_DIR, { recursive: true });
    if (!fs.existsSync(MEGA_DIR)) fs.mkdirSync(MEGA_DIR, { recursive: true });

    // Download non-mega images
    console.log('=== Downloading Base + Regional Forms ===');
    let success = 0, failed = 0;
    const failures = [];

    for (let i = 0; i < normal.length; i++) {
        const { name, url } = normal[i];
        const filename = buildFilename(name);
        const filepath = path.join(BASE_DIR, filename);

        if (fs.existsSync(filepath)) {
            console.log(`  [${i + 1}/${normal.length}] SKIP ${name} → ${filename} (exists)`);
            success++;
            continue;
        }

        try {
            await downloadImage(url, filepath);
            console.log(`  [${i + 1}/${normal.length}] OK   ${name} → ${filename}`);
            success++;
        } catch (err) {
            console.log(`  [${i + 1}/${normal.length}] FAIL ${name} → ${filename}  (${err.message})`);
            failed++;
            failures.push({ name, url, filename, error: err.message });
        }
    }

    // Download mega images
    console.log('\n=== Downloading Mega Evolutions ===');
    let megaSuccess = 0, megaFailed = 0;

    for (let i = 0; i < mega.length; i++) {
        const { name, url } = mega[i];
        const filename = buildFilename(name);
        const filepath = path.join(MEGA_DIR, filename);

        if (fs.existsSync(filepath)) {
            console.log(`  [${i + 1}/${mega.length}] SKIP ${name} → ${filename} (exists)`);
            megaSuccess++;
            continue;
        }

        try {
            await downloadImage(url, filepath);
            console.log(`  [${i + 1}/${mega.length}] OK   ${name} → ${filename}`);
            megaSuccess++;
        } catch (err) {
            console.log(`  [${i + 1}/${mega.length}] FAIL ${name} → ${filename}  (${err.message})`);
            megaFailed++;
            failures.push({ name, url, filename, error: err.message });
        }
    }

    // Summary
    console.log('\n=== Summary ===');
    console.log(`Base + Regional: ${success} OK, ${failed} FAILED`);
    console.log(`Mega Evolutions: ${megaSuccess} OK, ${megaFailed} FAILED`);
    console.log(`Total: ${success + megaSuccess} OK, ${failed + megaFailed} FAILED`);

    if (failures.length > 0) {
        console.log('\n=== Failures ===');
        for (const f of failures) {
            console.log(`  ${f.name} (${f.url})\n    → ${f.filename}\n    Error: ${f.error}`);
        }
    }
}

main().catch(err => {
    console.error('Fatal error:', err.message);
    process.exit(1);
});
