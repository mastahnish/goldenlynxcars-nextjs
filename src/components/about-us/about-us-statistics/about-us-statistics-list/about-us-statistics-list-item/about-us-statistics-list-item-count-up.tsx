'use client';

import CountUp from 'react-countup';

type AboutUsStatisticsListItemCountUpProps = Readonly<{
	value: number;
}>;

export const AboutUsStatisticsListItemCountUp = ({
	value,
}: AboutUsStatisticsListItemCountUpProps) => <CountUp start={0} end={value} />;
