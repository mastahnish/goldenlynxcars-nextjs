import { CarFleetInfoDetailsStatisticsItem } from './car-fleet-info-details-statistics-item';

import {
	fuelLabels,
	transmissionLabels,
} from '@/components/car-fleet/car-fleet-card/car-fleet-card-details/car-fleet-card-details.constants';

import EngineIcon from '@/assets/icons/engine.svg';
import FuelIcon from '@/assets/icons/fuel.svg';
import SeatsIcon from '@/assets/icons/seats.svg';
import TransmissionIcon from '@/assets/icons/transmission.svg';

import type { CarFleetDetails } from '../../../car-fleet-card/car-fleet-card.types';

type CarFleetInfoDetailsStatisticsProps = Readonly<{
	details: CarFleetDetails;
}>;

export const CarFleetInfoDetailsStatistics = ({
	details,
}: CarFleetInfoDetailsStatisticsProps) => (
	<ul className="flex gap-6 border-t border-primary/10 pt-4">
		<CarFleetInfoDetailsStatisticsItem
			icon={<EngineIcon />}
			content={`${details.hp} KM`}
		/>
		<CarFleetInfoDetailsStatisticsItem
			icon={<TransmissionIcon />}
			content={transmissionLabels[details.transmission]}
		/>
		<CarFleetInfoDetailsStatisticsItem
			icon={<SeatsIcon />}
			content={`${details.seats} Miejsca`}
		/>
		<CarFleetInfoDetailsStatisticsItem
			icon={<FuelIcon />}
			content={fuelLabels[details.fuel]}
		/>
	</ul>
);
