import { Slot, Slottable } from '@radix-ui/react-slot';
import { twMerge } from 'tailwind-merge';

import { buttonVariants } from './button.variants';

import type { IconType } from '../icons';
import type { ButtonVariantProps } from './button.variants';
import type { ReactNode } from 'react';

type ButtonProps = Readonly<{
	type?: 'button' | 'submit';
	asChild?: boolean;
	icon?: IconType;
	moveIcon?: boolean;
	fullWidth?: boolean;
	children: ReactNode;
}> &
	ButtonVariantProps;

export const Button = ({
	type = 'button',
	variant,
	color,
	size,
	asChild,
	icon: Icon,
	moveIcon,
	fullWidth,
	children,
}: ButtonProps) => {
	const Comp = asChild ? Slot : 'button';

	return (
		<Comp
			className={twMerge(
				buttonVariants({ variant, color, size }),
				moveIcon && 'group',
				fullWidth && 'w-full',
				Icon && (variant === 'ghost' ? 'gap-1.5' : 'gap-2.5'),
			)}
			{...(Comp === 'button' && { type })}
		>
			<Slottable>{children}</Slottable>
			{Icon && (
				<Icon
					size={size === 'small' ? 22 : variant === 'ghost' ? 26 : 28}
					className={twMerge(
						moveIcon && [
							'transition-transform duration-300',
							variant === 'ghost'
								? 'group-hover:translate-x-0.5'
								: 'group-hover:translate-x-1',
						],
					)}
				/>
			)}
		</Comp>
	);
};
