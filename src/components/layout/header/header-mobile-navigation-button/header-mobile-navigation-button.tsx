'use client';

import { useState } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';

import { HeaderMobileNavigation } from './header-mobile-navigation/header-mobile-navigation';

const lineStyles = twJoin(
	'ease h-0.5 w-6 rounded-full bg-white transition duration-300',
);

export const HeaderMobileNavigationButton = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<button
				type="button"
				aria-label={`${isOpen ? 'Zamknij' : 'Otwórz'} menu`}
				aria-expanded={isOpen}
				onClick={() => setIsOpen(isOpen => !isOpen)}
				className="absolute right-4 top-3 z-110 flex size-8 flex-col items-center justify-center gap-1.5 sm:top-6 lg:hidden"
			>
				<div
					className={twMerge(
						lineStyles,
						isOpen && 'translate-y-2 rotate-45 bg-white',
					)}
				/>
				<div
					className={twMerge(lineStyles, isOpen ? 'opacity-0' : 'opacity-100')}
				/>
				<div
					className={twMerge(
						lineStyles,
						isOpen && '-translate-y-2 -rotate-45 bg-white',
					)}
				/>
			</button>
			{isOpen && <HeaderMobileNavigation close={() => setIsOpen(false)} />}
		</>
	);
};
