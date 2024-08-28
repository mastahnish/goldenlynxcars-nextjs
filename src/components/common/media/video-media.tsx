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
			autoPlay
			controls
			muted
			playsInline
			width={width}
			height={height}
			className={className}
		>
			<source src={src} />
		</video>
	);
};
