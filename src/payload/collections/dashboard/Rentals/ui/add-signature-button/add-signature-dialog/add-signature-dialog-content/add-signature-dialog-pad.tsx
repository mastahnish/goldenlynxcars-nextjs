import { SignaturePad } from '@ark-ui/react/signature-pad';

import type { UseSignaturePadReturn } from '@ark-ui/react/signature-pad';

type AddSignatureDialogPadProps = Readonly<{
	signaturePad: UseSignaturePadReturn;
}>;

export const AddSignatureDialogPad = ({
	signaturePad,
}: AddSignatureDialogPadProps) => (
	<SignaturePad.RootProvider
		value={signaturePad}
		className="flex size-full items-center justify-center bg-white"
	>
		<SignaturePad.Control className="h-64 w-signature-pad border border-solid border-black">
			<SignaturePad.Segment />
			<SignaturePad.Guide className="absolute inset-x-6 bottom-6 border-b-2 border-dashed border-black" />
		</SignaturePad.Control>
	</SignaturePad.RootProvider>
);
