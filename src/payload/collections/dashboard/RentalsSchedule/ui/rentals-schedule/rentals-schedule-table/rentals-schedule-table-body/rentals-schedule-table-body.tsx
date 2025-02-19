import { getRentalsData } from './rentals-schedule-table-body.utils';
import { RentalsScheduleTableBodyRow } from './rentals-schedule-table-body-row/rentals-schedule-table-body-row';

import type { CarFleet, Rental } from '@/payload/payload-types';

type RentalsScheduleTableBodyProps = Readonly<{
	carFleet: CarFleet[];
	rentals: Rental[];
}>;

export const RentalsScheduleTableBody = ({
	carFleet,
	rentals,
}: RentalsScheduleTableBodyProps) => {
	return (
		<tbody>
			{carFleet.map(car => {
				const rentalsData = getRentalsData({ car, rentals });

				return (
					<RentalsScheduleTableBodyRow
						key={car.id}
						car={car}
						rentalsData={rentalsData}
					/>
				);
			})}
		</tbody>
	);
};
