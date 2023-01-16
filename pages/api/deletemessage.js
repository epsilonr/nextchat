import Message from '../../utils/message.model'
import User from '../../utils/user.model'
import db from '../../utils/db';

export default async function (req, res) {
    if (req.method !== 'POST')
        return res.status(401).end();

    const { timestamp, name } = req.body;
    if (!message || !name || id.length < 3)
        return res.status(401).end();
    await db.connect()
    const user = await User.findOne({ _id: id });
    if (!user) {
        await db.disconnect();
        return res.status(401).end();
    }

    const msg = new Message({ body: message, owner: user.name });
    await msg.save();
    await db.disconnect();
    return res.status(201).end();
}