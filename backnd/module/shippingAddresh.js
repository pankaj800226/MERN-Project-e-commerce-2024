import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    pincode: {
        type: Number,
        required: true
    },
}, { timestamps: true })

export const userModel = mongoose.model('userAddresh', userSchema);
