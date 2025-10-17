import {connectDB} from './config/db.js';
import express from 'express';
import cors from 'cors'
import router from './routes/auth.routes.js';
const bodyParser = express.json

// create server app
const app = express();

app.use(cors())
app.use(bodyParser())
app.use('/api/v1', router);

export default app