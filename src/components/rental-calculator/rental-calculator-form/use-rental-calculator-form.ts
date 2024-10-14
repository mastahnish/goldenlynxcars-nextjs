import { useWatch } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { DEFAULT_ADDRESS } from './rental-calculator-form.constants';
import { rentalCalculatorFormSchema } from './rental-calculator-form.schema';
import { calculateLocationPrice } from './utils/calculate-location-price';
import { calculateMileageLimit } from './utils/calculate-mileage-limit';
import { calculateRentalPrice } from './utils/calculate-rental-price';

import { sendRentalPriceRequest } from '@/actions/rental-price';
import { useZodForm } from '@/hooks/use-zod-form';

import type { CarFleet } from '@/payload/payload-types';

interface UseRentalCalculatorFormInput {
	cars: CarFleet[];
}

export const useRentalCalculatorForm = ({
	cars,
}: UseRentalCalculatorFormInput) => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useZodForm(rentalCalculatorFormSchema, {
		defaultValues: {
			collectionAndReturnAddress: '',
			diffCollectionAndReturnAddress: false,
		},
	});
	const [
		carId,
		startDate,
		endDate,
		diffCollectionAndReturnAddress,
		collectionAndReturnAddress,
		collectionAddress,
		returnAddress,
		biggerMileageLimit,
		[additionalMileageLimit] = [0],
	] = useWatch({
		control,
		name: [
			'carId',
			'startDate',
			'endDate',
			'diffCollectionAndReturnAddress',
			'collectionAndReturnAddress',
			'collectionAddress',
			'returnAddress',
			'biggerMileageLimit',
			'additionalMileageLimit',
		],
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
		collectionAddress: diffCollectionAndReturnAddress
			? (collectionAddress ?? '')
			: (collectionAndReturnAddress ?? ''),
		returnAddress: diffCollectionAndReturnAddress
			? (returnAddress ?? '')
			: (collectionAndReturnAddress ?? ''),
	});
	const deposit = car?.deposit ?? 0;
	const mileageLimit =
		car && startDate && endDate
			? calculateMileageLimit({ car, startDate, endDate })
			: 0;
	const additionalMileagePrice =
		car && biggerMileageLimit
			? car.additionalMileagePrice * additionalMileageLimit
			: 0;
	const price = rentalPrice + locationPrice + additionalMileagePrice;

	const onSubmit = handleSubmit(
		({ carId, startDate, endDate, age, email, phoneNumber, ...data }) => {
			const rentalCollectionAddress = data.diffCollectionAndReturnAddress
				? data.collectionAddress
				: data.collectionAndReturnAddress;
			const rentalReturnAddress = data.diffCollectionAndReturnAddress
				? data.returnAddress
				: data.collectionAndReturnAddress;

			const sendRentalPriceRequestPromise = sendRentalPriceRequest({
				carId,
				startDate,
				endDate,
				age,
				email,
				phoneNumber,
				collectionAddress: rentalCollectionAddress,
				returnAddress: rentalReturnAddress,
				price,
				mileageLimit,
				additionalMileageLimit,
			});

			void toast.promise(sendRentalPriceRequestPromise, {
				loading: 'Wysyłanie...',
				success: 'Wysłano',
				error: 'Ups, coś poszło nie tak!',
			});
		},
	);

	return {
		register,
		onSubmit,
		control,
		errors,
		diffCollectionAndReturnAddress,
		biggerMileageLimit,
		selectOptions,
		startDate,
		price,
		deposit,
		mileageLimit,
		additionalMileageLimit: biggerMileageLimit ? additionalMileageLimit : 0,
	};
};
