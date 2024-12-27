interface DownloadFileParams {
	href: string;
	fileName: string;
}

export const downloadFile = ({ href, fileName }: DownloadFileParams) => {
	const link = document.createElement('a');

	link.href = href;
	link.download = fileName;

	link.click();
};
