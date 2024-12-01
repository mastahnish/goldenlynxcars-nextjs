import { isValidPhoneNumber } from 'libphonenumber-js';
import { z } from 'zod';

export const investorModelContactSectionFormSchema = z.object({
	email: z
		.string()
		.min(1, 'Wpisz adres e-mail')
		.email({ message: 'Niepoprawny adres e-mail' }),
	firstName: z.string().min(1, 'Wpisz imię'),
	phoneNumber: z
		.string()
		.min(1, 'Wpisz numer telefonu')
		.refine(value => isValidPhoneNumber(value, { defaultCountry: 'PL' }), {
			message: 'Niepoprawny numer telefonu',
		}),
	brand: z.string().min(1, 'Wpisz markę'),
	model: z.string().min(1, 'Wpisz model'),
	year: z.coerce.number().min(1, 'Wpisz rocznik'),
	mileage: z.coerce.number().min(1, 'Wpisz przebieg'),
	drive: z.string({ message: 'Wybierz typ napędu' }),
	engine: z.string().min(1, 'Wpisz silnik'),
	power: z.coerce.number().min(1, 'Wpisz moc silnika'),
});
