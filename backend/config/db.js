import mongoose from 'mongoose';
import pc from 'picocolors';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(pc.bold(pc.green(`🚀 MongoDB Connected: ${conn.connection.host}`)));
  } catch (error) {
    console.error(pc.bold(pc.red(`❌ MongoDB Connection Error: ${error.message}`)));
    process.exit(1);
  }
};

export default connectDB;
