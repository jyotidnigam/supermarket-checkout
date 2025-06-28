import mongoose from 'mongoose';
import { seedData } from './mongo-seed.js';


export const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect('mongodb://mongo:27017/supermarket');
        await seedData();

    } catch (error) {
        console.log('MongoDb connection failed', error);
    }
}