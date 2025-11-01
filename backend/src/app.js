import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import router from './routes/auth.routes.js';

// create server app
const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1', router);

export default app;