const fs = require('fs');
const buffer = fs.readFileSync('./public/models/character.glb');
const magic = buffer.readUInt32LE(0);
if (magic !== 0x46546c67) throw new Error('Not a GLB file');
const length = buffer.readUInt32LE(8);
const chunkLength = buffer.readUInt32LE(12);
const chunkType = buffer.readUInt32LE(16);
if (chunkType !== 0x4e4f534a) throw new Error('First chunk is not JSON');
const jsonBuffer = buffer.slice(20, 20 + chunkLength);
const jsonBlock = jsonBuffer.toString('utf8');
const json = JSON.parse(jsonBlock);

console.log("\n--- MATERIALS ---");
if (json.materials) {
  json.materials.forEach(m => console.log(m.name));
}

console.log("\n--- MESHES/NODES ---");
if (json.meshes) {
  json.meshes.forEach(m => console.log(m.name));
}
