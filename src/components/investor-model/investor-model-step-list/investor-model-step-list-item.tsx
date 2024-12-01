type InvestorModelStepListItemProps = Readonly<{
	index: number;
	title: string;
	content: string;
}>;

export const InvestorModelStepListItem = ({
	index,
	title,
	content,
}: InvestorModelStepListItemProps) => (
	<div className="space-y-5 text-white">
		<dt className="text-2xl font-bold">
			{index + 1}. {title}
		</dt>
		<dd>{content}</dd>
	</div>
);
