import { addMonths, differenceInDays, differenceInMonths } from 'date-fns';

import type { CarFleet } from '@/payload/payload-types';

const daysPriceLimits = [2, 6, 13, 20, 30];

const getDaysPriceIndex = (days: number) => {
	if (days < 1 || days >= 31) {
		return -1;
	}

	return daysPriceLimits.findIndex(limit => days <= limit);
};

const getMonthsPriceIndex = (months: number) => {
	if (months < 1) {
		return -1;
	}

	if (months >= 3) {
		return 1;
	}

	return 0;
};

const daysAndMonthsBetween = (start: Date, end: Date) => {
	const months = differenceInMonths(end, start);
	const adjustedStart = addMonths(start, months);
	const days = differenceInDays(end, adjustedStart);

	return { days, months };
};

interface CalculateRentalPriceParams {
	car: CarFleet;
	startDate: Date;
	endDate: Date;
}

export const calculateRentalPrice = ({
	car: { prices },
	startDate,
	endDate,
}: CalculateRentalPriceParams) => {
	const dayPrices = [
		prices.d_1_2,
		prices.d_3_6,
		prices.d_7_13,
		prices.d_14_20,
		prices.d_21_30,
	];
	const monthPrices = [prices.m_1, prices.m_3];

	const { days, months } = daysAndMonthsBetween(startDate, endDate);
	const daysPriceIndex = getDaysPriceIndex(days);
	const monthsPriceIndex = getMonthsPriceIndex(months);

	const daysPrice =
		daysPriceIndex !== -1
			? monthsPriceIndex === -1
				? days * dayPrices[daysPriceIndex]
				: (monthPrices[monthsPriceIndex] / 30) * days
			: 0;
	const monthsPrice =
		monthsPriceIndex !== -1 ? months * monthPrices[monthsPriceIndex] : 0;

	return daysPrice + monthsPrice;
};
