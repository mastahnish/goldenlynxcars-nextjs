import { isValidPhoneNumber } from 'libphonenumber-js';
import { z } from 'zod';

export const contactSectionFormSchema = z.object({
	email: z.string().email(),
	firstName: z.string().min(1),
	phoneNumber: z
		.string()
		.refine(value => isValidPhoneNumber(value, { defaultCountry: 'PL' })),
	carId: z.string().regex(/^\d+$/),
	date: z.date(),
});
