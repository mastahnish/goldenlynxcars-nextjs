import { GoArrowRight } from 'react-icons/go';

export const HeroCheckServices = () => (
	<a
		href="#services"
		className="group flex h-12 items-center justify-center gap-2.5 rounded-full border border-primary pl-10 pr-8 text-lg font-semibold text-primary max-sm:w-full"
	>
		Sprawdź nasze usługi
		<GoArrowRight
			size={28}
			className="transition-transform duration-300 group-hover:translate-x-1"
		/>
	</a>
);
