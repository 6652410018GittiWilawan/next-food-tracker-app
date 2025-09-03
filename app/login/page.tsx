'use client';
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      // Show an error or a message to the user, for example:
      alert("Please enter both email and password.");
      return;
    }
    // Logic for login
    console.log("Login submitted with:", { email, password });
    // Navigate to the dashboard after successful login validation
    window.location.href = "/dashboard";
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-amber-50 p-6">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-amber-800">Welcome back!</h1>
          <p className="mt-2 text-stone-600">Please login to your account.</p>
        </div>
        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div>
            <label className="mb-1 block text-sm font-medium text-stone-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border-2 border-amber-200 bg-amber-50 p-3 text-stone-800 focus:border-amber-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-stone-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border-2 border-amber-200 bg-amber-50 p-3 text-stone-800 focus:border-amber-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-amber-800 px-8 py-3 font-semibold text-white shadow-lg transition duration-300 ease-in-out hover:bg-amber-900"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-stone-600">
          Already have an account?{" "}
          <Link href="/register" passHref>
            <span className="font-semibold text-amber-800 hover:underline">
              Register here
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
