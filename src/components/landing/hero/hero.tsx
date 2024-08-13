import { HeroCheckServices } from './hero-check-services';

export const Hero = () => (
	<section className="h-dvh before:block before:h-2/3 before:bg-hero before:bg-cover before:bg-bottom before:shadow-hero-image sm:before:bg-hero-desktop">
		<div className="-mt-32 flex flex-col items-center gap-6 px-4 sm:-mt-24 sm:px-8 md:gap-8">
			<h1 className="border-b-3 border-primary px-3 pb-2 text-center font-bebas-neue text-7xl text-white xs:text-8xl sm:px-12 sm:pb-4 lg:text-9xl xl:text-10xl">
				ZMIEŃ <span className="text-primary">PERSPEKTYWĘ</span>
			</h1>
			<p className="max-w-4xl text-center text-white sm:text-lg">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua
			</p>
			<HeroCheckServices />
		</div>
	</section>
);
