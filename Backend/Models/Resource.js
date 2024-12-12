import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    usedQuantity: {
        type: Number,
        default: 0,
    },
    description: {
        type: String,
    },
});

export const Resource = mongoose.model("Resource", resourceSchema);