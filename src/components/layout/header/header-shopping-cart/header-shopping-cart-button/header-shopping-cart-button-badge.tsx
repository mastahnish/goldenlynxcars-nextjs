type HeaderShoppingCartButtonBadgeProps = Readonly<{
	value: number;
}>;

export const HeaderShoppingCartButtonBadge = ({
	value,
}: HeaderShoppingCartButtonBadgeProps) => (
	<span className="absolute -right-1 bottom-0 flex size-5 items-center justify-center rounded-full bg-primary text-sm text-black">
		{value}
	</span>
);
