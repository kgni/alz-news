import mongoose from 'mongoose';

async function connectDB() {
	if (mongoose.connection.readyState >= 1) {
		// if connection is open return the instance of the databse for cleaner queries
		return mongoose.connection.db;
	}

	return mongoose.connect(process.env.MONGODB_URI);
}

export default connectDB;
