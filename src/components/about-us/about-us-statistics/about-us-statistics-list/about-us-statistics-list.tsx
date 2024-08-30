import { BiLike } from 'react-icons/bi';
import { LiaCarAltSolid } from 'react-icons/lia';
import { MdOutlinePeopleAlt } from 'react-icons/md';

import { AboutUsStatisticsListItem } from './about-us-statistics-list-item';

type AboutUsStatisticsListProps = Readonly<{
	clients: number;
	cars: number;
	kilometers: number;
}>;

export const AboutUsStatisticsList = ({
	clients,
	cars,
	kilometers,
}: AboutUsStatisticsListProps) => (
	<ul className="grid grid-cols-1 gap-4 lg:grid-cols-3">
		<li>
			<AboutUsStatisticsListItem
				value={clients}
				icon={MdOutlinePeopleAlt}
				description="Tylu klientów nam zaufało"
			/>
		</li>
		<li>
			<AboutUsStatisticsListItem
				value={cars}
				icon={LiaCarAltSolid}
				description="Liczba samochód w naszej flocie"
			/>
		</li>
		<li>
			<AboutUsStatisticsListItem
				value={kilometers}
				suffix="tyś"
				icon={BiLike}
				description="Kilometry przejechane naszymi samochodami"
			/>
		</li>
	</ul>
);
