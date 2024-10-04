import { TanStackQueryProvider } from './tanstack-query-provider';

import type { ReactNode } from 'react';

type AppProvidersProps = Readonly<{
	children: ReactNode;
}>;

export const AppProviders = ({ children }: AppProvidersProps) => (
	<TanStackQueryProvider>{children}</TanStackQueryProvider>
);
