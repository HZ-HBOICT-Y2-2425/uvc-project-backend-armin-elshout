// routes/activities.js
import express from 'express';
import { responseActivities, updateActivity, responseActivityById, editActivity, deleteActivity } from '../controllers/activitiesController.js';
import { addReview, getReviewsByActivity, deleteReview } from '../controllers/activitiesController.js';


const router = express.Router();

router.get('/', (req, res, next) => {
  res.json('hi');
});

router.get('/activities', responseActivities);

router.post('/activities', updateActivity);

router.get('/activities/:id', responseActivityById);

router.put('/activities', editActivity);

router.delete('/activities/:id', deleteActivity);

router.post('/reviews', addReview);

router.get('/activities/:activityId/reviews', getReviewsByActivity);

router.delete('/reviews/:id', deleteReview);



export default router;
