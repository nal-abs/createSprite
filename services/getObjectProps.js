const { index } = require('@laufire/utils/crunch');
const { map, values } = require('@laufire/utils/collection');
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

const getObjectProps = async () => {
	const data = await csvtojson().fromFile(csvData);
	const twoDArray = data.map((ele) => Object.values(ele));
	const itemProperties = values(map(index(twoDArray, ['0']),
		(ele) => transformArray(ele)));

	return itemProperties;
};

getObjectProps();
