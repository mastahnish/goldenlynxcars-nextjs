import { Button, toast } from '@payloadcms/ui';
import { useMutation } from '@tanstack/react-query';
import { ImSpinner9 } from 'react-icons/im';

import { generateRentalContracts as generateRentalContractsAction } from '@/actions/dashboard/rentals';
import { downloadFile } from '@/utils/html.utils';

type GenerateContractsButtonProps = Readonly<{
	documentId: string | number;
}>;

export const GenerateContractsButton = ({
	documentId,
}: GenerateContractsButtonProps) => {
	const { mutateAsync: generateRentalContracts, isPending } = useMutation({
		mutationFn: generateRentalContractsAction,
	});

	const handleButtonClick = async () => {
		const { error, contractId, href } =
			await generateRentalContracts(documentId);

		if (typeof error === 'string') {
			toast.error(error);
			return;
		}

		downloadFile({ href, fileName: `${contractId}_umowy.zip` });
		toast.success('Wygenerowano');
	};

	return (
		<Button
			iconPosition="left"
			icon={isPending && <ImSpinner9 className="animate-spin" />}
			onClick={handleButtonClick}
		>
			Generate contracts
		</Button>
	);
};
