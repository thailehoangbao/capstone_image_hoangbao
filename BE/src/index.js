import express from 'express';
import cors from 'cors';
import rootRoute from './routes/rootRoutes.js';


const app = express();
app.use(express.static("."));
app.use(express.json());
app.use(cors());

app.listen(8082);
app.use('/api',rootRoute);