"use client";

import { useAuth } from "@/context/auth.context";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { userRole, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold cursor-pointer" onClick={() => router.push("/")}>
        Apartment Listings
      </h1>
      <div className="flex items-center gap-4">
        {userRole === "admin" && (
          <button
            onClick={() => router.push("/dashboard")}
            className="bg-green-500 px-4 py-2 rounded"
          >
            Add Apartment
          </button>
        )}
        {isAuthenticated ? (
          <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">
            Logout
          </button>
        ) : (
          <button onClick={() => router.push("/signin")} className="bg-white text-blue-600 px-4 py-2 rounded">
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}
