import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { TanStackQueryProvider } from './tanstack-query-provider';

import type { ReactNode } from 'react';

type AppProvidersProps = Readonly<{
	children: ReactNode;
}>;

export const AppProviders = ({ children }: AppProvidersProps) => (
	<NuqsAdapter>
		<TanStackQueryProvider>{children}</TanStackQueryProvider>
	</NuqsAdapter>
);
