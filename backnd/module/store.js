import mongoose from 'mongoose'


const StoreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },

    stock: {
        type: Number,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },

    categori: {
        type: String,
        required: true,
    },

    likes: {
        type: Number,
        default: 0,
    },


}, { timestamps: true, })

export const StoreModel = mongoose.model('shop', StoreSchema);

