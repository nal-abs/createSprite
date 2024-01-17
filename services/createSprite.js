const config = require('../core/config.js');
const Spritesmith = require('spritesmith');
const fs = require('fs').promises;
const sharp = require('sharp');

const getImages = async () => {
	try {
		const folderPath = config.imageLocation;
		const files = await fs.readdir(folderPath);
		const filteredImages = files.filter((file) =>
			(/\.(jpg|jpeg|png|webp)$/i).test(file));

		return filteredImages.map((image) => `${ folderPath }/${ image }`);
	}
	catch (error) {
		throw new Error('Error reading folder:', error);
	}
};

const getWebp = async (image) => {
	const webpBuffer = await sharp(image)
		.toFormat('webp', { quality: 100 })
		.toBuffer();

	await fs.writeFile('sprite.webp', webpBuffer);
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

		getWebp(pngBuffer);
	}
	catch (error) {
		throw new Error('Error:', error);
	}
};

createSprite();
