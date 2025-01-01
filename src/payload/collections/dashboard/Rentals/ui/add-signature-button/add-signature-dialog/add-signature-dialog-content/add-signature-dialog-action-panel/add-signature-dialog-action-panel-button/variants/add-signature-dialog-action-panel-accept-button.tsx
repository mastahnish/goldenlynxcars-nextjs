'use client';

import { useDialogContext } from '@ark-ui/react';
import { toast } from '@payloadcms/ui';
import { useDocumentInfo } from '@payloadcms/ui';

import { AddSignatureDialogActionPanelButton } from '../add-signature-dialog-action-panel-button';

import { setRentalSignature } from '@/actions/dashboard/rentals';

import type { UseSignaturePadReturn } from '@ark-ui/react';

import type { RentalSignatureTarget } from '@/actions/dashboard/rentals';

type AddSignatureDialogActionPanelAcceptButtonProps = Readonly<{
	target: RentalSignatureTarget;
	signaturePad: UseSignaturePadReturn;
}>;

export const AddSignatureDialogActionPanelAcceptButton = ({
	target,
	signaturePad,
}: AddSignatureDialogActionPanelAcceptButtonProps) => {
	const { id } = useDocumentInfo();
	const dialog = useDialogContext();

	if (!id) {
		return null;
	}

	const handleButtonClick = async () => {
		const signature = await signaturePad.getDataUrl('image/png');
		const setRentalSignaturePromise = setRentalSignature({
			rentalId: id,
			target,
			signature,
		});

		dialog.setOpen(false);
		toast.promise(setRentalSignaturePromise, {
			loading: 'Saving...',
			success: 'Signature has been set',
			error: 'Something went wrong',
		});
	};

	return (
		<AddSignatureDialogActionPanelButton
			action="accept"
			label="Akceptuj"
			onClick={handleButtonClick}
		/>
	);
};
