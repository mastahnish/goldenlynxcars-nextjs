import { ContactSection } from '@/components/common/contact-section/contact-section';
import { PageHeader } from '@/components/common/page-header';
import { Button } from '@/components/ui/button/button';
import { ArrowRight } from '@/components/ui/icons';
import { VipTransferProcess } from '@/components/vip-transfer/vip-transfer-process';
import { VipTransferService } from '@/components/vip-transfer/vip-transfer-service';
import { VipTransferWhyWorth } from '@/components/vip-transfer/vip-transfer-why-worth';

const VipTransfersPage = () => (
	<>
		<PageHeader global="vip-transfer-header" />
		<VipTransferService />
		<VipTransferWhyWorth />
		<VipTransferProcess />
		<div className="mx-auto mb-20 mt-6 w-fit">
			<Button icon={ArrowRight} moveIcon>
				Wyślij zapytanie
			</Button>
		</div>
		<ContactSection />
	</>
);

export default VipTransfersPage;