import { useSignaturePad } from '@ark-ui/react';
import { Dialog } from '@ark-ui/react/dialog';

import { AddSignatureDialogActionPanel } from './add-signature-dialog-action-panel/add-signature-dialog-action-panel';
import { AddSignatureDialogPad } from './add-signature-dialog-pad';

import type { RentalSignatureTarget } from '@/actions/dashboard/rentals';

type AddSignatureDialogContentProps = Readonly<{
	target: RentalSignatureTarget;
}>;

export const AddSignatureDialogContent = ({
	target,
}: AddSignatureDialogContentProps) => {
	const signaturePad = useSignaturePad({ drawing: { size: 8 } });

	return (
		<Dialog.Content className="flex size-full flex-col">
			<AddSignatureDialogPad signaturePad={signaturePad} />
			<AddSignatureDialogActionPanel
				target={target}
				signaturePad={signaturePad}
			/>
		</Dialog.Content>
	);
};
