const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        password: { type: String, required: true },
        priv: { type: Number, required: true },
    }, { versionKey: false, timestamps: true });

const user = mongoose.models.users || mongoose.model('users', schema);
module.exports = user;