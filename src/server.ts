import cors from 'cors';
import express, { json } from 'express';
import router from './routers/routes';

const PORT = 3000;
const hostname = 'localhost';

const app = express();

app.use(json());

app.use(cors())

app.use(router);

app.listen(PORT, hostname, () => console.log(
  `Server running at http://${hostname}:${PORT}`
))