/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import config from '@payload-config';
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts';
import React from 'react';

import { importMap } from './admin/importMap';

import { TanStackQueryProvider } from '@/providers/tanstack-query-provider';

import type { ServerFunctionClient } from 'payload';

import './custom.scss';

import '@payloadcms/next/css';

type Args = {
	children: React.ReactNode;
};

// eslint-disable-next-line require-await
const serverFunction: ServerFunctionClient = async function (args) {
	'use server';
	return handleServerFunctions({
		...args,
		config,
		importMap,
	});
};

const Layout = ({ children }: Args) => (
	<RootLayout
		config={config}
		importMap={importMap}
		serverFunction={serverFunction}
	>
		<TanStackQueryProvider>{children}</TanStackQueryProvider>
	</RootLayout>
);

export default Layout;
