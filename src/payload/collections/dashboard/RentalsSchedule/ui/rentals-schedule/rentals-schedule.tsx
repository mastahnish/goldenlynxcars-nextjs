import { RentalsScheduleTable } from './rentals-schedule-table/rentals-schedule-table';

import { getAllMonths } from '@/utils/date.utils';

const RentalsSchedule = () => {
	const months = getAllMonths();

	return (
		<div className="h-full overflow-auto">
			{months.map((month, i) => (
				<RentalsScheduleTable key={month} monthIndex={i} month={month} />
			))}
		</div>
	);
};

export default RentalsSchedule;
