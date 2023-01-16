import { Server } from "socket.io";

export default function SocketHandler(req, res) {
    if (res.socket.server.io)
        return res.end();

    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    const onConnection = (socket) => {
        const createdMessage = (msg) => {
            socket.broadcast.emit("newIncomingMessage", msg);
            console.log("Just Happened");
        };

        socket.on("createdMessage", createdMessage);
    };

    io.on("connection", onConnection);

    console.log("Setting up socket");
    res.end();
}