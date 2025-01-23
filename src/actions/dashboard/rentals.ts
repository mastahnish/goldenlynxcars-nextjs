'use server';

import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { formatInTimeZone } from 'date-fns-tz';
import { z } from 'zod';

import { sendZip, unzip } from '../utils/file.utils';
import { getMailFooter } from '../utils/mail.utils';

import { injectHTMLValues } from '@/actions/utils/html.utils';
import { TIMEZONE } from '@/lib/constants';
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
		expirationDate: z.string().nullable(),
		issuingAuthority: z.string().min(1),
	}),
});

const fuelLabels = {
	gasoline: 'PB 98 / benzyna',
	diesel: 'Diesel',
	lpg: 'Gaz',
	hybrid: 'Hybrid',
};

const currencyWords = {
	PLN: 'złotych',
	USD: 'dolarów',
	EUR: 'euro',
	GBP: 'funtów',
	CHF: 'franków',
	NOK: 'koron norweskich',
	BTC: 'bitcoinów',
};

interface SendRentalOfferInput {
	userId: string | number;
	rentalId: string | number;
}

export const sendRentalOffer = async ({
	userId,
	rentalId,
}: SendRentalOfferInput) => {
	const payload = await getPayloadHMR({ config });
	const {
		customer,
		car,
		startDate,
		endDate,
		rentalCurrency,
		rentalPrice,
		depositCurrency,
		depositAmount,
		pickUpAddress,
		returnAddress,
		mileageLimit,
	} = await payload.findByID({
		id: rentalId,
		collection: 'rentals',
	});
	const user = await payload.findByID({
		id: userId,
		collection: 'users',
	});

	if (typeof customer === 'number' || typeof car === 'number') {
		return;
	}

	const { gender } = customer.personalData;

	const startDateTitle = formatInTimeZone(startDate, TIMEZONE, 'dd.MM');
	const startDateFormatted = formatInTimeZone(
		startDate,
		TIMEZONE,
		'dd.MM.yyyy',
	);
	const endDateFormatted = formatInTimeZone(endDate, TIMEZONE, 'dd.MM.yyyy');

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
		<div>Całkowita cena usługi wynajmu ${car.name}: <b>${rentalPrice.toLocaleString(
			'pl-PL',
			{
				style: 'currency',
				currency: rentalCurrency,
				...(Number.isInteger(rentalPrice) && { maximumFractionDigits: 0 }),
			},
		)} brutto</b></div>
		<div>Kaucja: <b>${depositAmount.toLocaleString('pl-PL', {
			style: 'currency',
			currency: depositCurrency,
			...(Number.isInteger(depositCurrency) && { maximumFractionDigits: 0 }),
		})}</b> (gotówka płatna przy odbiorze)</div>
		<div>Miejsce podstawienia: <b>${pickUpAddress}</b></div>
		<div>Miejsce zwrotu: <b>${returnAddress}</b></div>
		<br>
		<div>🏁 Limit kilometrów: <b>${mileageLimit} km / wynajem.</b> Nadmiarowe km: <b>${car.additionalMileagePrice.toLocaleString(
			'pl-PL',
			{
				style: 'currency',
				currency: rentalCurrency,
				...(Number.isInteger(car.additionalMileagePrice) && {
					maximumFractionDigits: 0,
				}),
			},
		)} / km</b></div>
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
		${getMailFooter({ user })}
		`,
		attachments: [
			{
				filename: 'OWNP_Golden Lynx Cars.pdf',
				path: env.OWNP_URL,
			},
		],
	});
	await payload.update({
		id: rentalId,
		collection: 'rentals',
		data: {
			status: 'Offer Sent',
		},
	});
};

interface SendRentalContractsInput {
	userId: string | number;
	rentalId: string | number;
	content: string;
}

export const sendRentalContracts = async ({
	userId,
	rentalId,
	content,
}: SendRentalContractsInput) => {
	const payload = await getPayloadHMR({ config });
	const { customer, car, startDate, endDate } = await payload.findByID({
		id: rentalId,
		collection: 'rentals',
	});
	const user = await payload.findByID({
		id: userId,
		collection: 'users',
	});

	if (typeof customer === 'number' || typeof car === 'number') {
		return;
	}

	const files = unzip(Buffer.from(content, 'base64'));
	const startDateSubject = formatInTimeZone(startDate, TIMEZONE, 'dd.MM');
	const endDateSubject = formatInTimeZone(endDate, TIMEZONE, 'dd.MM.yyyy');

	await sendMail({
		to: customer.email,
		subject: `Wynajem Auta ${startDateSubject}-${endDateSubject} - Umowy | ${car.name} | Golden Lynx Cars`,
		html: `
			<div>Dzień dobry,</div>
			<br>
			<div>Dziękujemy za skorzystanie z usług Golden Lynx Cars.</div>
			<div>W załączniku przesyłamy dokumenty podpisane podczas odbioru auta.</div>
			<br>
			<div>Dziękujemy za zaufanie!</div>
			${getMailFooter({ user })}
		`,
		attachments: files.map(({ entryName, getData }) => ({
			filename: entryName,
			content: getData(),
		})),
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
		rentalCurrency,
		rentalPrice,
		depositCurrency,
		depositAmount,
		installmentCurrency,
		installmentAmount,
		installmentDate,
		status,
		mileageBefore,
		mileageAfter,
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
		return { error: 'Something went wrong' };
	}

	if (status !== 'Confirmed' && status !== 'In Progress') {
		return { error: 'Niepoprawny status rezerwacji' };
	}

	const { success: customerSuccess, data: customerData } =
		await customerSchema.safeParseAsync(customer);

	if (!customerSuccess) {
		return { error: 'Wypełnij wszystkie dane klienta!' };
	}

	const { success: additionalDriverSuccess, data: additionalDriverData } =
		await customerSchema.safeParseAsync(additionalDriver);

	if (additionalDriver && !additionalDriverSuccess) {
		return { error: 'Wypełnij wszystkie dane upoważnionego klienta!' };
	}

	const customerSignature = customerSignatureJSON
		? (customerSignatureJSON as Record<string, string>)['signature']
		: null;
	const employeeSignature = employeeSignatureJSON
		? (employeeSignatureJSON as Record<string, string>)['signature']
		: null;

	if (!customerSignature) {
		return { error: 'Dodaj podpis klienta do umowy!' };
	}

	if (!employeeSignature) {
		return { error: 'Dodaj podpis pracownika do umowy!' };
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
		return { error: 'Something went wrong' };
	}

	const contractId = `${formatInTimeZone(startDate, TIMEZONE, 'yyyy_MM_dd')}_${car.contract.registrationNumber}`;
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

	const values: Record<string, string | null> = {
		fullName: customerData.personalData.fullName,
		email: customerData.personalData.email,
		phoneNumber: customerData.personalData.phoneNumber,
		address: customerData.personalData.address,
		pesel: customerData.personalData.pesel,
		idNumber: customerData.personalData.idNumber,
		drivingLicenseSeriesAndNumber: customerData.drivingLicense.seriesAndNumber,
		drivingLicenseBlankNumber: customerData.drivingLicense.blankNumber,
		drivingLicenseIssueDate: formatInTimeZone(
			customerData.drivingLicense.issueDate,
			TIMEZONE,
			'dd.MM.yyyy',
		),
		drivingLicenseExpirationDate:
			customerData.drivingLicense.expirationDate &&
			formatInTimeZone(
				customerData.drivingLicense.expirationDate,
				TIMEZONE,
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
		mileageAfter: mileageAfter.toString(),
		mileageLimit: mileageLimit.toString(),
		totalMileageLimit: (mileageBefore + mileageLimit).toString(),
		fuelType: fuelLabels[car.details.fuel],
		contractId,
		rentalCurrency,
		rentalCurrencyWord: currencyWords[rentalCurrency],
		rentalPrice: rentalPrice.toString(),
		rentalPriceInWords: numberToWords(rentalPrice),
		installmentCurrency,
		installmentCurrencyWord: currencyWords[installmentCurrency],
		installmentRentalPrice: (rentalPrice - (installmentAmount ?? 0)).toString(),
		installmentAmount: installmentAmount?.toString() ?? '',
		installmentDate: installmentDate
			? formatInTimeZone(installmentDate, TIMEZONE, 'dd.MM.yyyy')
			: null,
		accessories: car.contract.accessories ?? '',
		depositCurrency,
		depositCurrencyWord: currencyWords[depositCurrency],
		depositAmount: depositAmount.toString(),
		depositAmountInWords: numberToWords(depositAmount),
		startDate: formatInTimeZone(startDate, TIMEZONE, 'dd.MM.yyyy'),
		startDateHour: formatInTimeZone(startDate, TIMEZONE, 'kk:mm'),
		endDate: formatInTimeZone(endDate, TIMEZONE, 'dd.MM.yyyy'),
		endDateHour: formatInTimeZone(endDate, TIMEZONE, 'kk:mm'),
		currentDate: formatInTimeZone(new Date(), TIMEZONE, 'dd.MM.yyyy'),
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
		values.authorizedDrivingLicenseIssueDate = formatInTimeZone(
			additionalDriverData.drivingLicense.issueDate,
			TIMEZONE,
			'dd.MM.yyyy',
		);
		values.authorizedDrivingLicenseExpirationDate =
			additionalDriverData.drivingLicense.expirationDate &&
			formatInTimeZone(
				additionalDriverData.drivingLicense.expirationDate,
				TIMEZONE,
				'dd.MM.yyyy',
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

	return { contractId, content: sendZip(files) };
};
