import app from './App';
import * as http from 'http';
import cluster from 'cluster';
import os from 'os';

const PORT = process.env.PORT || 3000;

if (cluster.isMaster) {
	for (let i = 0; i < os.cpus().length; i++) {
		cluster.fork();
	}
} else {
	http.createServer(app).listen(PORT, () => {
		console.log(`Server listening at http://localhost:${PORT}`);
	})
}
