'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

import type { ReactNode } from 'react';

type TanStackQueryProviderProps = Readonly<{
	children: ReactNode;
}>;

export const TanStackQueryProvider = ({
	children,
}: TanStackQueryProviderProps) => {
	const [client] = useState(() => new QueryClient());

	return (
		<QueryClientProvider client={client}>
			{children}
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
};
