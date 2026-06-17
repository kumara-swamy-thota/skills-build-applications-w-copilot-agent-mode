import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit_db';
const DB_NAME = 'octofit_db';

export async function connectDB(): Promise<void> {
  await mongoose.connect(MONGO_URI, {
    dbName: DB_NAME,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  });
  console.log(`Connected to MongoDB — database: ${DB_NAME}`);
}

export async function disconnectDB(): Promise<void> {
  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
}

export default connectDB;
