import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { PORT } from '../config.js';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());


app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
