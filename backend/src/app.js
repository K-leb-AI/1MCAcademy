import {connectDB} from './config/db.js';
import express from 'express';
import cors from 'cors'
const bodyParser = express.json

// create server app
const app = express();

app.use(cors())
app.use(bodyParser())

export default app