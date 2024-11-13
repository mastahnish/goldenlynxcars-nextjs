import { z } from 'zod';

export const productDetailsAddToCartFormSchema = z.object({
	amount: z.string({ required_error: 'Wybierz ilość' }).regex(/^\d+$/),
});
