import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
    first_name: string,
    las_name: string,
    email: string,
});

export const userModel = mongoose.model(userCollection, userSchema);