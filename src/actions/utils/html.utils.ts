import { JSDOM } from 'jsdom';

interface InjectHTMLValuesParams {
	html: string;
	values: Record<string, string | null>;
	images?: Record<string, string>;
}

export const injectHTMLValues = ({
	html,
	values,
	images,
}: InjectHTMLValuesParams) => {
	const dom = new JSDOM(html);

	Object.entries(values).forEach(([className, value]) => {
		if (value) {
			const wrappers = dom.window.document.querySelectorAll(
				`.wrapper__not__${className}`,
			);

			wrappers.forEach(wrapper => {
				wrapper.remove();
			});
		}
	});

	Object.entries(values).forEach(([className, value]) => {
		if (!value || value.startsWith('-')) {
			const wrappers = dom.window.document.querySelectorAll(
				`.wrapper__${className}`,
			);

			wrappers.forEach(wrapper => {
				wrapper.remove();
			});
		}

		if (!value) {
			return;
		}

		const elements = dom.window.document.querySelectorAll(`.${className}`);

		elements.forEach(element => {
			element.innerHTML = value;
		});
	});

	if (images) {
		Object.entries(images).forEach(([className, src]) => {
			const elements = dom.window.document.querySelectorAll<HTMLImageElement>(
				`.${className}`,
			);

			elements.forEach(element => {
				element.src = src;
			});
		});
	}

	return dom.serialize();
};
