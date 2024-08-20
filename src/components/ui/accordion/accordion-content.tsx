'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

import { useAccordionItemContext } from './accordion-item/accordion-item.context';

import type { ReactNode } from 'react';

type AccordionContentProps = Readonly<{
	bottomSection?: ReactNode;
	children: ReactNode;
}>;

export const AccordionContent = ({
	bottomSection,
	children,
}: AccordionContentProps) => {
	const { isExpanded } = useAccordionItemContext();

	return (
		<AnimatePresence initial={false}>
			{isExpanded && (
				<motion.div
					initial={{ height: 0 }}
					animate={{ height: 'auto' }}
					exit={{ height: 0 }}
					transition={{ type: 'spring', duration: 0.4, bounce: 0 }}
					className="space-y-6"
				>
					<p
						className={twMerge(
							'pt-4 text-neutral-300',
							!bottomSection && 'pb-6',
						)}
					>
						{children}
					</p>
					{bottomSection && <div className="pb-4">{bottomSection}</div>}
				</motion.div>
			)}
		</AnimatePresence>
	);
};
