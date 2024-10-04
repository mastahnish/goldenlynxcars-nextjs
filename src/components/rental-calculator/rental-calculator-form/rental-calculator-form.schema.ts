import { z } from 'zod';

export const rentalCalculatorFormSchema = z.object({
	carId: z.string().regex(/^\d+$/),
	startDate: z.date(),
	endDate: z.date(),
	diffCollectionAndReturnAddress: z.boolean(),
	collectionAndReturnAddress: z.string(),
	collectionAddress: z.string(),
	returnAddress: z.string(),
});
