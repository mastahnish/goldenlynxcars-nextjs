/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import configPromise from '@payload-config';
import { RootLayout } from '@payloadcms/next/layouts';
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import React from 'react';

import { importMap } from './admin/importMap';

import { TanStackQueryProvider } from '@/providers/tanstack-query-provider';

import './custom.scss';

import '@payloadcms/next/css';

type Args = {
	children: React.ReactNode;
};

const Layout = ({ children }: Args) => (
	<RootLayout config={configPromise} importMap={importMap}>
		<TanStackQueryProvider>{children}</TanStackQueryProvider>
	</RootLayout>
);

export default Layout;
