import mongoose from 'mongoose';

const connection = {};

async function connect() {
    if (connection.isConnected) {
        console.log('already connected');
        return;
    }
    if (mongoose.connections.length > 0) {
        connection.isConnected = mongoose.connections[0].readyState;
        if (connection.isConnected === 1)
            return;

        await mongoose.disconnect();
    }
    const db = await mongoose.connect("mongodb://127.0.0.1:27017/chatapp");
    connection.isConnected = db.connections[0].readyState;
}

async function disconnect() {
    if (connection.isConnected) {
        await mongoose.disconnect();
        connection.isConnected = false;
    }
}

const db = { connect, disconnect };
export default db;