import { Dialog } from '@ark-ui/react/dialog';
import { Portal } from '@ark-ui/react/portal';

import { AddSignatureDialogContent } from './add-signature-dialog-content/add-signature-dialog-content';

import type { RentalSignatureTarget } from '@/actions/dashboard/rentals';

type AddSignatureDialogProps = Readonly<{
	target: RentalSignatureTarget;
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}>;

export const AddSignatureDialog = ({
	target,
	isOpen,
	setIsOpen,
}: AddSignatureDialogProps) => (
	<Dialog.Root
		open={isOpen}
		onOpenChange={({ open }) => setIsOpen(open)}
		lazyMount
		unmountOnExit
	>
		<Portal>
			<Dialog.Backdrop />
			<Dialog.Positioner className="fixed left-0 top-0 z-110 flex size-full items-center justify-center">
				<AddSignatureDialogContent target={target} />
			</Dialog.Positioner>
		</Portal>
	</Dialog.Root>
);
