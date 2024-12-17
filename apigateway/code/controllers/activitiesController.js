import { Low, JSONFile } from 'lowdb';
import path from 'path';

const dbFile = path.resolve('db.json');
const adapter = new JSONFile(dbFile);

const db = new Low(adapter);

const defaultData = { meta: { title: "List of Activities", date: "December 2024" }, activities: [] };

// Read or initialize the database
await db.read();
db.data ||= defaultData;

// Get all activities
export async function responseActivities(req, res) {
  await db.read();
  res.status(200).json(db.data.activities);
}

// Add a new activity
export async function updateActivity(req, res) {
  const { name, description, date } = req.body;

  if (!name || !date) {
    return res.status(400).json({ error: 'Name and date are required' });
  }

  // Create new activity and add it to the activities array
  const activity = {
    id: db.data.activities.length + 1,  // Auto-increment ID
    name,
    description,
    date,
    time: new Date().toLocaleString(),
  };

  db.data.activities.push(activity);
  await db.write();

  res.status(201).json(activity);  // Return the newly created activity
}

// Get an activity by ID
export async function responseActivityById(req, res) {
  const { id } = req.params;
  await db.read();

  const activity = db.data.activities.find((activity) => activity.id === parseInt(id));

  if (activity) {
    res.status(200).json(activity);
  } else {
    res.status(404).json({ message: 'Activity not found' });
  }
}
