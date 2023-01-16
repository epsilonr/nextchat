import mongoose from 'mongoose';

const schema = new mongoose.Schema(
    {
        body: { type: String, required: true },
        owner: { type: String, required: true },
    }, { versionKey: false, timestamps: true }
);

const msg = mongoose.models.messages || mongoose.model('messages', schema);
module.exports = msg;