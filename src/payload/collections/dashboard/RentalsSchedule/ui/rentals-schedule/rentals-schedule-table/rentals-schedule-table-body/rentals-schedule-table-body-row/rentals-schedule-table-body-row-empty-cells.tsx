import { DAYS_IN_MONTH } from '../../../rentals-schedule.constants';

export const RentalsScheduleTableBodyRowEmptyCells = () =>
	Array.from({ length: DAYS_IN_MONTH }).map((_, i) => <td key={i}></td>);
