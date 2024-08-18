import { Slot, Slottable } from '@radix-ui/react-slot';
import { GoArrowRight } from 'react-icons/go';
import { twMerge } from 'tailwind-merge';

import { buttonVariants } from './button.variants';

import type { ButtonVariantProps } from './button.variants';
import type { ReactNode } from 'react';

type ButtonProps = Readonly<{
	withArrow?: boolean;
	asChild?: boolean;
	children: ReactNode;
}> &
	ButtonVariantProps;

export const Button = ({
	withArrow,
	variant,
	size,
	asChild,
	children,
}: ButtonProps) => {
	const Comp = asChild ? Slot : 'button';

	return (
		<Comp
			className={twMerge(
				buttonVariants({ variant, size }),
				withArrow && 'group',
				withArrow && (variant === 'ghost' ? 'gap-1.5' : 'gap-2.5 pr-8'),
			)}
		>
			<Slottable>{children}</Slottable>
			{withArrow && (
				<GoArrowRight
					size={variant === 'ghost' ? 26 : 28}
					className={twMerge(
						'transition-transform duration-300',
						variant === 'ghost'
							? 'group-hover:translate-x-0.5'
							: 'group-hover:translate-x-1',
					)}
				/>
			)}
		</Comp>
	);
};
