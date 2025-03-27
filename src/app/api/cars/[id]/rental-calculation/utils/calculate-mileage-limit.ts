import { getDaysValueIndex, getMonthsValueIndex } from './get-value-index';

import { daysAndMonthsBetween } from '@/utils/date.utils';

import type { CarFleet } from '@/payload/payload-types';

interface CalculateMileageLimitParams {
	car: CarFleet;
	startDate: Date;
	endDate: Date;
}

export const calculateMileageLimit = ({
	car: { mileageLimits },
	startDate,
	endDate,
}: CalculateMileageLimitParams) => {
	const dayLimits = [
		mileageLimits.d_1_2,
		mileageLimits.d_3_6,
		mileageLimits.d_7_13,
		mileageLimits.d_14_20,
		mileageLimits.d_21_30,
	];
	const monthLimits = [mileageLimits.m_1, mileageLimits.m_3];

	const { days, months } = daysAndMonthsBetween(startDate, endDate);
	const daysLimitIndex = getDaysValueIndex(days);
	const monthsLimitIndex = getMonthsValueIndex(months);

	const daysLimit =
		daysLimitIndex !== -1
			? monthsLimitIndex === -1
				? days * dayLimits[daysLimitIndex]
				: (monthLimits[monthsLimitIndex] / 30) * days
			: 0;
	const monthsLimit =
		monthsLimitIndex !== -1 ? months * monthLimits[monthsLimitIndex] : 0;

	return daysLimit + monthsLimit;
};
