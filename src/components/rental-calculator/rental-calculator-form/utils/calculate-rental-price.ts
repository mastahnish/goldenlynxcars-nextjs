import { getDaysValueIndex, getMonthsValueIndex } from './get-value-index';

import { daysAndMonthsBetween } from '@/utils/date.utils';

import type { CarFleet } from '@/payload/payload-types';

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
	const daysPriceIndex = getDaysValueIndex(days);
	const monthsPriceIndex = getMonthsValueIndex(months);

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
