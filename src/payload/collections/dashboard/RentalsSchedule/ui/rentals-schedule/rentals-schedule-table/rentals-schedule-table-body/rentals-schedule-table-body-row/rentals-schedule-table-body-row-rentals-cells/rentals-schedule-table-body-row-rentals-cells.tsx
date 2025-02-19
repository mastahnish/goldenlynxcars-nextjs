import { DAYS_IN_MONTH } from '../../../../rentals-schedule.constants';
import { calculateMerges } from './rentals-schedule-table-body-row-rentals-cells.utils';
import { RentalsScheduleTableBodyRowRentalsCellsPadding } from './rentals-schedule-table-body-row-rentals-cells-padding';

import type { RentalsData } from '../../rentals-schedule-table-body.utils';

const backgrounds = {
	Provisional: '#B0B0B0',
	'Offer Sent': '#3498DB',
	Confirmed: '#2ECC71',
	'In Progress': '#E3B262',
	Completed: '#1D8348',
	Rejected: '#E74C3C',
};

type RentalsScheduleTableBodyRowRentalsCellsProps = Readonly<{
	rentalsData: RentalsData;
}>;

export const RentalsScheduleTableBodyRowRentalsCells = ({
	rentalsData,
}: RentalsScheduleTableBodyRowRentalsCellsProps) => {
	const columns = calculateMerges(rentalsData);

	return columns.map((column, i) => {
		const isFirst = i === 0;
		const isLast = i === columns.length - 1;
		const prev = columns[i - 1];
		const padding =
			column.start - (isFirst ? 1 : prev.start + prev.totalLength);

		return (
			<>
				<RentalsScheduleTableBodyRowRentalsCellsPadding padding={padding} />
				<td
					colSpan={column.totalLength}
					className="relative min-w-9 max-w-9 overflow-hidden border-red-600 text-center"
				>
					<div className="absolute inset-0 flex">
						{column.rentalsData.map(
							({ id, customerName, status, length }, i) => {
								const merged = column.rentalsData.length > 1;
								const offset =
									i > 0 && i < column.rentalsData.length - 1 ? 36 : 18;

								return (
									<a
										key={id}
										href={`/admin/collections/rentals/${id}`}
										target="_blank"
										className="block w-full"
										style={{
											backgroundColor: backgrounds[status],
											...(merged && {
												width: `calc(${(length / column.totalLength) * 100}% - ${offset}px)`,
											}),
										}}
									>
										{customerName}
									</a>
								);
							},
						)}
					</div>
				</td>
				{isLast && (
					<>
						{Array.from({
							length: DAYS_IN_MONTH - column.start - column.totalLength + 1,
						}).map((_, i) => (
							<td key={i}></td>
						))}
					</>
				)}
			</>
		);
	});
};
