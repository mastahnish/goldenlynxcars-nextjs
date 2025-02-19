import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';

import { RentalsScheduleTableBody } from './rentals-schedule-table-body/rentals-schedule-table-body';
import { RentalsScheduleTableHead } from './rentals-schedule-table-head';

import { getCachedCollection } from '@/lib/get-cached-collection';

type RentalsScheduleTableProps = Readonly<{
	monthIndex: number;
	month: string;
}>;

export const RentalsScheduleTable = async ({
	monthIndex,
	month,
}: RentalsScheduleTableProps) => {
	const payload = await getPayloadHMR({ config });

	const currentMonth = monthIndex < 9 ? `0${monthIndex + 1}` : monthIndex + 1;
	const nextMonth =
		monthIndex < 8
			? `0${Math.min(monthIndex + 2, 12)}`
			: Math.min(monthIndex + 2, 12);

	const { docs: carFleet } = await getCachedCollection('car-fleet')();
	const { docs: rentals } = await payload.find({
		collection: 'rentals',
		where: {
			and: [
				{
					startDate: {
						greater_than_equal: `2025-${currentMonth}-01T00:00:00.000Z`,
					},
				},
				{
					endDate: {
						less_than: `2025-${nextMonth}-01T00:00:00.000Z`,
					},
				},
			],
		},
	});

	return (
		<table className="w-full border-collapse text-white">
			<RentalsScheduleTableHead month={month} />
			<RentalsScheduleTableBody carFleet={carFleet} rentals={rentals} />
		</table>
	);
};
