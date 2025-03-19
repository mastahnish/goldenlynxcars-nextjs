import { Button } from '../ui/button/button';

import { OutlinePhone } from '@/components/ui/icons';

type ContactPhoneButtonProps = Readonly<{
	phoneNumber: string;
}>;

export const ContactPhoneButton = ({
	phoneNumber,
}: ContactPhoneButtonProps) => (
	<Button color="white" size="small" icon={OutlinePhone} asChild>
		<a href={`tel:${phoneNumber.replaceAll(' ', '')}`}>{phoneNumber}</a>
	</Button>
);
