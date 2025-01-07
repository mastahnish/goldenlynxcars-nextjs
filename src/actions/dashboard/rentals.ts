'use server';

import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { format } from 'date-fns';
import { z } from 'zod';

import { sendZip } from '../utils/file.utils';

import { injectHTMLValues } from '@/actions/utils/html.utils';
import { env } from '@/lib/env';
import { sendMail } from '@/lib/mailer';
import { generateMultiplePDFs } from '@/lib/pdf';
import { numberToWords } from '@/utils/number-to-words';

const customerSchema = z.object({
	id: z.number(),
	personalData: z.object({
		email: z.string().min(1),
		gender: z.union([z.literal('Male'), z.literal('Female')]),
		fullName: z.string().min(1),
		phoneNumber: z.string().min(1),
		address: z.string().min(1),
		pesel: z.string().min(1),
		idNumber: z.string().min(1),
	}),
	drivingLicense: z.object({
		seriesAndNumber: z.string().min(1),
		blankNumber: z.string().min(1),
		issueDate: z.string().min(1),
		expirationDate: z.string().min(1),
		issuingAuthority: z.string().min(1),
	}),
});

const fuelLabels = {
	gasoline: 'PB 98 / benzyna',
	diesel: 'Diesel',
	lpg: 'Gaz',
	hybrid: 'Hybrid',
};

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
			<li>seria i numer prawa jazdy</li>
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
		attachments: [
			{
				filename: 'OWNP_Golden Lynx Cars.pdf',
				path: env.OWNP_URL,
			},
		],
	});
	await payload.update({
		id,
		collection: 'rentals',
		data: {
			status: 'Offer Sent',
		},
	});
};

export type RentalSignatureTarget = 'customer' | 'employee';

interface SetRentalSignatureParams {
	rentalId: string | number;
	target: RentalSignatureTarget;
	signature: string;
}

export const setRentalSignature = async ({
	rentalId,
	target,
	signature,
}: SetRentalSignatureParams) => {
	const payload = await getPayloadHMR({ config });

	await payload.update({
		id: rentalId,
		collection: 'rentals',
		data: {
			...(target === 'customer' && { customerSignatureJSON: { signature } }),
			...(target === 'employee' && { employeeSignatureJSON: { signature } }),
		},
	});
};

