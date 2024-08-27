import { ImageMedia } from './image-media';
import { VideoMedia } from './video-media';

import type { MediaProps } from './media.types';

export const Media = (props: MediaProps) => {
	const { resource } = props;

	const isVideo =
		typeof resource === 'object' && resource.mimeType?.includes('video');

	return isVideo ? <VideoMedia {...props} /> : <ImageMedia {...props} />;
};
