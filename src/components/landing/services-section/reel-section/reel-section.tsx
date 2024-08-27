import { Media } from '@/components/common/media/media';
import { Section } from '@/components/common/section';

import type { Media as MediaType } from '@/payload/payload-types';

type ReelSectionProps = Readonly<{
	title: string;
	label?: string | null;
	video: number | MediaType;
}>;

export const ReelSection = ({ title, label, video }: ReelSectionProps) => (
	<Section title={title} label={label} className="lg:hidden">
		<Media
			resource={video}
			width={300}
			height={533}
			className="mx-auto rounded-lg"
		/>
	</Section>
);
