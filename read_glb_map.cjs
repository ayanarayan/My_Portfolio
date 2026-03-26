const fs = require('fs');
const buffer = fs.readFileSync('./public/models/character.glb');
const chunkLength = buffer.readUInt32LE(12);
const jsonBuffer = buffer.slice(20, 20 + chunkLength);
const json = JSON.parse(jsonBuffer.toString('utf8'));

console.log("\n--- MESH -> MATERIAL ---");
if (json.meshes) {
  json.meshes.forEach(m => {
    let mats = new Set();
    if (m.primitives) {
      m.primitives.forEach(p => {
        if (p.material !== undefined) {
          mats.add(json.materials[p.material].name);
        }
      });
    }
    console.log(m.name, "uses materials:", Array.from(mats).join(', '));
  });
}
