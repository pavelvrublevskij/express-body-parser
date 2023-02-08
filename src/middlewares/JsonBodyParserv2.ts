export const parseJSON = (body) => {
	try {
		JSON.parse(body);
	} catch (error) {
		throw new Error(error);
	}

	return 'OK';
}
