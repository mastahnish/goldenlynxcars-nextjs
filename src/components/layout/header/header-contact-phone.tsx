import { MdOutlinePhone } from 'react-icons/md';

export const HeaderContactPhone = () => (
	<a
		href="tel:+48555123456"
		className="hidden h-10 items-center gap-1.5 rounded-full border border-white px-7 font-semibold transition-colors duration-300 hover:bg-white/10 xl:flex"
	>
		<span className="sr-only">Zadzwoń do nas</span>
		+48 555 123 456
		<MdOutlinePhone size={22} aria-hidden />
	</a>
);
