'use server';

import { fakerPL as faker } from '@faker-js/faker';
import config from '@payload-config';
import { getPayload } from 'payload';
import { match } from 'ts-pattern';

import { generateIdNumber } from '../utils/faker.utils';
import { sendFile } from '../utils/file.utils';

import { injectHTMLValues } from '@/actions/utils/html.utils';
import { generatePDF } from '@/lib/pdf';

const injectFakeHTMLValues = (template: string) => {
	const firstName = faker.person.firstName();
	const lastName = faker.person.lastName();

	const values = {
		fullName: `${firstName} ${lastName}`,
		email: faker.internet.email({ firstName, lastName }),
		phoneNumber: faker.phone.number({ style: 'international' }),
		address: faker.location.streetAddress(true),
		pesel: '85012157463',
		idNumber: generateIdNumber(),
	};

	return injectHTMLValues({ html: template, values });
};

type GenerateContractOptions =
	| {
			id: 'vehiclePickUp' | 'vehicleRelease' | 'vehicleRental';
			target: 'settings';
	  }
	| {
			id: string;
			target: 'templates';
	  };

export const generateContract = async (options: GenerateContractOptions) => {
	const payload = await getPayload({ config });
	const { layout, ...settings } = await payload.findGlobal({
		slug: 'contract-settings',
	});

	const contract = await match(options)
		.with({ target: 'settings' }, ({ id }) => {
			const { [id]: contract } = settings;

			return typeof contract === 'number' ? null : contract;
		})
		.with({ target: 'templates' }, async ({ id }) => {
			const contract = await payload.findByID({
				id,
				collection: 'contract-templates',
			});

			return contract;
		})
		.exhaustive();

	if (!contract) {
		throw new Error('Invalid contract');
	}

	const html = injectFakeHTMLValues(contract.template);
	const pdf = await generatePDF({
		html,
		templates: { ...layout },
	});

	return sendFile(pdf);
};
