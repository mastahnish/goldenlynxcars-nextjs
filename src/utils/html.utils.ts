interface DownloadFileParams {
	content: string;
	fileName: string;
}

export const downloadFile = ({ content, fileName }: DownloadFileParams) => {
	const link = document.createElement('a');

	link.href = `data:application/octet-stream;base64,${content}`;
	link.download = fileName;

	link.click();
};
