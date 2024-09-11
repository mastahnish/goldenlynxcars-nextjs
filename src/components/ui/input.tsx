import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

import type { ChangeEventHandler } from 'react';

type InputProps = Readonly<{
	type?: 'email' | 'text' | 'tel';
	placeholder: string;
	isError?: boolean;
	fullWidth?: boolean;
	value?: string;
	onChange?: ChangeEventHandler<HTMLInputElement>;
}>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ type = 'text', isError, fullWidth, ...props }, ref) => (
		<input
			ref={ref}
			type={type}
			className={twMerge(
				'h-14 rounded-lg bg-form-field px-5 text-white outline-none placeholder:text-form-field-placeholder',
				isError && 'bg-red-500/60 placeholder:text-white/40 text-white/70',
				fullWidth && 'w-full',
			)}
			{...props}
		/>
	),
);

Input.displayName = 'Input';
