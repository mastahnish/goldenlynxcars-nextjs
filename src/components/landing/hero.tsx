import { Button } from '@/components/ui/button/button';
import { ArrowRight } from '@/components/ui/icons';

import { getCachedGlobal } from '@/lib/get-cached-global';

export const Hero = async () => {
	const { title, description } = await getCachedGlobal('hero')();

	return (
		<section className="h-dvh before:block before:h-2/3 before:bg-hero before:bg-cover before:bg-bottom before:shadow-hero-image sm:before:bg-hero-desktop">
			<div className="-mt-32 flex flex-col items-center gap-6 px-4 sm:-mt-24 sm:px-8 md:gap-8">
				<h1 className="border-b-3 border-primary px-3 pb-2 text-center font-bebas-neue text-7xl text-white sm:px-12 sm:pb-4 lg:text-9xl xl:text-10xl xs:text-8xl">
					{title.firstPart}{' '}
					<span className="text-primary">{title.secondPart}</span>
				</h1>
				<p className="max-w-4xl text-center text-sm text-white sm:text-lg heroBiggerFont:text-base">
					{description}
				</p>
				<Button icon={ArrowRight} moveIcon asChild>
					<a href="#services">Sprawdź nasze usługi</a>
				</Button>
			</div>
		</section>
	);
};
