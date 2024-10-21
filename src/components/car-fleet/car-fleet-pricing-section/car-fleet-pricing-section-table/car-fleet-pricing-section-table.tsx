import { CarFleetPricingSectionTableBody } from './car-fleet-pricing-section-table-body';
import { CarFleetPricingSectionTableHead } from './car-fleet-pricing-section-table-head';

import type { CarFleetPrices } from '../../car-fleet-card/car-fleet-card.types';

type CarFleetPricingSectionTableProps = Readonly<{
	prices: CarFleetPrices;
	deposit: number;
}>;

export const CarFleetPricingSectionTable = ({
	prices,
	deposit,
}: CarFleetPricingSectionTableProps) => (
	<div className="rounded-2xl bg-semi-black px-4">
		<table className="w-full text-white">
			<CarFleetPricingSectionTableHead />
			<CarFleetPricingSectionTableBody prices={prices} deposit={deposit} />
		</table>
	</div>
);
