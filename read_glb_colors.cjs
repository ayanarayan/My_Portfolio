const fs = require('fs');
const buffer = fs.readFileSync('./public/models/character.glb');
const chunkLength = buffer.readUInt32LE(12);
const jsonBuffer = buffer.slice(20, 20 + chunkLength);
const json = JSON.parse(jsonBuffer.toString('utf8'));

console.log("\n--- MATERIALS ---");
if (json.materials) {
  json.materials.forEach(m => {
    let color = '';
    if (m.pbrMetallicRoughness && m.pbrMetallicRoughness.baseColorFactor) {
      color = m.pbrMetallicRoughness.baseColorFactor;
    }
    console.log(m.name, color);
  });
}
