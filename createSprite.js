const Spritesmith = require('spritesmith');
const fs = require('fs').promises;
const sharp = require('sharp');

const getImages = async () => {
	try {
		const folderPath = 'Images';
		const files = await fs.readdir(folderPath);
		const filteredImage = files.filter((file) => (/\.(jpg|jpeg|png|gif)$/i).test(file));
		const images = filteredImage.map((image) => `Images/${ image }`);

		return images;
	}
	catch (error) {
		throw new Error('Error reading folder:', error);
	}
};

const createSprite = async () => {
	try {
		const images = await getImages();

		const detail = await new Promise((resolve, reject) => {
			Spritesmith.run({ src: images }, (err, result) => {
				err ? reject(err) : resolve(result);
			});
		});

		await fs.writeFile('sprite.png', detail.image);
		await fs.writeFile('sprite.json', JSON.stringify(detail.coordinates));

		const pngBuffer = await fs.readFile('sprite.png');
		const webpBuffer = await sharp(pngBuffer)
			.toFormat('webp', { quality: 100 })
			.toBuffer();

		await fs.writeFile('sprite.webp', webpBuffer);
	}
	catch (error) {
		throw new Error('Error:', error);
	}
};

createSprite();
