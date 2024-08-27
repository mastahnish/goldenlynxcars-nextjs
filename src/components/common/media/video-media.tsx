import { env } from '@/lib/env';

import type { MediaProps } from './media.types';

export const VideoMedia = ({
	resource,
	width,
	height,
	className,
}: MediaProps) => {
	if (typeof resource !== 'object') {
		return null;
	}

	const src = `${env.NEXT_PUBLIC_SERVER_BASE_URL}${resource.url}`;

	return (
		<video
			width={width}
			height={height}
			controls
			playsInline
			className={className}
		>
			<source src={src} />
		</video>
	);
};
