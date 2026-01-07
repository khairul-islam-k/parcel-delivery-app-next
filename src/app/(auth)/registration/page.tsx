"use client";
import React from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import registrationApi from './components/registrationApi';
import { UserRegistration } from '@/types/user';
import Swal from 'sweetalert2';

const Registration = () => {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        // const data = Object.fromEntries(formData.entries());
        const data: UserRegistration = {
            fullName: formData.get("fullName") as string,
            email: formData.get("email") as string,
            photoUrl: formData.get("photoUrl") as string,
            password: formData.get("password") as string
        };

        const result = JSON.parse(await registrationApi(data));
        console.log(result)
        if (result?.insertedId) {
            form.reset();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
            });

        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Already have an account!",
                footer: '<a href="#">Why do I have this issue?</a>'
            });

        }
    }

    return (
        <div className="w-full max-w-md space-y-6">

            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-800">
                    Create Account
                </h1>
                <p className="text-gray-500 mt-2">
                    Register to continue
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        name="fullName"
                        required
                        type="text"
                        placeholder="Your name"
                        className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        required
                        name="email"
                        placeholder="example@email.com"
                        className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none"
                    />
                </div>

                {/* Image URL */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Image URL
                    </label>
                    <input
                        type="url"
                        name="photoUrl"
                        placeholder="https://example.com/profile.jpg"
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
                        required
                        name="password"
                        placeholder="••••••••"
                        className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none"
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full rounded-lg bg-green-600 py-2 text-white font-semibold hover:bg-green-700 transition cursor-pointer"
                >
                    <span className="loader"></span>
                    Register
                </Button>
            </form>

            <p className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link href="/login" className="text-green-600 hover:underline">
                    Login
                </Link>
            </p>

        </div>

    );
};

export default Registration;