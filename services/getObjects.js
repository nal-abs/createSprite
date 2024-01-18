/* eslint-disable no-console */
const { index } = require('@laufire/utils/crunch');
const { map } = require('@laufire/utils/collection');
const csvtojson = require('csvtojson');
const { csvData } = require('../core/config');

const transformArray = (inputArray) => {
	const result = inputArray.map((ele) => ({
		name: ele[0],
		[ele[1]]: ele[2],
	}));
	const final = result.reduce((acc, cur) =>
		({
			...acc, ...cur,
		}));

	return final;
};

csvtojson()
	.fromFile(csvData)
	.then((jsonArrayObj) => {
		const twoDArray = jsonArrayObj.map((obj) => Object.values(obj));
		const itemProperties = map(index(twoDArray, ['0']),
			(ele) => transformArray(ele));

		console.log(itemProperties);
	})
	.catch((error) => {
		console.error('Error converting CSV:', error.message);
	});
