'use client';

import { useDocumentInfo, useField } from '@payloadcms/ui';
import { match } from 'ts-pattern';

import { GenerateContractsButton } from './generate-contracts-button/generate-contracts-button';
import { SendOfferButton } from './send-offer-button/send-offer-button';

const StatusActionButton = () => {
	const { id } = useDocumentInfo();
	const { value } = useField<string>({ path: 'status' });

	if (!id) {
		return null;
	}

	return match(value)
		.with('Provisional', () => <SendOfferButton documentId={id} />)
		.when(
			value => value === 'Confirmed' || value === 'In Progress',
			() => <GenerateContractsButton documentId={id} />,
		)
		.otherwise(() => null);
};

export default StatusActionButton;
