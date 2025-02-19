import type { RentalsData } from '../../rentals-schedule-table-body.utils';

interface RentalColumn {
	start: number;
	totalLength: number;
	rentalsData: RentalsData;
}

export const calculateMerges = (rentalsData: RentalsData) => {
	const columns: RentalColumn[] = [];
	let i = 0;

	while (i < rentalsData.length) {
		const merged: RentalsData = [];

		for (let j = i + 1; j < rentalsData.length; j++) {
			const curr = rentalsData[j];
			const prev = rentalsData[j - 1];
			const toMerge = curr.start === prev.start + prev.length - 1;

			if (!toMerge) {
				break;
			}

			merged.push(curr);
		}

		const rentalData = rentalsData[i];
		const totalLength =
			rentalsData[i].length +
			merged.reduce((acc, curr) => acc + curr.length - 1, 0);

		columns.push({
			totalLength,
			start: rentalData.start,
			rentalsData: [rentalData, ...merged],
		});

		i += 1 + merged.length;
	}

	return columns;
};
