import { RentalsScheduleTableBodyRowCarCells } from './rentals-schedule-table-body-row-car-cells';
import { RentalsScheduleTableBodyRowEmptyCells } from './rentals-schedule-table-body-row-empty-cells';
import { RentalsScheduleTableBodyRowRentalsCells } from './rentals-schedule-table-body-row-rentals-cells/rentals-schedule-table-body-row-rentals-cells';

import type { RentalsData } from '../rentals-schedule-table-body.utils';

import type { CarFleet } from '@/payload/payload-types';

type RentalsScheduleTableBodyRowProps = Readonly<{
	car: CarFleet;
	rentalsData: RentalsData;
}>;

export const RentalsScheduleTableBodyRow = ({
	car,
	rentalsData,
}: RentalsScheduleTableBodyRowProps) => (
	<tr className="overflow-hidden *:border *:border-solid *:border-neutral-400">
		<RentalsScheduleTableBodyRowCarCells car={car} />
		{rentalsData.length ? (
			<RentalsScheduleTableBodyRowRentalsCells rentalsData={rentalsData} />
		) : (
			<RentalsScheduleTableBodyRowEmptyCells />
		)}
	</tr>
);
