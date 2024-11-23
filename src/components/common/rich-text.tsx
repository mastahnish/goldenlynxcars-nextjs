type RichTextProps = Readonly<{
	content: string;
}>;

export const RichText = ({ content }: RichTextProps) => {
	const lines = content.split('\n');

	return (
		<p className="space-y-4 text-lg text-white">
			{lines.map((line, i) => (
				<span key={i} className="block">
					{line}
				</span>
			))}
		</p>
	);
};
