import { twMerge } from 'tailwind-merge';

import { env } from '@/lib/env';

import type { MediaProps } from './media.types';

export const VideoMedia = ({
	resource,
	fill,
	width,
	height,
	autoPlay,
	muted,
	className,
}: MediaProps) => {
	if (typeof resource !== 'object') {
		return null;
	}

	const src = `${env.NEXT_PUBLIC_SERVER_BASE_URL}${resource.url}`;

	return (
		<video
			autoPlay={autoPlay}
			controls
			muted={muted}
			playsInline
			width={width}
			height={height}
			className={twMerge(fill && 'absolute w-full h-full inset-0', className)}
		>
			<source src={src} />
		</video>
	);
};
