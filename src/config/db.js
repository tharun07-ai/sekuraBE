import mongoose from 'mongoose';

mongoose.set("bufferCommands", false);

export function isDatabaseConnected() {
    return mongoose.connection.readyState === 1;
}

export function requireDatabaseConnection(req, res, next) {
    if (!isDatabaseConnected()) {
        return res.status(503).json({
            message: "Database connection unavailable. Check MongoDB Atlas network access and credentials."
        });
    }

    return next();
}

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
