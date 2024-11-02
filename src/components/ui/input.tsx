import { twMerge } from 'tailwind-merge';

import type { ChangeEventHandler } from 'react';

type InputProps = Readonly<{
	type?: 'email' | 'number' | 'text' | 'tel';
	placeholder: string;
	isError?: boolean;
	fullWidth?: boolean;
	value?: string;
	onChange?: ChangeEventHandler<HTMLInputElement>;
}>;

export const Input = ({
	type = 'text',
	isError,
	fullWidth,
	...props
}: InputProps) => (
	<input
		type={type}
		className={twMerge(
			'h-14 rounded-lg bg-form-field px-5 text-white outline-none placeholder:text-form-field-placeholder',
			isError && 'bg-red-500/60 placeholder:text-white/40 text-white/70',
			fullWidth && 'w-full',
		)}
		{...props}
	/>
);
