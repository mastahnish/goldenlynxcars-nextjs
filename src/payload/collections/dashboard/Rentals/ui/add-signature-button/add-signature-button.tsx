'use client';

import { Button, useField } from '@payloadcms/ui';
import { useState } from 'react';

import { AddSignatureDialog } from './add-signature-dialog/add-signature-dialog';

import type { RentalSignatureTarget } from '@/actions/dashboard/rentals';

type AddSignatureButtonProps = Readonly<{
	target: RentalSignatureTarget;
}>;

const AddSignatureButton = ({ target }: AddSignatureButtonProps) => {
	const { value } = useField<string>({ path: 'status' });
	const [isOpen, setIsOpen] = useState(false);

	if (value !== 'Confirmed' && value !== 'In Progress') {
		return null;
	}

	return (
		<>
			<Button
				className="block"
				type="button"
				onClick={() => setIsOpen(isOpen => !isOpen)}
			>
				Add {target} signature
			</Button>
			<AddSignatureDialog
				target={target}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
			/>
		</>
	);
};

export default AddSignatureButton;
