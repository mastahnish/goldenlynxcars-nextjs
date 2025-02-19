type RentalsScheduleTableBodyRowRentalsCellsPaddingProps = Readonly<{
	padding: number;
}>;

export const RentalsScheduleTableBodyRowRentalsCellsPadding = ({
	padding,
}: RentalsScheduleTableBodyRowRentalsCellsPaddingProps) =>
	Array.from({ length: padding }).map((_, i) => <td key={i}></td>);
