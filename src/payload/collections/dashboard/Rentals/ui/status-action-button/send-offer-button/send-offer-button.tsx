import { Button, toast } from '@payloadcms/ui';
import { useMutation } from '@tanstack/react-query';
import { ImSpinner9 } from 'react-icons/im';

import { sendRentalOffer as sendRentalOfferAction } from '@/actions/dashboard';

type SendOfferButtonProps = Readonly<{
	documentId: string | number;
}>;

export const SendOfferButton = ({ documentId }: SendOfferButtonProps) => {
	const {
		mutateAsync: sendRentalOffer,
		isPending,
		isSuccess,
	} = useMutation({
		mutationFn: sendRentalOfferAction,
	});

	const handleButtonClick = () =>
		sendRentalOffer(documentId)
			.then(() =>
				toast.success('The email with the offer was sent to the customer!'),
			)
			.catch(() => toast.error('Something went wrong!'));

	return (
		<Button
			iconPosition="left"
			icon={isPending && <ImSpinner9 className="animate-spin" aria-hidden />}
			disabled={isSuccess}
			onClick={handleButtonClick}
		>
			{isSuccess ? 'Offer has been sent' : 'Send offer'}
		</Button>
	);
};
