type LocationSelectListItemProps = Readonly<{
	label: string;
	onClick: () => void;
}>;

export const LocationSelectListItem = ({
	label,
	onClick,
}: LocationSelectListItemProps) => (
	<button
		type="button"
		onClick={onClick}
		className="w-full overflow-hidden border-b border-primary px-4 py-2 text-left text-lg group-last-of-type:border-none hover:bg-neutral-700"
	>
		{label}
	</button>
);
