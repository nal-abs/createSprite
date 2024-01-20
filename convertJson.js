/* eslint-disable no-console */
const { values, map } = require('@laufire/utils/collection');
const jsonData = require('./sprite.json');

const getName = (key) => {
	const regex = /^.+\/(.+)\..+$/;

	const match = key.match(regex);

	return match[1];
};

const imageDetails = values(map(jsonData, (value, key) => ({
	name: getName(key),
	...value,
})));

console.log(imageDetails);
