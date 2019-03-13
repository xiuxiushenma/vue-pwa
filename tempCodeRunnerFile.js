let fs = require('fs');

let json = [];

for(let i = 0 ;i < 80;i++){
    json.push(`https://www.fullstackjavascript.cn/conan/${i}.jpeg`);
}
fs.writeFileSync('data.json',JSON.stringify(json));
