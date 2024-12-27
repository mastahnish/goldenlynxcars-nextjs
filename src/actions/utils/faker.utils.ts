import { fakerPL as faker } from '@faker-js/faker';

export const generateIdNumber = () => {
	const letters = faker.string.alpha({ length: 3, casing: 'upper' }); // 3 wielkie litery
	const digits = faker.string.numeric(6);

	return `${letters} ${digits}`;
};
