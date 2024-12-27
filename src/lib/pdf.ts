interface GeneratePDFParams {
	html: string;
	templates?: { header?: string; footer?: string };
}

const createBrowser = async () => {
	/* if (env.NODE_ENV === 'production') {
		const puppeteer = await import('puppeteer-core');

		return puppeteer.launch({
			args: chromium.args,
			defaultViewport: chromium.defaultViewport,
			executablePath: await chromium.executablePath(env.CHEROMIUM_URL),
			headless: chromium.headless,
		});
	} */

	const puppeteer = await import('puppeteer');

	return puppeteer.launch();
};

export const generatePDF = async ({ html, templates }: GeneratePDFParams) => {
	const browser = await createBrowser();
	const page = await browser.newPage();

	await page.setContent(html, {
		waitUntil: 'domcontentloaded',
	});
	await page.emulateMediaType('screen');

	const data = await page.pdf({
		format: 'A4',
		displayHeaderFooter: !!templates,
		headerTemplate: templates?.header,
		footerTemplate: templates?.footer,
	});
	await browser.close();

	return Buffer.from(data);
};
