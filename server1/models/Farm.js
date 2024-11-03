import mongoose from "mongoose";

const FarmSchema = new mongoose.Schema({
    farmName: {
        type: String,
        required: true
    },
    area: {
        type: Number,
        required: true
    },
    soilType: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    currentCrop: {
        type: String,
    },
})

export default FarmSchema;