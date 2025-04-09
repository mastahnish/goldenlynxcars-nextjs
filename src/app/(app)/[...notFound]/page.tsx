import Link from 'next/link';

import { Container } from '@/components/common/container';
import { Button } from '@/components/ui/button/button';
import { ArrowRight } from '@/components/ui/icons';

import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: '404',
};

const NotFoundPage = () => (
	<Container className="flex flex-col items-center justify-center gap-10 pb-24 pt-20 sm:pt-32 lg:pt-44">
		<h1 className="font-bebas-neue text-7xl text-primary xs:text-8xl md:text-9xl">
			404
		</h1>
		<p className="text-lg font-light text-white">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
			tempor incididunt ut labore et dolore magna aliqua
		</p>
		<div className="md:w-80">
			<Button icon={ArrowRight} moveIcon asChild fullWidth>
				<Link href="/">Powrót</Link>
			</Button>
		</div>
	</Container>
);

export default NotFoundPage;
