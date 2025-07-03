const units = [
	'',
	'jeden',
	'dwa',
	'trzy',
	'cztery',
	'pięć',
	'sześć',
	'siedem',
	'osiem',
	'dziewięć',
];
const teens = [
	'dziesięć',
	'jedenaście',
	'dwanaście',
	'trzynaście',
	'czternaście',
	'piętnaście',
	'szesnaście',
	'siedemnaście',
	'osiemnaście',
	'dziewiętnaście',
];
const tens = [
	'',
	'',
	'dwadzieścia',
	'trzydzieści',
	'czterdzieści',
	'pięćdziesiąt',
	'sześćdziesiąt',
	'siedemdziesiąt',
	'osiemdziesiąt',
	'dziewięćdziesiąt',
];
const hundreds = [
	'',
	'sto',
	'dwieście',
	'trzysta',
	'czterysta',
	'pięćset',
	'sześćset',
	'siedemset',
	'osiemset',
	'dziewięćset',
];
const thousands = ['tysiąc', 'tysiące', 'tysięcy'];

export const numberToWords = (value: number) => {
	if (value === 0) {
		return 'zero';
	}

	let result = '';

	if (Math.floor(value / 1000) > 0) {
		const thousandsPart = Math.floor(value / 1000);

		result += `${numberToWords(thousandsPart)} ${getThousandWord(thousandsPart)} `;
		value %= 1000;
	}

	if (Math.floor(value / 100) > 0) {
		result += `${hundreds[Math.floor(value / 100)]} `;
		value %= 100;
	}

	if (value >= 10 && value < 20) {
		result += `${teens[value - 10]} `;
	} else if (value >= 20) {
		result += `${tens[Math.floor(value / 10)]} `;
		value %= 10;
	}

	if (value > 0) {
		result += `${units[value]} `;
	}

	return result.trim().replaceAll(/\bundefined\b\s/g, '');
};

const getThousandWord = (amount: number) => {
	if (amount === 1) {
		return thousands[0];
	}

	if (amount >= 2 && amount <= 4) {
		return thousands[1];
	}

	return thousands[2];
};
