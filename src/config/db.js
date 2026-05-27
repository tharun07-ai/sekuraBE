import mongoose from 'mongoose';

mongoose.set("bufferCommands", false);

const connectDB = async () => {

    try {

        await mongoose.connect(
            process.env.MONGO_URI,
            {
                serverSelectionTimeoutMS: 8000
            }
        );

        console.log(
            "MongoDB Connected"
        );

        return true;

    }

    catch (error) {

        console.warn(
            `MongoDB connection unavailable: ${error.message}`
        );

        return false;

    }

};

export default connectDB;
