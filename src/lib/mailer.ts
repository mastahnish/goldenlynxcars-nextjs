import { createTransport } from 'nodemailer';

import { env } from './env';

import type { Attachment } from 'nodemailer/lib/mailer';

const transporter = createTransport({
	service: env.EMAIL_SERVICE,
	auth: {
		user: env.EMAIL_USERNAME,
		pass: env.EMAIL_PASSWORD,
	},
});

interface SendMailParams {
	to: string;
	subject: string;
	html: string;
	attachments?: Attachment[];
}

export const sendMail = (params: SendMailParams) =>
	transporter.sendMail({
		from: env.EMAIL_USERNAME,
		...params,
	});
