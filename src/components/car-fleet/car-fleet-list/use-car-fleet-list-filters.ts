import { parseAsString, useQueryStates } from 'nuqs';

export const useCarFleetListFilters = () => {
	const [filters, setFilters] = useQueryStates({
		name: parseAsString,
		brand: parseAsString,
		type: parseAsString,
		price: parseAsString,
		seats: parseAsString,
	});

	return { ...filters, setFilters };
};
