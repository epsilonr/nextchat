import Layout from "../components/Layout"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from 'next/router';
import { useState, useEffect } from "react"
import { signIn, useSession } from 'next-auth/react';

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
            const res = await signIn("credentials", { redirect: false, email, password });
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
                <input onChange={(e) => setPassword(e.target.value)} value={password} type="text" placeholder="Password" className="py-[6px] px-2 w-full rounded-md border-[2px] border-transparent focus:border-green bg-secondary outline-none mb-4" />
                <button type="submit" className="bg-green hover:opacity-80 w-full rounded-md py-2 font-bold">Login</button>
            </form>
            <div className="flex justify-center items-center mt-2 px-2 max-w-lg mx-auto">
                <div className="h-[2px] rounded bg-secondary flex-1"></div>
                <p className="text-secondary font-bold px-2">OR</p>
                <div className="h-[2px] rounded bg-secondary flex-1"></div>
            </div>
            <div className="flex justify-between items-center mt-2 px-2 max-w-lg mx-auto">
                <p>Don't have an account?</p>
                <Link href="/register" className="underline text-red-500 font-inter">Register</Link>
            </div>
        </Layout >
    )
};