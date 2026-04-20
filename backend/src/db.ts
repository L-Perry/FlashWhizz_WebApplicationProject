import mongoose from 'mongoose';
import 'dotenv/config';

const connectDB = async (): Promise<void> => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI environment variable is not set');
  }

  await mongoose.connect(uri);
  console.log('MongoDB connected');
};

export default connectDB;
