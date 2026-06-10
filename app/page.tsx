"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("a@a.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      router.replace("/dashboard");
    }
  }, [router]);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.detail || "Login failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("access_token", data.access_token);

      if (data.user.merchant_id) {
        localStorage.setItem("merchant_id", data.user.merchant_id);
      }
      if (data.user.email) {
        localStorage.setItem("email", data.user.email);
      }
      if (data.user.role){
        localStorage.setItem("role", data.user.role)
      }

      router.replace("/dashboard");

    } catch {
      setError("Unable to connect to server.");

    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
      >
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <Image
          src="/logo.png"
          alt="ThiqaScore Logo"
          width={300}
          height={200}
          className="mb-4 mx-auto"
          /> 
         
        </div>
        {/* Email */}
        <input
          className="mb-4 w-full rounded-lg border border-gray-300 p-3 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          placeholder="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {/* Password */}
        <div className="relative">
          <input
            className="w-full rounded-lg border border-gray-300 p-3 pr-12 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-black"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {/* Forgot password */}
        <div className="mt-2 mb-6 flex justify-end">
          <button
            type="button"
            className="text-sm text-emerald-700 hover:underline"
            onClick={() => router.push("/forgot-password")}
          >
            Forgot password?
          </button>
        </div>
        {error && (
          <div className="mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-700">
            {error}
          </div>
        )}
        {/* Login button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
        {/* Security note */}
        <div className="mt-6 text-center text-sm text-gray-500">
          🔒 Your connection is encrypted and protected.
        </div>
        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-400">
          © 2026 ThiqaScore. All rights reserved.
        </div>
      </form>
    </main>
  );
}