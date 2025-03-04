"use client";
import { useState } from "react";
import { useAuth } from "@/context/auth.context";
import { useRouter } from "next/navigation";
import { signIn } from "@/api/auth";
import Link from "next/link";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null)
  const { login } = useAuth();
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      const res = await signIn(email, password);
      if (res.statusCode !== 201) {
        setError(res.data.message);
        return;
      }
      login(res.data.data.access_token);
      router.refresh();
      router.push("/");
    } catch (error) {
      console.error("Sign-in failed", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSignIn} className="bg-white p-6 shadow-md rounded">
        <div className="text-xl font-bold mb-4 text-gray-600">Sign In</div>
        {error && <div className="text-red-500 text-xs">{error}</div>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border mb-2 rounded text-gray-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border mb-2 rounded text-gray-400"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Sign In
        </button>
        <div className="mt-4 text-center">
            <span className="text-gray-600">Don&apos;t have account? </span>
            <Link href="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
        </div>
      </form>
    </div>
  );
}
