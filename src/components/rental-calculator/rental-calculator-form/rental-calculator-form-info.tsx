import { twMerge } from 'tailwind-merge';

type RentalCalculatorFormInfoProps = Readonly<{
	title: string;
	content: number | string;
	suffix: string;
	size?: 'sm' | 'md';
}>;

export const RentalCalculatorFormInfo = ({
	title,
	content,
	suffix,
	size = 'md',
}: RentalCalculatorFormInfoProps) => (
	<div className="space-y-2">
		<h3
			className={twMerge(
				'font-bold text-white',
				size === 'sm' && 'text-xl',
				size === 'md' && 'text-2xl',
			)}
		>
			{title}
		</h3>
		<p
			className={twMerge(
				'font-bold text-primary',
				size === 'sm' && 'text-4xl',
				size === 'md' && 'text-5xl',
			)}
		>
			{content}
			<span
				className={twMerge(
					'text-2xl font-semibold',
					size === 'sm' && 'text-xl',
					size === 'md' && 'text-2xl',
				)}
			>
				{' '}
				{suffix}
			</span>
		</p>
	</div>
);
