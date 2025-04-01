import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {

        await mongoose.connect("mongodb://localhost:27017/baseback2");
        console.log("MongoDB connected");

    } catch (error) {
        console.log("error conecting to MongoDb: ", error);
    }
    }
