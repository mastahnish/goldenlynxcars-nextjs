import { JSDOM } from 'jsdom';

interface InjectHTMLValuesParams {
	html: string;
	values: Record<string, string>;
}

export const injectHTMLValues = ({ html, values }: InjectHTMLValuesParams) => {
	const dom = new JSDOM(html);

	Object.entries(values).forEach(([className, value]) => {
		const elements = dom.window.document.querySelectorAll(`.${className}`);

		elements.forEach(element => {
			element.innerHTML = value;
		});
	});

	return dom.serialize();
};
