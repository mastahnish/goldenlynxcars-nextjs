import { twMerge } from 'tailwind-merge';

import { Title } from './title';

type PageHeaderProps = Readonly<{
	title: string;
	label?: string | null;
	primaryContent?: string;
	content: string;
	subContent?: string | null;
}>;

export const PageHeader = ({
	title,
	label,
	content,
	subContent,
}: PageHeaderProps) => (
	<header className="bg-black pb-20 pt-28 sm:pt-40 lg:pt-44">
		<div className="flex flex-col px-4 sm:px-8 lg:mx-auto lg:max-w-8xl lg:flex-row lg:gap-12 2xl:gap-24">
			<div className="relative z-1 shrink-0">
				<Title label={label} gap="small">
					{title}
				</Title>
			</div>
			<div className="space-y-4 text-white sm:space-y-6">
				<p
					className={twMerge(
						'sm:text-lg md:text-xl text-neutral-300',
						subContent && 'font-bold sm:font-semibold text-white',
					)}
				>
					{content}
				</p>
				{subContent && (
					<p className="text-neutral-300 max-sm:text-sm">{subContent}</p>
				)}
			</div>
		</div>
	</header>
);
