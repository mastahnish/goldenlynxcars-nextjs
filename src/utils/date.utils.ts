import { addMonths, differenceInDays, differenceInMonths } from 'date-fns';

export const daysAndMonthsBetween = (start: Date, end: Date) => {
	const months = differenceInMonths(end, start);
	const adjustedStart = addMonths(start, months);
	const days = differenceInDays(end, adjustedStart);

	return { days, months };
};
