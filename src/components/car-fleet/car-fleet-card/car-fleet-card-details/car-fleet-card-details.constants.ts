import type { CarFleetDetails } from '../car-fleet-card.types';

export const transmissionLabels: Record<
	CarFleetDetails['transmission'],
	string
> = {
	manual: 'Manualna',
	sequential: 'Sekwencyjna',
	automatic: 'Automatyczna',
};

export const fuelLabels: Record<CarFleetDetails['fuel'], string> = {
	gasoline: 'PB',
	diesel: 'ON',
	lpg: 'LPG',
	hybrid: 'HEV',
};
