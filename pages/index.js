import Link from "next/link";
import Layout from "../components/Layout"
import Message from "../components/Message"
import { useSession, signOut } from "next-auth/react"
import { useEffect, useState } from "react";
import io from "socket.io-client"
import axios from "axios"

export async function getStaticProps() {
    const data = await axios.get("http://localhost:3000/api/getmessages");

    if (!data.data)
        return { props: { messages: [] } }

    return { props: { messages: data.data } }
}

let socket;

export default function Home({ messages }) {
    const { data: session } = useSession();
    const [msgs, setMsgs] = useState(messages);
    const [message, setMessage] = useState("");

    useEffect(() => {
        InitializeSocket();
    }, []);

    async function InitializeSocket() {
        await axios.get("/api/socket");

        socket = io();

        socket.on("newIncomingMessage", msg => {
            setMsgs(msgs.push(msg));
            console.log(msgs);
        });
    }

    async function messageSubmit(e) {
        e.preventDefault();

        const res = await axios.post("/api/createmessage", { message, id: session?.user._id });
        if (res && res.data.succ == true) {
            socket.emit("createdMessage", { owner: res.data.owner, body: res.data.body, createdAt: res.data.createdAt });
            setMessage("");
        }
    }

    return (
        <Layout>
            <h1 className="font-bold text-4xl text-center">Hey, there! <span className="text-5xl">👋</span></h1>
            <div className="w-full min-h-[768px] rounded-lg bg-secondary mt-8 flex flex-col">
                <div className="border-b border-gray-800 p-4 font-bold text-xl flex items-center justify-between">
                    <p>Message Box</p>
                    {session?.user.email && <button className="bg-green font-semibold text-base py-1 px-2 rounded-md hover:opacity-80" onClick={signOut}>Logout</button>}
                </div>
                <div className="message-area overflow-y-scroll overflow-x-hidden h-[640px] p-4">
                    {msgs.length >= 1 ? msgs.map(msg => <Message message={msg.body} owner={msg.owner} date={msg.createdAt} key={`${msg.owner}_${msg.createdAt}`} />) : "There is no messages yet."}
                </div>
                <div className="border-t border-gray-800 p-4 flex items-center justify-center gap-x-4">
                    {session?.user.email ? <><form className="w-full" onSubmit={messageSubmit}><input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type Something." className=" w-full py-[6px] px-2 min-w-[256px] rounded-md border-[2px] border-transparent focus:border-green bg-primary outline-none" /></form>
                        <button className="rounded-md font-bold px-4 py-2 bg-green hover:opacity-80" onClick={messageSubmit}>Send</button></> : <><p className="font-semibold text-lg">Not logged yet?</p><Link href="/login" className="bg-green font-bold py-2 px-4 rounded-md hover:opacity-80">Login</Link></>}
                </div>
            </div>
        </Layout>
    )
}