"use client";
// import { signIn } from "next-auth/react";
import { FaGoogle, FaGithub } from "react-icons/fa";

export default function SocialLogin() {
  const handleSocialLogin = (data:string) => {
    console.log("social Login",data);
  }
  return (
    <div className="space-y-3">
      {/* Google */}
      <button
        onClick={() => handleSocialLogin("google")}
        className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 py-2 font-medium hover:bg-gray-50 transition"
      >
        <FaGoogle className="text-red-500 text-lg" />
        Continue with Google
      </button>

      {/* GitHub */}
      <button
        onClick={() => handleSocialLogin("github")}
        className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 py-2 font-medium hover:bg-gray-50 transition"
      >
        <FaGithub className="text-gray-800 text-lg" />
        Continue with GitHub
      </button>
    </div>
  );
}
