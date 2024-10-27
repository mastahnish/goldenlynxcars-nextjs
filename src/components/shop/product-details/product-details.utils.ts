export const generateSelectAmountOptions = () =>
	Array.from({ length: 10 }).map((_, i) => ({
		value: String(i + 1),
		label: String(i + 1),
	}));
