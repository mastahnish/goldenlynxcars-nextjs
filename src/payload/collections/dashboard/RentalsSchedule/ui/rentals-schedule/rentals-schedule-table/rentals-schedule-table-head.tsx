import { COLUMNS, DAYS_IN_MONTH } from '../rentals-schedule.constants';

type RentalsScheduleTableHeadProps = Readonly<{
	month: string;
}>;

export const RentalsScheduleTableHead = ({
	month,
}: RentalsScheduleTableHeadProps) => (
	<thead className="h-8 bg-neutral-500">
		<tr className="*:border *:border-black *:font-normal">
			<th className="px-12">Marka</th>
			<th className="px-12">Model</th>
			{Array.from({ length: DAYS_IN_MONTH }).map((_, i) => (
				<th key={i} className="min-w-9 max-w-9">
					{i + 1}
				</th>
			))}
		</tr>
		<tr key={month}>
			<td colSpan={COLUMNS} className="bg-neutral-600 text-center uppercase">
				{month}
			</td>
		</tr>
	</thead>
);
