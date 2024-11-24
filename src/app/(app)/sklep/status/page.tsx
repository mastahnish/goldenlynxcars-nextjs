import { redirect } from 'next/navigation';
import { match } from 'ts-pattern';

import { OrderStatusComplete } from '@/components/shop/order-status/order-status-complete';
import { OrderStatusExpired } from '@/components/shop/order-status/order-status-expired';
import { OrderStatusOpen } from '@/components/shop/order-status/order-status-open';

import { getCheckoutSession } from '@/actions/shop';

import type { SearchParams } from '@/types/next.types';

type ShopSuccessPageProps = Readonly<{
	searchParams: SearchParams<'sessionId'>;
}>;

const ShopSuccessPage = async ({ searchParams }: ShopSuccessPageProps) => {
	const { sessionId } = await searchParams;

	if (typeof sessionId !== 'string') {
		redirect('/sklep');
	}

	const { status, payment_intent } = await getCheckoutSession(sessionId);

	if (!status || !payment_intent) {
		redirect('/sklep');
	}

	return (
		<main className="pb-32 pt-48">
			{match(status)
				.with('open', () => <OrderStatusOpen />)
				.with('complete', () => <OrderStatusComplete intent={payment_intent} />)
				.with('expired', () => <OrderStatusExpired />)
				.exhaustive()}
		</main>
	);
};

export default ShopSuccessPage;
