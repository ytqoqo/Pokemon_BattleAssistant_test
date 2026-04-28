// fetch_pokemon_types.js
const https = require('https');

// 您名单中的所有宝可梦（根据需要可截取部分测试）
const pokemonNames = [
    "钢铠鸦", "妙蛙花", "喷火龙", "水箭龟", "皮卡丘", "快龙", "班基拉斯", "烈咬陆鲨", "路卡利欧", "耿鬼",
    // 其他名称可自己添加，或者保留全部（但建议先测试一小部分，确认脚本正常工作后再跑全部）
];

// 中文名到英文名的映射（请根据控制台提示逐步补充）
const nameMap = {
    "钢铠鸦": "corviknight",
    "妙蛙花": "venusaur",
    "喷火龙": "charizard",
    "水箭龟": "blastoise",
    "皮卡丘": "pikachu",
    "快龙": "dragonite",
    "班基拉斯": "tyranitar",
    "烈咬陆鲨": "garchomp",
    "路卡利欧": "lucario",
    "耿鬼": "gengar",
    // 继续添加其他缺失的...
};

function getEnglishName(zh) {
    // 先去除括号内的地区信息（如“雷丘（阿罗拉）” -> “雷丘”）
    let clean = zh.replace(/[（(].*?[）)]/g, '').trim();
    if (nameMap[clean]) {
        return nameMap[clean];
    }
    // 如果映射表里没有，返回 null 表示无法获取
    return null;
}

async function fetchPokemonType(zhName) {
    const enName = getEnglishName(zhName);
    if (!enName) {
        console.warn(`⚠️ 跳过 ${zhName}：缺少英文名映射，请补充 nameMap`);
        return null;
    }
    const url = `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(enName.toLowerCase())}`;
    return new Promise((resolve) => {
        https.get(url, (res) => {
            if (res.statusCode !== 200) {
                console.warn(`❌ ${zhName} (${enName}) 返回 ${res.statusCode}`);
                resolve(null);
                return;
            }
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    const types = json.types.map(t => {
                        let typeName = t.type.name;
                        // 首字母大写，适配前端的 TYPES 对象
                        return typeName.charAt(0).toUpperCase() + typeName.slice(1);
                    });
                    resolve(types);
                } catch (e) {
                    console.error(`解析 ${zhName} 失败:`, e.message);
                    resolve(null);
                }
            });
        }).on('error', (err) => {
            console.error(`请求 ${zhName} 出错:`, err.message);
            resolve(null);
        });
    });
}

async function main() {
    const result = {};
    for (const name of pokemonNames) {
        const types = await fetchPokemonType(name);
        if (types) {
            result[name] = types;
            console.log(`✅ ${name}: ${types.join(', ')}`);
        } else {
            // 失败则暂时不加入 result（或者你可以置为 ['Normal']）
            console.log(`❌ ${name} 获取失败，将使用默认类型 Normal`);
            result[name] = ['Normal'];
        }
        // 避免请求太快被限流
        await new Promise(r => setTimeout(r, 300));
    }
    console.log("\n\n// 复制以下内容到 realPokemonData：");
    console.log(JSON.stringify(result, null, 4));
}

main();