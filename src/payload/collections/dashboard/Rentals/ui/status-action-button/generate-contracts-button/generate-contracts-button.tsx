import { Button, toast, useAuth } from '@payloadcms/ui';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { ImSpinner9 } from 'react-icons/im';

import {
	generateRentalContracts as generateRentalContractsAction,
	sendRentalContracts as sendRentalContractsAction,
} from '@/actions/dashboard/rentals';
import { downloadFile } from '@/utils/html.utils';

type GenerateContractsButtonProps = Readonly<{
	documentId: string | number;
}>;

export const GenerateContractsButton = ({
	documentId,
}: GenerateContractsButtonProps) => {
	const [fileContent, setFileContent] = useState<string | null>(null);
	const { mutateAsync: generateRentalContracts, isPending: isGeneratePending } =
		useMutation({
			mutationFn: generateRentalContractsAction,
		});
	const {
		mutateAsync: sendRentalContracts,
		isPending: isSendPending,
		isSuccess: isSendSuccess,
	} = useMutation({
		mutationFn: sendRentalContractsAction,
	});
	const { user } = useAuth();

	const handleGenerateContractsClick = async () => {
		const { error, contractId, content } =
			await generateRentalContracts(documentId);

		if (typeof error === 'string') {
			toast.error(error);
			return;
		}

		setFileContent(content);
		downloadFile({ content, fileName: `${contractId}_umowy.zip` });

		toast.success('Wygenerowano');
	};

	const handleSendContractsClick = () => {
		if (!user) {
			toast.error('Unauthorized');
			return;
		}

		if (!fileContent) {
			toast.error('Generate contracts before');
			return;
		}

		return sendRentalContracts({
			userId: user.id,
			rentalId: documentId,
			content: fileContent,
		})
			.then(() =>
				toast.success(
					'The email with the contract files was sent to the customer!',
				),
			)
			.catch(() => toast.error('Something went wrong!'));
	};

	return (
		<div className="flex justify-start">
			<Button
				iconPosition="left"
				icon={isGeneratePending && <ImSpinner9 className="animate-spin" />}
				onClick={handleGenerateContractsClick}
			>
				Generate contracts
			</Button>
			{fileContent && (
				<Button
					className="m-0"
					iconPosition="left"
					disabled={isSendSuccess}
					icon={isSendPending && <ImSpinner9 className="animate-spin" />}
					onClick={handleSendContractsClick}
				>
					{isSendSuccess ? 'Sent' : 'Send to e-mail'}
				</Button>
			)}
		</div>
	);
};
