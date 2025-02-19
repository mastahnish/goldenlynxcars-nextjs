import { addMonths, differenceInDays, differenceInMonths } from 'date-fns';

export const daysAndMonthsBetween = (start: Date, end: Date) => {
	const months = differenceInMonths(end, start);
	const adjustedStart = addMonths(start, months);
	const days = differenceInDays(end, adjustedStart);

	return { days, months };
};

export const getAllMonths = () => {
	const formatter = new Intl.DateTimeFormat('pl-PL', { month: 'long' });

	return Array.from({ length: 12 }).map((_, i) =>
		formatter.format(new Date(Date.UTC(0, i))),
	);
};
