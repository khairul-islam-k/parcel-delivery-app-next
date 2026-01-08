"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// import { signIn } from "next-auth/react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import Swal from "sweetalert2";

export default function SocialLogin() {
  const { status } = useSession();
  const router = useRouter();
  console.log(status);
  const handleSocialLogin = async (ProviderName: string) => {

    const result = await signIn(ProviderName, { redirect: false });
  
  }

  useEffect(() => {
    if (status === "authenticated") {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Signin Successfully",
        showConfirmButton: false,
        timer: 1500
      });
      router.push("/");
    } 
  }, [status, router])
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
