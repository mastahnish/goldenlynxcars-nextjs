import * as SliderPrimitive from '@radix-ui/react-slider';
import { twMerge } from 'tailwind-merge';

import type { ComponentPropsWithoutRef } from 'react';

type SliderProps = ComponentPropsWithoutRef<typeof SliderPrimitive.Root>;

export const Slider = ({ className, ...props }: SliderProps) => (
	<SliderPrimitive.Root
		className={twMerge(
			'relative flex touch-none select-none items-center mt-4',
			className,
		)}
		{...props}
	>
		<SliderPrimitive.Track className="relative h-2 grow rounded-full bg-neutral-700">
			<SliderPrimitive.Range className="absolute h-full bg-primary" />
		</SliderPrimitive.Track>
		<SliderPrimitive.Thumb className="block size-5 rounded-full border-2 border-background bg-secondary focus:shadow-slider-thumb-focus focus:shadow-black focus:outline-none" />
	</SliderPrimitive.Root>
);
