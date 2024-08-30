import type { IconType } from '@/components/ui/icons';

type AboutUsStatisticsListItemProps = Readonly<{
	value: number;
	suffix?: string;
	icon: IconType;
	description: string;
}>;

export const AboutUsStatisticsListItem = ({
	value,
	suffix,
	icon: Icon,
	description,
}: AboutUsStatisticsListItemProps) => (
	<article className="mx-auto size-full max-w-about-us-statistic-card rounded-lg border border-primary/10 bg-semi-black px-4 py-6 text-white">
		<p className="text-center text-6xl font-bold sm:text-7xl">
			{value}
			{suffix && (
				<span className="ml-2 text-3xl font-semibold sm:ml-4 sm:text-4xl">
					{suffix}
				</span>
			)}
		</p>
		<p className="mt-6 flex items-center gap-4 border-t border-primary/10 pt-4 sm:text-lg">
			<Icon aria-hidden size={36} className="shrink-0 text-secondary" />
			{description}
		</p>
	</article>
);
