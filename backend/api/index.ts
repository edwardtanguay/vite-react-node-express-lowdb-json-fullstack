import * as config from './config';
import { app } from './server';

app.listen(config.getPort(), () => {
	console.log(`AppLearn API is running at http://localhost:${config.getPort()}`);
});