"use client";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import SocialLogin from './components/SocialLogin';
import { signIn } from 'next-auth/react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

const Login = () => {
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        // const name = e.currentTarget.fullName.value;
        const result = await signIn("credentials", { email: data.email, password: data.password, redirect: false })

        if (result?.ok) {
            form.reset();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Signin Successfully",
                showConfirmButton: false,
                timer: 1500
            });
            router.push("/");
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Email or Password is wrong",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        }
    }

    return (
        <div className="w-full max-w-md space-y-6">

            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-800">
                    Signin Account
                </h1>
                <p className="text-gray-500 mt-2">
                    Login to continue
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="example@email.com"
                        className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none"
                    />
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none"
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full rounded-lg bg-green-600 py-2 text-white font-semibold hover:bg-green-700 transition"
                >
                    Log in
                </Button>

            </form>

            <p className="text-center text-sm text-gray-500">
                Don`t have any account?{" "}
                <Link href="/registration" className="text-green-600 hover:underline">
                    Registration
                </Link>
            </p>

            {/* social login */}
            <SocialLogin></SocialLogin>


        </div>
    );
};

export default Login;