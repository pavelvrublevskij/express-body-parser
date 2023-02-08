import express from 'express';
import { Routes } from './routes/Routes';

class App {
	public app: express.Application = express();
	private routes: Routes = new Routes();

	constructor() {
		this.config();
		this.routes.init(this.app);
	}

	private config(): void{
		this.app.use(express.text({ limit: 1000 }));
	}
}

export default new App().app;
