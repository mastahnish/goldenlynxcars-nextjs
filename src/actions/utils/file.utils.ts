import AdmZip from 'adm-zip';

export const sendFile = (buffer: Buffer) =>
	`data:application/octet-stream;base64,${buffer.toString('base64')}`;

interface SendZipFile {
	name: string;
	buffer: Buffer;
}

export const sendZip = (files: SendZipFile[]) => {
	const zip = new AdmZip();

	files.forEach(({ name, buffer }) => {
		zip.addFile(name, buffer);
	});

	return sendFile(zip.toBuffer());
};
