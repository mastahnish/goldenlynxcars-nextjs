import { createSafeContext } from '@/lib/create-safe-context';

import type { ItemValue } from '../accordion.types';

interface AccordionItemContextValue {
	value: ItemValue;
	isExpanded: boolean;
}

export const [useAccordionItemContext, AccordionItemContextProvider] =
	createSafeContext<AccordionItemContextValue>();
