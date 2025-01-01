import { variants } from './add-signature-dialog-action-panel-button.styles';

import type { VariantProps } from 'class-variance-authority';

type AddSignatureDialogActionPanelButtonProps = Readonly<{
	label: string;
	onClick?: () => void;
}> &
	VariantProps<typeof variants>;

export const AddSignatureDialogActionPanelButton = ({
	label,
	action,
	...props
}: AddSignatureDialogActionPanelButtonProps) => (
	<button type="button" className={variants({ action })} {...props}>
		{label}
	</button>
);
