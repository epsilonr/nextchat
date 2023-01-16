import Layout from "../components/Layout"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import axios from 'axios';

export default function login() {
    const { data: session } = useSession();

    const router = useRouter();
    const { redirect } = router.query;

    useEffect(() => {
        if (session?.user) {
            router.push(redirect || '/');
        }
    }, [router, session, redirect]);

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({});

    const getError = (err) =>
        err.response && err.response.data && err.response.data.message
            ? err.response.data.message
            : err.message;

    async function formSubmit(e) {
        e.preventDefault();

        setError({});

        if (!email || !password) {
            setError({ message: "Please fill all the blanks." });
            return;
        }

        try {
            await axios.post("/api/auth/register", { email, name, password });
            const res = await signIn('credentials', { redirect: false, email, password });
            if (res.error)
                setError({ message: res.error });
        } catch (error) {
            setError({ message: getError(error) });
        }
    }

    return (
        <Layout title="Login">
            <Image src="/placeholderlogo.png" width={256} height={192} className="mx-auto mt-32" alt="Logo" />
            {error.message &&
                <div className="rounded-md border-red-900 text-sm border-2 bg-red-700 p-4 max-w-lg mx-auto">{error.error}</div>
            }
            <form onSubmit={formSubmit} className="w-full bg-rimary rounded-lg flex flex-col items-center justify-center p-4 max-w-lg mx-auto">
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder="Email Address" className="py-[6px] px-2 w-full rounded-md border-[2px] border-transparent focus:border-green bg-secondary outline-none mb-4" />
                <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Display Name" className="py-[6px] px-2 w-full rounded-md border-[2px] border-transparent focus:border-green bg-secondary outline-none mb-4" />
                <input onChange={(e) => setPassword(e.target.value)} value={password} type="text" placeholder="Password" className="py-[6px] px-2 w-full rounded-md border-[2px] border-transparent focus:border-green bg-secondary outline-none mb-4" />
                <button type="submit" className="bg-green hover:opacity-80 w-full rounded-md py-2 font-bold">Register</button>
            </form>
        </Layout >
    )
};