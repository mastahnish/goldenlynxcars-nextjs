import { cva } from 'class-variance-authority';

import type { VariantProps } from 'class-variance-authority';

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export const buttonVariants = cva(
	'inline-flex items-center justify-center px-10 font-semibold text-primary',
	{
		variants: {
			variant: {
				outline: 'rounded-full border border-primary',
				ghost: 'px-0',
			},
			size: {
				small: 'h-12 text-lg',
				medium: 'h-14 ',
			},
		},
		compoundVariants: [
			{
				variant: 'ghost',
				className: 'h-fit',
			},
		],
		defaultVariants: {
			variant: 'outline',
			size: 'small',
		},
	},
);
