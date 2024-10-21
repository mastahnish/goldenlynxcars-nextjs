import {
	dayLabels,
	monthLabels,
} from './car-fleet-pricing-section-table.constants';

import type { CarFleetPrices } from '../../car-fleet-card/car-fleet-card.types';

type CarFleetPricingSectionTableBodyProps = Readonly<{
	prices: CarFleetPrices;
	deposit: number;
}>;

export const CarFleetPricingSectionTableBody = ({
	prices,
	deposit,
}: CarFleetPricingSectionTableBodyProps) => {
	const dayPrices = [
		prices.d_1_2,
		prices.d_3_6,
		prices.d_7_13,
		prices.d_14_20,
		prices.d_21_30,
	];
	const monthPrices = [prices.m_1, prices.m_3];

	return (
		<tbody>
			{dayPrices.map((price, i) => (
				<tr key={i} className="border-b border-dashed border-neutral-700">
					<td className="py-3">{dayLabels[i]}</td>
					<td>{price}zł / Doba</td>
				</tr>
			))}
			{monthPrices.map((price, i) => (
				<tr key={i} className="border-b border-dashed border-neutral-700">
					<td className="py-3">{monthLabels[i]}</td>
					<td>{price}zł</td>
				</tr>
			))}
			<tr>
				<td className="py-3">KAUCJA</td>
				<td>{deposit}zł</td>
			</tr>
		</tbody>
	);
};
