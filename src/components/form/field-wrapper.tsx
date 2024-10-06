import { twMerge } from 'tailwind-merge';

import type { ReactNode } from 'react';

type FieldWrapperProps = Readonly<{
	fullWidth?: boolean;
	error?: string;
	children: ReactNode;
}>;

export const FieldWrapper = ({
	fullWidth,
	error,
	children,
}: FieldWrapperProps) => (
	<div className={twMerge(fullWidth && 'w-full')}>
		{children}
		{error && <p className="mt-1.5 text-red-500">{error}</p>}
	</div>
);
