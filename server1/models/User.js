import mongoose from "mongoose";
import FarmSchema from "./Farm.js";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false // not req for google oauth
    },
    googleId: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    farms: [FarmSchema]
})

const User = mongoose.model('UserSchema', UserSchema);
export default User;