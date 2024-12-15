import { Button, toast } from '@payloadcms/ui';
import { useMutation } from '@tanstack/react-query';
import { ImSpinner9 } from 'react-icons/im';

import { generateRentalContracts as generateRentalContractsAction } from '@/actions/dashboard';

type GenerateContractsButtonProps = Readonly<{
	documentId: string | number;
}>;

export const GenerateContractsButton = ({
	documentId,
}: GenerateContractsButtonProps) => {
	const {
		mutateAsync: generateRentalContracts,
		isPending,
		isSuccess,
	} = useMutation({
		mutationFn: generateRentalContractsAction,
	});

	const handleButtonClick = () =>
		generateRentalContracts(documentId)
			.then(() => toast.success('Wygenerowano umowy!'))
			.catch(err => {
				if (!(err instanceof Error)) return;

				toast.error(err.message);
			});

	return (
		<Button
			iconPosition="left"
			icon={isPending && <ImSpinner9 className="animate-spin" />}
			onClick={handleButtonClick}
			disabled={isSuccess}
		>
			{isSuccess ? 'Generated' : 'Generate contracts'}
		</Button>
	);
};
