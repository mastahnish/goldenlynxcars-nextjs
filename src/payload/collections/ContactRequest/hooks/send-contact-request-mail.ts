import { env } from '@/lib/env';
import { sendMail } from '@/lib/mailer';

import type { CollectionAfterOperationHook } from 'payload';

export const sendContactRequestMail: CollectionAfterOperationHook<
	'contact-request'
> = async ({ operation, result }) => {
	if (operation !== 'create') {
		return result;
	}

	const car = typeof result.car !== 'number' ? result.car.name : result.car;
	const date = result.date.split('T')[0];

	await sendMail({
		to: env.CONTACT_TARGET_EMAIL,
		subject: `Klient prosi o kontant #${result.id}`,
		html: `
			<p>E-mail: <b>${result.email}</b></p>
			<p>Imię: <b>${result.firstName}</b></p>
			<p>Numer telefonu: <b>${result.phoneNumber}</b></p>
			<p>Samochód: <b>${car}</b></p>
			<p>Wstępny termin: <b>${date}</b></p>
		`,
	});

	return result;
};
