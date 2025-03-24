import { useQuery } from '@tanstack/react-query';
import { useWatch } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { calculateLocationPrice } from './actions/calculate-location-price';
import { DEFAULT_ADDRESS } from './rental-calculator-form.constants';
import { rentalCalculatorFormSchema } from './rental-calculator-form.schema';
import { calculateMileageLimit } from './utils/calculate-mileage-limit';
import { calculateRentalPrice } from './utils/calculate-rental-price';

import { sendRentalPriceRequest } from '@/actions/rental-price';
import { useZodForm } from '@/hooks/use-zod-form';

import type { CarFleet } from '@/payload/payload-types';

interface UseRentalCalculatorFormInput {
	defaultCarId?: string;
	cars: CarFleet[];
}

export const useRentalCalculatorForm = ({
	defaultCarId,
	cars,
}: UseRentalCalculatorFormInput) => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useZodForm(rentalCalculatorFormSchema, {
		defaultValues: {
			carId: defaultCarId,
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
	const locationPriceQuery = useQuery({
		queryKey: [
			'location-price',
			carId,
			diffCollectionAndReturnAddress,
			collectionAndReturnAddress,
			collectionAddress,
			returnAddress,
		],
		queryFn: () =>
			calculateLocationPrice({
				carId,
				defaultAddress: DEFAULT_ADDRESS,
				collectionAddress: diffCollectionAndReturnAddress
					? collectionAddress
						? collectionAddress
						: DEFAULT_ADDRESS
					: collectionAndReturnAddress
						? collectionAndReturnAddress
						: DEFAULT_ADDRESS,
				returnAddress: diffCollectionAndReturnAddress
					? returnAddress
						? returnAddress
						: DEFAULT_ADDRESS
					: collectionAndReturnAddress
						? collectionAndReturnAddress
						: DEFAULT_ADDRESS,
			}),
		enabled: !!carId,
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
	const deposit = car?.deposit ?? 0;
	const mileageLimit =
		car && startDate && endDate
			? calculateMileageLimit({ car, startDate, endDate })
			: 0;
	const additionalMileagePrice =
		car && biggerMileageLimit
			? car.additionalMileagePrice * additionalMileageLimit
			: 0;
	const price =
		rentalPrice + additionalMileagePrice + (locationPriceQuery.data ?? 0);

	const isLoading = locationPriceQuery.isLoading;

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
		car,
		isLoading,
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
