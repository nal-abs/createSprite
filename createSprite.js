var Spritesmith = require('spritesmith');
const fs = require('fs');
const sharp = require('sharp');

const folderPath = 'Images';

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Error reading folder:', err);
    return;
  }
var spriteImages = files.map((image) => `Images/${image}`)

Spritesmith.run({ src: spriteImages }, (err, result) => {
  if (err) throw err;
  fs.writeFileSync('sprite.png', result.image);

  fs.writeFileSync('sprite.json', JSON.stringify(result.coordinates));
  const pngBuffer = fs.readFileSync('sprite.png');

  sharp(pngBuffer)
  .toFormat('webp', { quality: 100 })
  .toBuffer()
  .then((webpBuffer) => {
    fs.writeFileSync('sprite.webp', webpBuffer);
  })
  .catch((error) => {
    console.error('Error converting PNG to WebP:', error);
  });
});
})

