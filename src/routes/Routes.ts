import { ParseController } from '../controllers/ParseController';
import { requestBodyParser } from '../middlewares/BodyParserMiddleware';

export class Routes {

	public parseController: ParseController = new ParseController()

	public init(app): void {
		app.route('/parse')
			.post(requestBodyParser, this.parseController.postJsonBody);
	}
}
