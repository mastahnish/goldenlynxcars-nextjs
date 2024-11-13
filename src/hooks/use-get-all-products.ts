import { useQuery } from '@tanstack/react-query';

import * as shop from '@/lib/shop';

export const useGetAllProducts = () => {
	const query = useQuery({
		queryKey: ['shop-products'],
		queryFn: () => shop.getAllProducts(),
	});

	return query;
};
