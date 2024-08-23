import { Button } from '../ui/button/button';

import { OutlinePhone } from '@/components/ui/icons';

export const ContactPhoneButton = () => (
	<Button color="white" size="small" icon={OutlinePhone} asChild>
		<a href="tel:+48555123456">+48 555 123 456</a>
	</Button>
);
