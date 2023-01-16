import bcryptjs from 'bcryptjs';
import User from '../../../utils/user.model'
import db from '../../../utils/db';

export default async function (req, res) {
    if (req.method !== 'POST') {
        return;
    }

    const { name, email, password } = req.body;
    if (
        !name ||
        !email ||
        !email.includes('@') ||
        !password ||
        password.trim().length < 5
    ) {
        res.status(422).json({
            message: 'Validation error',
        });
        return;
    }

    await db.connect();

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        res.status(422).json({ message: 'User already exists!' });
        await db.disconnect();
        return;
    }

    const newUser = new User({
        name,
        email,
        password: bcryptjs.hashSync(password),
        priv: 0,
    });

    await newUser.save();
    await db.disconnect();
    return res.status(201).end();
}