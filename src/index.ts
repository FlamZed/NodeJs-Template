import * as dotenv from 'dotenv'
import { createServer } from 'http';

import api from './core/api';
import express, { Application, Request, Response } from 'express'

const app : Application = express();

const server = createServer(app);

dotenv.config();

const PORT = process.env.PORT || 3000;

app.all('/api/*', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With,content-type',
    );
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use(express.json());
app.use('/api', api);

app.get('/', (_req: Request, res: Response) => {
    res.end('<h1>Server correctly work</h1> <h2>Raccoon Care, 2023</h2>');
});
server.listen(PORT, () => console.log(`Server is listening on port ${PORT}!`));
