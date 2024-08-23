import { cva } from 'class-variance-authority';

import type { VariantProps } from 'class-variance-authority';

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export const buttonVariants = cva(
	'inline-flex items-center justify-center px-10 font-semibold',
	{
		variants: {
			variant: {
				outline: 'rounded-full border transition-colors duration-300',
				ghost: 'px-0',
			},
			color: {
				primary: 'border-primary text-primary hover:bg-primary/5',
				white: 'border-white text-white hover:bg-white/10',
			},
			size: {
				small: 'h-10 px-7',
				medium: 'h-12 text-lg',
				large: 'h-14',
			},
		},
		compoundVariants: [
			{
				variant: 'ghost',
				className: 'h-fit hover:bg-transparent',
			},
		],
		defaultVariants: {
			variant: 'outline',
			color: 'primary',
			size: 'medium',
		},
	},
);
