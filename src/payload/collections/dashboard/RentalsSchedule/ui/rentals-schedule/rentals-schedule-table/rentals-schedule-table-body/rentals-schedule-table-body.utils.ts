import type { CarFleet, Customer, Rental } from '@/payload/payload-types';

export type RentalsData = ReturnType<typeof getRentalsData>;

export const getRentalsData = ({
	car,
	rentals,
}: {
	car: CarFleet;
	rentals: Rental[];
}) => {
	const currentRentals = rentals.filter(
		({ car: rentalCar }) => (rentalCar as CarFleet).id === car.id,
	);
	const rentalsData = currentRentals
		.map(({ id, customer, status, startDate, endDate }) => {
			const start = new Date(startDate).getDate();
			const end = new Date(endDate).getDate();
			const customerName = (customer as Customer).personalData.fullName
				?.split(' ')
				.at(-1);

			return {
				id,
				customerName,
				status,
				start,
				length: end - start + 1,
			};
		})
		.sort((a, b) => a.start - b.start);

	return rentalsData;
};
