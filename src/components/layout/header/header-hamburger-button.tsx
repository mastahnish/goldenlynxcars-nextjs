import { twJoin } from 'tailwind-merge';

const lineStyles = twJoin('h-0.5 w-6 rounded-full bg-white');

export const HeaderHamburgerButton = () => (
	<button
		type="button"
		className="flex size-8 flex-col items-center justify-center gap-1.5 sm:hidden"
	>
		<div className={lineStyles} />
		<div className={lineStyles} />
		<div className={lineStyles} />
	</button>
);
