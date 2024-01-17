const Spritesmith = require('spritesmith');
const fs = require('fs').promises;
const sharp = require('sharp'); 

const createSprite = async() => {   
  try {     
    const folderPath = 'Images';     
    const files = await fs.readdir(folderPath); 
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));     
    const spriteImages = imageFiles.map((image) => `Images/${image}`);
    const result = await new Promise((resolve, reject) => {     
        Spritesmith.run({ src: spriteImages }, (err, result) => {     
            err ?  reject(err) : resolve(result)
           });     
          });     
                
    await fs.writeFile('sprite.png', result.image);  
    await fs.writeFile('sprite.json', JSON.stringify(result.coordinates));     
    const pngBuffer = await fs.readFile('sprite.png');    
    const webpBuffer = await sharp(pngBuffer)       
    .toFormat('webp', { quality: 100 })       
    .toBuffer();    
    await fs.writeFile('sprite.webp', webpBuffer);        
    } 
  catch (error) {  
        console.error('Error:', error); 
        } 
      }

createSprite()





