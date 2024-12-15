'use server';

import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { format } from 'date-fns';
import { z } from 'zod';

import { sendMail } from '@/lib/mailer';

const customerSchema = z.object({
	id: z.number(),
	personalData: z.object({
		email: z.string().email().min(1),
		gender: z.union([z.literal('Male'), z.literal('Female')]),
		fullName: z.string().min(1),
		phoneNumber: z.string().min(1),
		address: z.string().min(1),
		pesel: z.string().min(1),
		idNumber: z.string().min(1),
	}),
	drivingLicense: z.object({
		number: z.string().min(1),
		blankNumber: z.string().min(1),
		issueDate: z.string().min(1),
		expirationDate: z.string().min(1),
		issuingAuthority: z.string().min(1),
	}),
});

export const sendRentalOffer = async (id: string | number) => {
	const payload = await getPayloadHMR({ config });
	const {
		customer,
		car,
		startDate,
		endDate,
		rentalPrice,
		depositAmount,
		pickUpAddress,
		returnAddress,
		mileageLimit,
	} = await payload.findByID({
		id,
		collection: 'rentals',
	});

	if (typeof customer === 'number' || typeof car === 'number') {
		return;
	}

	const { gender } = customer.personalData;

	const startDateTitle = format(startDate, 'MM.dd');
	const startDateFormatted = format(startDate, 'MM.dd.yyyy');
	const endDateFormatted = format(endDate, 'MM.dd.yyyy');

	await sendMail({
		to: customer.email,
		subject: `Wynajem Auta ${startDateTitle}-${endDateFormatted} | ${car.name} | Golden Lynx Cars`,
		html: `
		<div>Dzień dobry,</div>
		<br>
		<div>W nawiązaniu do naszej rozmowy telefonicznej przesyłam ofertę wynajmu Naszego auta.</div>
		<a href="https://goldenlynxcars-nextjs.vercel.app/auto/${car.slug}" style="display:block;width:fit-content">${car.name}</a>
		<br>
		<div>Okres wynajmu: <b>${startDateFormatted} - ${endDateFormatted}</b></div>
		<br>
		<div>Całkowita cena usługi wynajmu ${car.name}: <b>${rentalPrice} zł brutto</b></div>
		<div>Kaucja: <b>${depositAmount} zł</b> (gotówka płatna przy odbiorze)</div>
		<div>Miejsce podstawienia: <b>${pickUpAddress}</b></div>
		<div>Miejsce zwrotu: <b>${returnAddress}</b></div>
		<br>
		<div>🏁 Limit kilometrów: <b>${mileageLimit} km / wynajem.</b> Nadmiarowe km: <b>${car.additionalMileagePrice} zł / km</b></div>
		<br>
		<div>Jeżeli ${gender === 'Male' ? 'miałby Pan' : 'miałaby Pani'} jakieś dodatkowe pytania pozostajemy do dyspozycji.</div>
		<br>
		<div>W załączniku znajdzie ${gender === 'Male' ? 'Pan' : 'Pani'} Ogólne Warunki Najmu Pojazu, po zapoznaniu się z nimi proszę o przesłanie swoich danych do umowy:</div>
		<ul>
			<li>imię i nazwisko</li>
			<li>adres zamieszkania</li>
			<li>PESEL</li>
			<li>numer dowodu osobistego</li>
			<li>numer prawa jazdy</li>
			<li>data wydania prawa jazdy</li>
			<li>data ważności prawa jazdy</li>
			<li>organ wydający prawo jazdy</li>
			<li>numer blankietu prawa jazdy (numer na rewersie pod kodem kreskowym)</li>
			<li>dane do faktury FV - nazwa, NIP oraz adres</li>
		</ul>
		<div>Zachęcamy do śledzenia Nas w mediach społecznościowych.</div>
		<br>
		<div>Pozdrawiam,</div>
		<br>
		<div style="display:flex;max-width:510px">
			<span style="font-size:18px;font-weight:bold;color:#4f4f4f;margin-right:auto">Jacek&nbsp;Ryś</span>
			<a href="https://www.facebook.com/goldenlynxcars" style="margin-right:4px;height:24px;display:inline-block;background:#c69e00" target="_blank">
				<img src="https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/facebook-icon-2x.png" alt="facebook" height="24" style="display:block">
			</a>
			<a href="https://www.facebook.com/goldenlynxcars" style="height:24px;display:inline-block;background:#c69e00" target="_blank">
				<img src="https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/instagram-icon-2x.png" alt="instagram" height="24" style="display:block">
			</a>
		</div>
		<div>Golden Lynx Cars</div>
		<img src="https://ci3.googleusercontent.com/mail-sig/AIorK4yORrnev3qGDimbwbcn4DlAURYBZnKraNRHbiCc2dbxMEDdHO87cSleUumghz5iwGitsAxUc5Y" width="420" height="277">
		<div style="margin-top:24px;margin-bottom:24px;width:215px;border-bottom:1px solid #c69e00"></div>
		<div style="display:flex;align-items:center">
			<img src="https://ci3.googleusercontent.com/meips/ADKq_NY-ugLnvhx8EKeU0NoFaQJxnwUBulA05De1Rj0lx5Itfo-At2BqiyZXrzXbvQpcbueon521QOzfNQ1y06xq7dVDLerq6ZY-nsYtDo9sdlsmC5ul1-T6XUQ4kEevfpeLQJDdM73VqUrTn1dnZ8Q_IA=s0-d-e1-ft#https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/phone-icon-2x.png" alt="phone" width="13" height="13" style="background:#c69e00;margin-top:auto;margin-bottom:auto">
			<a href="tel:+48725521454" style="margin-left:16px;color:#4f4f4f">+48 725 521 454</a>
		</div>
		<div style="display:flex;align-items:center;margin-top:4px">
			<img src="https://ci3.googleusercontent.com/meips/ADKq_NZKllki1F8xHX3XP1B8cJ115cbaoAUYAu0XTemKLCDs4_mFQYcGkKTngars90NA25lBabg-0V6FL9Mdhi9cigSGVAoYg4fcRMPJxQoDUevRI9C9IJiurl0-cw3g5URKDFkoNJmeT24yAoCOJzjgkA=s0-d-e1-ft#https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/email-icon-2x.png" alt="email" width="13" height="13" style="background:#c69e00;margin-top:auto;margin-bottom:auto">
			<a href="mailto:contact@goldenlynxcars.com" style="margin-left:16px;color:#4f4f4f">contact@goldenlynxcars.com</a>
		</div>
		<div style="display:flex;align-items:center;margin-top:4px">
			<img src="https://ci3.googleusercontent.com/meips/ADKq_NZvHSmYu2-NCG_NPzpk6NN_gLctE_NdNQKl7PyZGOXUs0vhhus3sq6WQfnK-AYvhuwDc7H9-s1s_Oh-WV_dXppqqemufsUxJXZX8qrOyxW_1Ers_LaxvK1fdZqA5notV1_TjaMGyU0Sd9UgtjvB=s0-d-e1-ft#https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/link-icon-2x.png" alt="link" width="13" height="13" style="background:#c69e00;margin-top:auto;margin-bottom:auto">
			<a href="https://www.goldenlynxcars.com/" style="margin-left:16px;color:#4f4f4f">www.goldenlynxcars.com</a>
		</div>
		`,
	});
	await payload.update({
		id,
		collection: 'rentals',
		data: {
			status: 'Offer Sent',
		},
	});
};

export const generateRentalContracts = async (id: string | number) => {
	const payload = await getPayloadHMR({ config });
	const { customer } = await payload.findByID({
		id,
		collection: 'rentals',
	});

	if (typeof customer === 'number') {
		throw new Error('Something went wrong');
	}

	const { success } = await customerSchema.safeParseAsync(customer);

	if (!success) {
		throw new Error('Wypełnij wszystkie dane!');
	}
};
