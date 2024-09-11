export const removeDuplicates = <T>(data: T[]) =>
	data.filter((value, index) => data.indexOf(value) === index);
