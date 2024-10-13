const daysPriceLimits = [2, 6, 13, 20, 30];

export const getDaysValueIndex = (days: number) => {
	if (days < 1 || days >= 31) {
		return -1;
	}

	return daysPriceLimits.findIndex(limit => days <= limit);
};

export const getMonthsValueIndex = (months: number) => {
	if (months < 1) {
		return -1;
	}

	if (months >= 3) {
		return 1;
	}

	return 0;
};
