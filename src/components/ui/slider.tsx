import * as SliderPrimitive from '@radix-ui/react-slider';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

import type { ComponentPropsWithoutRef, ElementRef } from 'react';

export const Slider = forwardRef<
	ElementRef<typeof SliderPrimitive.Root>,
	ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
	<SliderPrimitive.Root
		ref={ref}
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
));

Slider.displayName = 'Slider';
