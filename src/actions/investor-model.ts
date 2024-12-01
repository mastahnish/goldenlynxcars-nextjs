'use server';

import { env } from '@/lib/env';
import { sendMail } from '@/lib/mailer';

interface SendInvestorModelRequestParams {
	email: string;
	firstName: string;
	phoneNumber: string;
	brand: string;
	model: string;
	year: number;
	mileage: number;
	drive: string;
	engine: string;
	power: number;
}

export const sendInvestorModelRequest = async ({
	email,
	firstName,
	phoneNumber,
	brand,
	model,
	year,
	mileage,
	drive,
	engine,
	power,
}: SendInvestorModelRequestParams) => {
	await sendMail({
		to: env.CONTACT_TARGET_EMAIL,
		subject: 'Propozycja wprowadzenia auta do floty',
		html: `
    <p>E-mail: <b>${email}</b></p>
    <p>Imię: <b>${firstName}</b></p>
    <p>Numer telefonu: <b>${phoneNumber}</b></p>
    <p>Marka: <b>${brand}</b></p>
    <p>Model: <b>${model}</b></p>
    <p>Rocznik: <b>${year}</b></p>
    <p>Przebieg: <b>${mileage}km</b></p>
    <p>Napęd: <b>${drive}</b></p>
    <p>Silnik: <b>${engine}</b></p>
    <p>Moc: <b>${power} KM</b></p>
		`,
	});
};
