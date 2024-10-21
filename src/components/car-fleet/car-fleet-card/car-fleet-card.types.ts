import type { CarFleet } from '@/payload/payload-types';

type CarFleetDetails = CarFleet['details'];
type CarFleetPrices = CarFleet['prices'];

export type { CarFleet, CarFleetDetails, CarFleetPrices };
