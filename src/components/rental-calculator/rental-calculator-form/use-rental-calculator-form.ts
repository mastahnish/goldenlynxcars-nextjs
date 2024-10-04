import { useWatch } from 'react-hook-form';

import { DEFAULT_ADDRESS } from './rental-calculator-form.constants';
import { rentalCalculatorFormSchema } from './rental-calculator-form.schema';
import { calculateLocationPrice } from './utils/calculate-location-price';
import { calculateRentalPrice } from './utils/calculate-rental-price';

import { useZodForm } from '@/hooks/use-zod-form';

import type { TypeOf } from 'zod';

import type { CarFleet } from '@/payload/payload-types';

interface UseRentalCalculatorFormInput {
	cars: CarFleet[];
}

export const useRentalCalculatorForm = ({
	cars,
}: UseRentalCalculatorFormInput) => {
	const { control } = useZodForm(rentalCalculatorFormSchema);
	const {
		carId,
		startDate,
		endDate,
		diffCollectionAndReturnAddress,
		collectionAndReturnAddress,
		collectionAddress,
		returnAddress,
	} = useWatch<TypeOf<typeof rentalCalculatorFormSchema>>({
		control,
	});

	const selectOptions = cars.map(({ id, name }) => ({
		value: id.toString(),
		label: name,
	}));
	const car = cars.find(car => car.id === Number(carId));
	const rentalPrice =
		car && startDate && endDate
			? calculateRentalPrice({ car, startDate, endDate })
			: 0;
	const locationPrice = calculateLocationPrice({
		defaultAddress: DEFAULT_ADDRESS,
		diffCollectionAndReturnAddress: !!diffCollectionAndReturnAddress,
		collectionAndReturnAddress: collectionAndReturnAddress ?? '',
		collectionAddress: collectionAddress ?? '',
		returnAddress: returnAddress ?? '',
	});

	console.log({ collectionAndReturnAddress });

	return {
		control,
		diffCollectionAndReturnAddress,
		selectOptions,
		startDate,
		price: rentalPrice + locationPrice,
	};
};
