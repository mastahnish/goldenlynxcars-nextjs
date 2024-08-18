import {
	fuelLabels,
	transmissionLabels,
} from './car-fleet-card-details.constants';
import { CarFleetCardDetailsItem } from './car-fleet-card-details-item';

import EngineIcon from '@/assets/icons/engine.svg';
import FuelIcon from '@/assets/icons/fuel.svg';
import SeatsIcon from '@/assets/icons/seats.svg';
import TransmissionIcon from '@/assets/icons/transmission.svg';

import type { CarFleetDetails } from '../car-fleet-card.types';

type CarFleetCardDetailsProps = Readonly<{
	details: CarFleetDetails;
}>;

export const CarFleetCardDetails = ({ details }: CarFleetCardDetailsProps) => (
	<ul className="mt-4 space-y-3 border-t border-primary/10 pt-4">
		<CarFleetCardDetailsItem
			icon={<EngineIcon />}
			content={`${details.hp} KM`}
		/>
		<CarFleetCardDetailsItem
			icon={<TransmissionIcon />}
			content={transmissionLabels[details.transmission]}
		/>
		<CarFleetCardDetailsItem
			icon={<SeatsIcon />}
			content={`${details.seats} Miejsca`}
		/>
		<CarFleetCardDetailsItem
			icon={<FuelIcon />}
			content={fuelLabels[details.fuel]}
		/>
	</ul>
);
