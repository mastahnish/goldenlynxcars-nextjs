import { useMutation } from '@tanstack/react-query';

import { createCheckoutSession as createCheckoutSessionAction } from '@/actions/shop';

export const useCreateCheckoutSession = () => {
	const { mutateAsync: createCheckoutSession } = useMutation({
		mutationFn: createCheckoutSessionAction,
	});

	return { createCheckoutSession };
};
