const fs = require('fs');
const crypto = require('crypto');

async function decryptFile(path, password) {
  const encryptedData = fs.readFileSync(path);
  const iv = encryptedData.slice(0, 16);
  const data = encryptedData.slice(16);

  const passwordBuffer = Buffer.from(password);
  const hashedPassword = crypto.createHash('sha256').update(passwordBuffer).digest();
  
  const key = hashedPassword.slice(0, 32);
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  
  const decrypted = Buffer.concat([decipher.update(data), decipher.final()]);
  return decrypted;
}

decryptFile('./public/models/character.enc', 'Character3D#@').then(decrypted => {
  fs.writeFileSync('./public/models/character.glb', decrypted);
  console.log('Decrypted to ./public/models/character.glb');
}).catch(err => console.error(err));
