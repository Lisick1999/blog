export const sanizeContent = (content) =>
	content
		.replaceAll('&nbsp', ' ')
		.replace(/ +/g, ' ')
		.replaceAll('<div><br></div>', '\n')
		.replaceAll('<div>', '\n')
		.replaceAll('</div>', '');
