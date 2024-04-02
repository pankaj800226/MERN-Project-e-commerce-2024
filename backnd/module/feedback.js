import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },

}, { timeseries: true, })

export const CommentModel = mongoose.model('feedback', commentSchema);

