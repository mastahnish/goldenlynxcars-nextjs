import Link from 'next/link';

import { Button } from '@/components/ui/button/button';
import { ArrowRight } from '@/components/ui/icons';

import type { ReactNode } from 'react';

type OrderStatusProps = Readonly<{
	title: string;
	children: ReactNode;
}>;

export const OrderStatus = ({ title, children }: OrderStatusProps) => (
	<div className="flex flex-col items-center justify-center gap-10 px-2">
		<h1 className="font-bebas-neue text-4xl font-bold text-primary sm:text-5xl md:text-7xl">
			{title}
		</h1>
		<p className="break-all text-center text-sm text-white sm:text-base md:text-lg">
			{children}
		</p>
		<Button icon={ArrowRight} moveIcon asChild>
			<Link href="/">Wróć do strony głównej</Link>
		</Button>
	</div>
);
