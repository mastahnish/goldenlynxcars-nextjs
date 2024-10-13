import { isValidPhoneNumber } from 'libphonenumber-js';
import { z } from 'zod';

const rentalCalculatorFormBaseSchema = z.object({
	carId: z.string({ message: 'Wybierz samochód' }).regex(/^\d+$/),
	startDate: z.date({ message: 'Wybierz datę odbioru' }),
	endDate: z.date({ message: 'Wybierz datę zwrotu' }),
	age: z.coerce.number().min(21, 'Minimalny wiek to 21 lat'),
	biggerMileageLimit: z.boolean().optional(),
	additionalMileageLimit: z.array(z.number()).optional(),
	email: z
		.string()
		.min(1, 'Podaj adres email')
		.email('Niepoprawny adres email'),
	phoneNumber: z
		.string()
		.min(1, 'Podaj numer telefonu')
		.refine(
			value => isValidPhoneNumber(value, { defaultCountry: 'PL' }),
			'Niepoprawny numer telefonu',
		),
});

export const rentalCalculatorFormSchema = z.discriminatedUnion(
	'diffCollectionAndReturnAddress',
	[
		rentalCalculatorFormBaseSchema.extend({
			diffCollectionAndReturnAddress: z.literal(true),
			collectionAndReturnAddress: z.string().optional(),
			collectionAddress: z
				.string({ message: 'Wybierz miejsce odbioru' })
				.min(1, 'Wybierz miejsce odbioru'),
			returnAddress: z
				.string({ message: 'Wybierz miejsce zwrotu' })
				.min(1, 'Wybierz miejsce zwrotu'),
		}),
		rentalCalculatorFormBaseSchema.extend({
			diffCollectionAndReturnAddress: z.literal(false).optional(),
			collectionAndReturnAddress: z
				.string()
				.min(1, 'Wybierz miejsce odbioru i zwrotu'),
			collectionAddress: z.string().optional(),
			returnAddress: z.string().optional(),
		}),
	],
);
