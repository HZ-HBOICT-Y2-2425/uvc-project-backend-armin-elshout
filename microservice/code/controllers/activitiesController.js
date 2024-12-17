import { JSONFilePreset } from "lowdb/node";

const defaultData = { meta: {"tile": "List of activities","date": "December 2024"}, activities: [] };
const db = await JSONFilePreset('db.json', defaultData);
const activities = db.data.activities;

export async function responseActivities(req, res) {
  res.status(200).send(activities);
}

export async function updateActivity(req, res) {
  let id = (activities.length + 1).toString();
  let { title, date, link } = req.body; // Use req.body to read JSON payload
  let time = new Date().toLocaleString();

  if (!title || !date) {
    return res.status(400).send("Title and date are required.");
  }

  let activity = { id: id, title: title, date: date, link: link || "#", createdAt: time };

  console.log("New activity:", activity);

  activities.push(activity);
  await db.write();

  res.status(201).send(activity); // Return the created activity as JSON
}


export async function responseActivityById(req, res) {
  let id = req.params.id;
  let activity = activities.find(activity => activity.id === id);

  if (activity) {
    res.status(200).send(activity);
  } else {
    res.status(404).send('Activity not found');
  }
}


export async function editActivity(req, res) {
  let { id, title, date, link } = req.body; // Extract data from the request body

  if (!id || !title || !date) {
    return res.status(400).send("ID, Title, and Date are required.");
  }

  let activityIndex = activities.findIndex((activity) => activity.id === id);

  if (activityIndex === -1) {
    return res.status(404).send("Activity not found.");
  }

  // Update the activity with the new details
  activities[activityIndex] = {
    ...activities[activityIndex], // Retain existing properties
    title: title,
    date: date,
    link: link || "#", // Default link if not provided
  };

  await db.write(); // Save changes to the database

  res.status(200).send(activities[activityIndex]); // Return the updated activity
}
export async function deleteActivity(req, res) {
  const { id } = req.params; // Extract the ID from the URL parameters

  const activityIndex = activities.findIndex((activity) => activity.id === id);

  if (activityIndex === -1) {
    return res.status(404).send("Activity not found.");
  }

  // Remove the activity from the array
  const deletedActivity = activities.splice(activityIndex, 1)[0];

  await db.write(); // Save changes to the database

  res.status(200).send(deletedActivity); // Return the deleted activity
}

// Add a review for a specific activity
export async function addReview(req, res) {
  const { activityId, reviewer, rating, comment } = req.body;

  // Validate inputs
  if (!activityId || !reviewer || !rating || !comment) {
    return res.status(400).send("Activity ID, reviewer, rating, and comment are required.");
  }

  const activity = activities.find((act) => act.id === activityId);
  if (!activity) return res.status(404).send("Activity not found.");

  const newReview = {
    id: (db.data.reviews.length + 1).toString(),
    activityId,
    reviewer,
    rating: Number(rating), // Ensure rating is numeric
    comment,
    createdAt: new Date().toLocaleString(),
  };

  db.data.reviews.push(newReview);
  await db.write();

  res.status(201).send(newReview);
}

// Get all reviews for a specific activity
export async function getReviewsByActivity(req, res) {
  const { activityId } = req.params;

  const reviews = db.data.reviews.filter((review) => review.activityId === activityId);
  res.status(200).send(reviews);
}

// Delete a review
export async function deleteReview(req, res) {
  const { id } = req.params;

  const reviewIndex = db.data.reviews.findIndex((review) => review.id === id);
  if (reviewIndex === -1) return res.status(404).send("Review not found.");

  const deletedReview = db.data.reviews.splice(reviewIndex, 1)[0];
  await db.write();

  res.status(200).send(deletedReview);
}
