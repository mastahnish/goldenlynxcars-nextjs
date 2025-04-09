import { ContactSection } from '@/components/common/contact-section/contact-section';
import { PageHeader } from '@/components/common/page-header';
import { Button } from '@/components/ui/button/button';
import { ArrowRight } from '@/components/ui/icons';
import { VipTransferProcess } from '@/components/vip-transfer/vip-transfer-process';
import { VipTransferService } from '@/components/vip-transfer/vip-transfer-service';
import { VipTransferWhyWorth } from '@/components/vip-transfer/vip-transfer-why-worth';

import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Transfery VIP',
};

const VipTransfersPage = () => (
	<>
		<PageHeader global="vip-transfer-header" />
		<VipTransferService />
		<VipTransferWhyWorth />
		<VipTransferProcess />
		<div className="mx-auto mb-20 mt-6 w-fit">
			<Button icon={ArrowRight} moveIcon asChild>
				<a href="#contact-section">Wyślij zapytanie</a>
			</Button>
		</div>
		<ContactSection />
	</>
);

export default VipTransfersPage;
