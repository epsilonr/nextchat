import Message from '../../utils/message.model'
import db from '../../utils/db';

export default async function (req, res) {
    if (req.method !== 'GET')
        return;

    await db.connect();
    const messages = await Message.find({}, { _id: 0, updatedAt: 0 });
    await db.disconnect();
    res.status(200).json(messages);
}