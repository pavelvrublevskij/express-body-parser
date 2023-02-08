import { Request, Response } from 'express';

export class ParseController{

	public postJsonBody(req: Request, res: Response) {
		// res.setHeader("Content-Type", "application/json").send(req.body);
	}
}
