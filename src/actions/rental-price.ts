'use server';

import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { formatDate } from 'date-fns/format';
import { pl } from 'date-fns/locale';

import { DEFAULT_ADDRESS } from '@/components/rental-calculator/rental-calculator-form/rental-calculator-form.constants';

import { env } from '@/lib/env';
import { sendMail } from '@/lib/mailer';

interface SendRentalPriceRequestInput {
	carId: string;
	startDate: Date;
	endDate: Date;
	collectionAddress: string;
	returnAddress: string;
	age: number;
	email: string;
	phoneNumber: string;
	price: number;
}

export const sendRentalPriceRequest = async ({
	carId,
	startDate,
	endDate,
	collectionAddress,
	returnAddress,
	age,
	email,
	phoneNumber,
	price,
}: SendRentalPriceRequestInput) => {
	const payload = await getPayloadHMR({ config });
	const car = await payload.findByID({
		collection: 'car-fleet',
		id: carId,
	});

	await sendMail({
		to: env.CONTACT_TARGET_EMAIL,
		subject: 'Klient prosi o wycenę',
		html: `
			<p>Samochód: <b>${car.name}</b></p>
			<p>Data odbioru: <b>${formatDate(startDate, 'd MMMM yyyy', { locale: pl })}</b></p>
			<p>Data zwrotu: <b>${formatDate(endDate, 'd MMMM yyyy', { locale: pl })}</b></p>
			<p>Miejsce odbioru: <b>${collectionAddress}</b> ${collectionAddress === DEFAULT_ADDRESS ? '(<b><u>siedziba</u></b>)' : ''}</p>
			<p>Miejsce zwrotu: <b>${returnAddress}</b> ${returnAddress === DEFAULT_ADDRESS ? '(<b><u>siedziba</u></b>)' : ''}</p>
			<p>Wiek: <b>${age}</b></p>
			<p>E-mail: <b>${email}</b></p>
			<p>Numer telefonu: <b>${phoneNumber}</b></p>
			<p>Oszacowana cena: <b><u>${price} zł</u> brutto</b></p>
		`,
	});
};
