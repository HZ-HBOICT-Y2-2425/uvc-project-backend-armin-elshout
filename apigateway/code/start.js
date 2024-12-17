import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import activitiesRouter from './routes/activities.js';

// Initialize environment variables
dotenv.config({ path: 'variables.env' });

// Create an Express app
const app = express();

// CORS middleware: allow requests from localhost:5173 (your frontend)
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware for parsing JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register the API routes for activities
app.use('/api', activitiesRouter);

// Set the port for the server to listen on
app.set('port', process.env.PORT || 3010);
const server = app.listen(app.get('port'), () => {
  console.log(`🍿 Express running → PORT ${server.address().port}`);
});