export const generateRentalContracts = async (id: string | number) => {
	const payload = await getPayloadHMR({ config });
	const {
		customer,
		additionalDriver,
		car,
		startDate,
		endDate,
		rentalPrice,
		depositAmount,
		status,
		mileageBefore,
		mileageLimit,
		customerSignatureJSON,
		employeeSignatureJSON,
	} = await payload.findByID({
		id,
		collection: 'rentals',
	});

	if (
		typeof customer === 'number' ||
		typeof car === 'number' ||
		typeof car.brand === 'number'
	) {
		throw new Error('Something went wrong');
	}

	if (status !== 'Confirmed' && status !== 'In Progress') {
		throw new Error('Niepoprawny status rezerwacji');
	}

	const { success: customerSuccess, data: customerData } =
		await customerSchema.safeParseAsync(customer);

	if (!customerSuccess) {
		throw new Error('Wypełnij wszystkie dane klienta!');
	}

	const { success: additionalDriverSuccess, data: additionalDriverData } =
		await customerSchema.safeParseAsync(additionalDriver);

	if (additionalDriver && !additionalDriverSuccess) {
		throw new Error('Wypełnij wszystkie dane upoważnionego klienta!');
	}

	const customerSignature = customerSignatureJSON
		? (customerSignatureJSON as Record<string, string>)['signature']
		: null;
	const employeeSignature = employeeSignatureJSON
		? (employeeSignatureJSON as Record<string, string>)['signature']
		: null;

	if (!customerSignature) {
		throw new Error('Dodaj podpis klienta do umowy!');
	}

	if (!employeeSignature) {
		throw new Error('Dodaj podpis pracownika do umowy!');
	}

	const {
		layout,
		vehicleRental,
		vehicleRentalAuthorized,
		vehiclePickUp,
		vehicleRelease,
	} = await payload.findGlobal({
		slug: 'contract-settings',
	});

	if (
		typeof vehicleRental === 'number' ||
		typeof vehicleRentalAuthorized === 'number' ||
		typeof vehiclePickUp === 'number' ||
		typeof vehicleRelease === 'number'
	) {
		throw new Error('Something went wrong');
	}

	const contractId = `${format(startDate, 'yyyy_MM_dd')}_${car.contract.registrationNumber}`;
	const isAdditionalDriver =
		!!additionalDriver && typeof additionalDriver !== 'number';

	const templates = {
		Confirmed: [
			{
				name: 'umowa_wynajmu_pojazdu',
				template: (isAdditionalDriver ? vehicleRentalAuthorized : vehicleRental)
					.template,
			},
			{ name: 'protokół_wydania_pojazdu', template: vehicleRelease.template },
		],
		'In Progress': [
			{ name: 'protokół_odbioru_pojazdu', template: vehiclePickUp.template },
		],
	};
	const values: Record<string, string> = {
		fullName: customerData.personalData.fullName,
		email: customerData.personalData.email,
		phoneNumber: customerData.personalData.phoneNumber,
		address: customerData.personalData.address,
		pesel: customerData.personalData.pesel,
		idNumber: customerData.personalData.idNumber,
		drivingLicenseSeriesAndNumber: customerData.drivingLicense.seriesAndNumber,
		drivingLicenseBlankNumber: customerData.drivingLicense.blankNumber,
		drivingLicenseIssueDate: format(
			customerData.drivingLicense.issueDate,
			'dd.MM.yyyy',
		),
		drivingLicenseExpirationDate: format(
			customerData.drivingLicense.expirationDate,
			'dd.MM.yyyy',
		),
		drivingLicenseIssuingAuthority:
			customerData.drivingLicense.issuingAuthority,
		vehicleName: car.name,
		vehicleBrand: car.brand.brand,
		vehicleModel: car.model,
		vehicleRegistrationNumber: car.contract.registrationNumber ?? '',
		vehicleRegistrationCertificateNumber:
			car.contract.registrationCertificateNumber ?? '',
		vehicleVIN: car.contract.VIN ?? '',
		vehicleOC: car.contract.oc ?? '',
		vehicleKeysAmount: car.contract.keysAmount.toString(),
		vehicleTires: car.contract.tires ?? '',
		currentMileage: mileageBefore.toString(),
		mileageLimit: mileageLimit.toString(),
		fuelType: fuelLabels[car.details.fuel],
		contractId,
		rentalPrice: rentalPrice.toString(),
		rentalPriceInWords: numberToWords(rentalPrice),
		accessories: car.contract.accessories ?? '',
		depositAmount: depositAmount.toString(),
		depositAmountInWords: numberToWords(depositAmount),
		startDate: format(startDate, 'dd.MM.yyyy'),
		startDateHour: format(startDate, 'kk:mm'),
		endDate: format(endDate, 'dd.MM.yyyy'),
		endDateHour: format(endDate, 'kk:mm'),
		currentDate: format(new Date(), 'dd.MM.yyyy'),
	};
	const images: Record<string, string> = {
		customerSignature,
		employeeSignature,
	};

	if (isAdditionalDriver && additionalDriverData) {
		values.authorizedFullName = additionalDriverData.personalData.fullName;
		values.authorizedEmail = additionalDriverData.personalData.email;
		values.authorizedPhoneNumber =
			additionalDriverData.personalData.phoneNumber;
		values.authorizedAddress = additionalDriverData.personalData.address;
		values.authorizedPesel = additionalDriverData.personalData.pesel;
		values.authorizedIdNumber = additionalDriverData.personalData.idNumber;
		values.authorizedDrivingLicenseSeriesAndNumber =
			additionalDriverData.drivingLicense.seriesAndNumber;
		values.authorizedDrivingLicenseBlankNumber =
			additionalDriverData.drivingLicense.blankNumber;
		values.authorizedDrivingLicenseIssueDate = format(
			additionalDriverData.drivingLicense.issueDate,
			'MM.dd.yyyy',
		);
		values.authorizedDrivingLicenseExpirationDate = format(
			additionalDriverData.drivingLicense.expirationDate,
			'MM.dd.yyyy',
		);
		values.authorizedDrivingLicenseIssuingAuthority =
			additionalDriverData.drivingLicense.issuingAuthority;
	}

	const data = templates[status].map(({ template }) => {
		const html = injectHTMLValues({
			html: template,
			values,
			images,
		});

		return {
			html,
			templates: { ...layout },
		};
	});
	const buffers = await generateMultiplePDFs(data);
	const files = templates[status].map(({ name }, i) => ({
		name: `${contractId}_${name}.pdf`,
		buffer: buffers[i],
	}));

	await payload.update({
		id,
		collection: 'rentals',
		data: {
			customerSignatureJSON: null,
			employeeSignatureJSON: null,
			...(status === 'Confirmed' && { status: 'In Progress' }),
			...(status === 'In Progress' && { status: 'Completed' }),
		},
	});

	return { contractId, href: sendZip(files) };
};
