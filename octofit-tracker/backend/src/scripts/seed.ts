/**
 * Seed the octofit_db database with test data
 *
 * Usage: npx ts-node src/scripts/seed.ts
 * This script clears existing data and inserts realistic sample records
 * for users, teams, activities, leaderboard, and workouts collections.
 */

import { connectDB, disconnectDB } from '../config/database';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Workout from '../models/Workout';

async function seed() {
  await connectDB();

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({}),
  ]);
  console.log('Cleared existing collections');

  // ---- Users ----
  const users = await User.insertMany([
    { username: 'mona_octocat', email: 'mona@octofit.dev', password: 'hashed_pw_1' },
    { username: 'hubot_runner', email: 'hubot@octofit.dev', password: 'hashed_pw_2' },
    { username: 'codercat', email: 'coder@octofit.dev', password: 'hashed_pw_3' },
    { username: 'devdash', email: 'devdash@octofit.dev', password: 'hashed_pw_4' },
    { username: 'octobyte', email: 'octobyte@octofit.dev', password: 'hashed_pw_5' },
  ]);
  console.log(`Inserted ${users.length} users`);

  // --- Teams ---
  const teams = await Team.insertMany([
    { name: 'Octo Sprinters', members: [users[0]._id, users[1]._id] },
    { name: 'Code Runners', members: [users[2]._id, users[3]._id, users[4]._id] },
  ]);
  console.log(`Inserted ${teams.length} teams`);

  // --- Activities ---
  const activities = await Activity.insertMany([
    { user: users[0]._id, activityType: 'Running', duration: 30, date: new Date('2026-06-01') },
    { user: users[1]._id, activityType: 'Cycling', duration: 45, date: new Date('2026-06-02') },
    { user: users[2]._id, activityType: 'Swimming', duration: 60, date: new Date('2026-06-03') },
    { user: users[3]._id, activityType: 'Yoga', duration: 40, date: new Date('2026-06-04') },
    { user: users[4]._id, activityType: 'Weight Training', duration: 50, date: new Date('2026-06-05') },
    { user: users[0]._id, activityType: 'Running', duration: 25, date: new Date('2026-06-08') },
    { user: users[2]._id, activityType: 'Cycling', duration: 35, date: new Date('2026-06-09') },
  ]);
  console.log(`Inserted ${activities.length} activities`);

  // --- Leaderboard ---
  const leaderboard = await Leaderboard.insertMany([
    { user: users[0]._id, score: 320 },
    { user: users[1]._id, score: 270 },
    { user: users[2]._id, score: 410 },
    { user: users[3]._id, score: 190 },
    { user: users[4]._id, score: 355 },
  ]);
  console.log(`Inserted ${leaderboard.length} leaderboard entries`);

  // --- Workouts ---
  const workouts = await Workout.insertMany([
    {
      name: 'Morning Boost',
      description: 'Quick energising morning routine',
      exercises: ['Jumping Jacks', 'Push-ups', 'High Knees', 'Plank'],
      difficulty: 'easy',
    },
    {
      name: 'Cardio Blast',
      description: 'High-intensity cardio session',
      exercises: ['Burpees', 'Sprint Intervals', 'Jump Rope', 'Mountain Climbers'],
      difficulty: 'hard',
    },
    {
      name: 'Core Strength',
      description: 'Build a stronger core',
      exercises: ['Crunches', 'Leg Raises', 'Russian Twists', 'Plank Hold'],
      difficulty: 'medium',
    },
    {
      name: 'Full Body Circuit',
      description: 'Balanced full body workout',
      exercises: ['Squats', 'Lunges', 'Dumbbell Rows', 'Shoulder Press', 'Deadlifts'],
      difficulty: 'medium',
    },
    {
      name: 'Flex & Flow',
      description: 'Yoga-inspired flexibility and balance',
      exercises: ['Sun Salutation', 'Warrior II', 'Downward Dog', 'Child\'s Pose'],
      difficulty: 'easy',
    },
  ]);
  console.log(`Inserted ${workouts.length} workouts`);

  console.log('\n✓ octofit_db seeded successfully');
  await disconnectDB();
}

seed().catch((err) => {
  console.error('Seed error:', err);
  disconnectDB();
  process.exit(1);
});
