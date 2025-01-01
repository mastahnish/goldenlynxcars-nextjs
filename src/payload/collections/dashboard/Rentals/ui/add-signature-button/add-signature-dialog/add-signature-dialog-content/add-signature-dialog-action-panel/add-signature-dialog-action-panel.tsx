import { Dialog } from '@ark-ui/react';

import { AddSignatureDialogActionPanelButton } from './add-signature-dialog-action-panel-button/add-signature-dialog-action-panel-button';
import { AddSignatureDialogActionPanelAcceptButton } from './add-signature-dialog-action-panel-button/variants/add-signature-dialog-action-panel-accept-button';

import type { UseSignaturePadReturn } from '@ark-ui/react';

import type { RentalSignatureTarget } from '@/actions/dashboard/rentals';

type AddSignatureDialogActionPanelProps = Readonly<{
	target: RentalSignatureTarget;
	signaturePad: UseSignaturePadReturn;
}>;

export const AddSignatureDialogActionPanel = ({
	target,
	signaturePad,
}: AddSignatureDialogActionPanelProps) => (
	<div className="flex shrink-0">
		<AddSignatureDialogActionPanelAcceptButton
			target={target}
			signaturePad={signaturePad}
		/>
		<AddSignatureDialogActionPanelButton
			action="clear"
			label="Wyczyść"
			onClick={() => signaturePad.clear()}
		/>
		<Dialog.CloseTrigger asChild>
			<AddSignatureDialogActionPanelButton action="close" label="Zamknij" />
		</Dialog.CloseTrigger>
	</div>
);
