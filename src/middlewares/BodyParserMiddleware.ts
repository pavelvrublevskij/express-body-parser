import { JsonBodyParser } from './JsonBodyParser';
import { parseJSON } from './JsonBodyParserv2';

const requestBodyParser = (req, res, next) => {
	if (req.headers['content-type'] === 'text/plain') {
		const result = new JsonBodyParser(req.body).parse();
		if (result) {
			res.setHeader('Content-Type', 'text/plain').send(result);
		}
	}

	// next();
};

const requestBodyParserV2 = (req, res, next) => {
	if (req.headers['content-type'] === 'text/plain') {
		const result = parseJSON(req.body);
		if (result) {
			res.send(result);
		}
	}

	// next();
};

export { requestBodyParser, requestBodyParserV2 }
