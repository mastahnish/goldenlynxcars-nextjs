import { differenceInDays } from 'date-fns';

export const getRentalStatus = (
	startDateValue: string,
	endDateValue: string,
) => {
	if (!startDateValue || !endDateValue) {
		return null;
	}

	const currentDate = new Date();
	currentDate.setHours(0);
	currentDate.setMinutes(0);
	currentDate.setSeconds(0);

	const startDate = new Date(startDateValue);
	const endDate = new Date(endDateValue);

	if (currentDate.getTime() < startDate.getTime()) {
		return `Scheduled (in ${differenceInDays(startDate, currentDate)} days)`;
	}

	if (currentDate.getTime() > endDate.getTime()) {
		return `Completed (${differenceInDays(currentDate, endDate)} days ago)`;
	}

	return `During (${differenceInDays(endDate, currentDate)} days left)`;
};
