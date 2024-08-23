'use server';

import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';

interface AddContactRequestInput {
	email: string;
	firstName: string;
	phoneNumber: string;
	carId: string;
	date: Date;
}

export const addContactRequest = async ({
	email,
	firstName,
	phoneNumber,
	carId,
	date,
}: AddContactRequestInput) => {
	const payload = await getPayloadHMR({ config });

	await payload.create({
		collection: 'contact-request',
		data: {
			email,
			firstName,
			phoneNumber,
			car: Number(carId),
			date: date.toDateString(),
		},
	});
};
