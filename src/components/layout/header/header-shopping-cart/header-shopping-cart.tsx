'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { HeaderShoppingCartButton } from './header-shopping-cart-button/header-shopping-cart-button';

import { ShoppingCartDrawer } from '@/components/shop/shopping-cart-drawer/shopping-cart-drawer';

export const HeaderShoppingCart = () => {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();

	if (!pathname.startsWith('/sklep')) {
		return null;
	}

	return (
		<>
			<HeaderShoppingCartButton onClick={() => setIsOpen(true)} />
			<ShoppingCartDrawer isOpen={isOpen} onOpenChange={setIsOpen} />
		</>
	);
};
