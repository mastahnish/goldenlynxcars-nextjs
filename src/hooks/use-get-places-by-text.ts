import { useQuery } from '@tanstack/react-query';

import { searchPlacesByText } from '@/actions/google-maps-api';

export const useGetPlacesByText = (value: string) => {
	const query = useQuery({
		queryKey: ['places-by-text', value],
		queryFn: () => searchPlacesByText(value),
		enabled: !!value,
	});

	return query;
};
