'use client';

import { Button, toast, useDocumentInfo } from '@payloadcms/ui';
import { useMutation } from '@tanstack/react-query';
import { ImSpinner9 } from 'react-icons/im';

import { generateContract as generateContractAction } from '@/actions/dashboard/contracts';
import { downloadFile } from '@/utils/html.utils';

type GenerateContractButtonProps = Readonly<{
	contractName?: 'vehiclePickUp' | 'vehicleRelease' | 'vehicleRental';
}>;

const GenerateContractButton = ({
	contractName,
}: GenerateContractButtonProps) => {
	const { id } = useDocumentInfo();
	const { mutateAsync: generateContract, isPending } = useMutation({
		mutationFn: generateContractAction,
	});

	const handleButtonClick = async () => {
		const options = contractName
			? ({ target: 'settings', id: contractName } as const)
			: ({ target: 'templates', id: String(id) } as const);

		try {
			const href = await generateContract(options);

			downloadFile({ href, fileName: 'example.pdf' });
			toast.success('Generated!');
		} catch {
			toast.error('Something went wrong');
		}
	};

	return (
		<Button
			iconPosition="left"
			icon={isPending && <ImSpinner9 className="animate-spin" aria-hidden />}
			onClick={handleButtonClick}
		>
			Generate
		</Button>
	);
};

export default GenerateContractButton;
