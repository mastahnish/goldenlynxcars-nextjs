import { CarFleetPricingSectionTable } from './car-fleet-pricing-section-table/car-fleet-pricing-section-table';

import { Section } from '@/components/common/section';

import type { CarFleetPrices } from '../car-fleet-card/car-fleet-card.types';

type CarFleetPricingSectionProps = Readonly<{
	prices: CarFleetPrices;
	deposit: number;
}>;

export const CarFleetPricingSection = ({
	prices,
	deposit,
}: CarFleetPricingSectionProps) => (
	<Section title="Cennik" className="pb-24">
		<CarFleetPricingSectionTable prices={prices} deposit={deposit} />
	</Section>
);
