'use client';

import { useEffect } from 'react';

import { OrderStatus } from './order-status';

import { useCart } from '@/hooks/use-cart';
import { getPaymentId } from '@/utils/shop.utils';

import type Stripe from 'stripe';

type OrderStatusCompleteProps = Readonly<{
	intent: string | Stripe.PaymentIntent;
}>;

export const OrderStatusComplete = ({ intent }: OrderStatusCompleteProps) => {
	const { clearCart } = useCart();

	useEffect(clearCart, [clearCart]);

	return (
		<OrderStatus title="Zamówienie zostało złożone!">
			Twoje zamówienie o numerze{' '}
			<span className="break-words text-primary">#{getPaymentId(intent)}</span>{' '}
			zostało pomyślnie złożone!
		</OrderStatus>
	);
};
