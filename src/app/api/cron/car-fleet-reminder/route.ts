import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { differenceInDays } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

import { TIMEZONE } from '@/lib/constants';
import { env } from '@/lib/env';
import { sendMail } from '@/lib/mailer';

export const GET = async (request: Request) => {
	const authHeader = request.headers.get('Authorization');

	if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
		return new Response('Unauthorized', {
			status: 401,
		});
	}

	const payload = await getPayloadHMR({ config });
	const { docs: carFleet } = await payload.find({
		collection: 'car-fleet',
		select: {
			name: true,
			reminders: true,
		},
	});

	const currentDate = new Date();
	currentDate.setHours(0, 0, 0, 0);

	for await (const { name, reminders } of carFleet) {
		if (!reminders) {
			continue;
		}

		for await (const reminder of reminders) {
			const reminderDate = new Date(reminder.date);
			reminderDate.setHours(0, 0, 0, 0);

			const difference = differenceInDays(reminderDate, currentDate);

			if (difference !== reminder.daysBeforeNotification) {
				continue;
			}

			const formattedDate = formatInTimeZone(
				reminder.date,
				TIMEZONE,
				'dd.MM.yyyy',
			);

			await sendMail({
				to: env.CONTACT_TARGET_EMAIL,
				subject: `${name}: ${reminder.name}`,
				html: `
					<p>Przypomnienie o czynności dla auta <b>${name}</b>: <u>${reminder.name}</u></p>
					<p>Wiadomość została wysłana z wyprzedzeniem <b>${reminder.daysBeforeNotification} dni</b>, a ostateczny termin jest do <b>${formattedDate}</b>.</p>
				`,
			});
		}
	}

	return Response.json({ success: true });
};
