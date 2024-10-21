import { rows } from './car-fleet-pricing-section-table.constants';

export const CarFleetPricingSectionTableHead = () => (
	<thead className="border-b border-primary">
		<tr>
			{rows.map(row => (
				<th key={row} className="py-4 text-left">
					{row}
				</th>
			))}
		</tr>
	</thead>
);
