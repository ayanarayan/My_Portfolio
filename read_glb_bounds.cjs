const fs = require('fs');
const buffer = fs.readFileSync('./public/models/character.glb');
const chunkLength = buffer.readUInt32LE(12);
const jsonBuffer = buffer.slice(20, 20 + chunkLength);
const json = JSON.parse(jsonBuffer.toString('utf8'));

console.log("\n--- BOUNDING BOXES FOR DEFAULT MATERIAL MESHES ---");
if (json.meshes) {
  json.meshes.forEach((m, meshIndex) => {
    let usesDefault = false;
    let accessorIndices = [];
    if (m.primitives) {
      m.primitives.forEach(p => {
        if (p.material !== undefined && json.materials[p.material].name === 'default') {
          usesDefault = true;
          accessorIndices.push(p.attributes.POSITION);
        }
      });
    }
    
    if (usesDefault) {
      accessorIndices.forEach(idx => {
        const accessor = json.accessors[idx];
        console.log(`Mesh: ${m.name} | minY: ${accessor.min[1].toFixed(3)} | maxY: ${accessor.max[1].toFixed(3)}`);
      });
    }
  });
}
