import Link from 'next/link';
import { Drawer } from 'vaul';

import { Button } from '@/components/ui/button/button';

export const ShoppingCartSummaryPayButton = () => (
	<Drawer.Close asChild>
		<Button asChild fullWidth>
			<Link href="/shop/checkout">Zapłać</Link>
		</Button>
	</Drawer.Close>
);
