import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config({ path: 'variables.env' });
import activitiesRouter from './routes/activities.js';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));  

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', activitiesRouter); 

app.set('port', process.env.PORT || 3011);
const server = app.listen(app.get('port'), () => {
  console.log(`🍿 Express running → PORT ${server.address().port}`);
});
