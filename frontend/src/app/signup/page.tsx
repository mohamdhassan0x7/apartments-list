"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/api/auth";
import Link from "next/link";

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError([]);

    try {
      const res = await signUp(formData.name, formData.email, formData.password);
      if(res.statusCode !== 201) {
        const errors = Array.isArray(res.data.message) ? res.data.message : [res.data.message];
        setError(errors);
        return;
      }
      router.push("/signin");
    } catch (err: any) {
      console.error("Sign-up failed", error);
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-gray-600">Sign Up</h2>
        {error.length > 0 && error?.map((err, index: number) => <p key={index} className="text-red-500">{err}</p> )}
        <input className="w-full p-2 mb-2 border rounded text-gray-400" type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input className="w-full p-2 mb-2 border rounded text-gray-400" type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input className="w-full p-2 mb-2 border rounded text-gray-400" type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button className="w-full p-2 bg-blue-500 text-white rounded" type="submit">Sign Up</button>
        <div className="mt-4 text-center">
            <span className="text-gray-600">Already have an account? </span>
            <Link href="/signin" className="text-blue-500 hover:underline">Sign In</Link>
        </div>
      </form>
    </div>
  );
}
