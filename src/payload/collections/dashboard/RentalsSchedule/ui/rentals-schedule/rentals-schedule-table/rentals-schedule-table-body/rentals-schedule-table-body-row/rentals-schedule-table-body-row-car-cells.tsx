import type { CarFleet, CarFleetBrand } from '@/payload/payload-types';

type RentalsScheduleTableBodyRowCarCellsProps = Readonly<{
	car: CarFleet;
}>;

export const RentalsScheduleTableBodyRowCarCells = ({
	car,
}: RentalsScheduleTableBodyRowCarCellsProps) => (
	<>
		<td>{(car.brand as CarFleetBrand).brand}</td>
		<td>{car.model}</td>
	</>
);
