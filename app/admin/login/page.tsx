"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Lock } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return setError("Enter your password.");
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const j = await res.json();
        setError(j.error ?? "Login failed.");
        return;
      }
      router.push("/admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 section-bg-alt">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <p className="font-playfair italic text-2xl font-semibold text-charcoal">
            june <span className="text-rose-500">de belle</span>
          </p>
          <p className="font-sans text-sm text-gray-400 mt-1">Admin Dashboard</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-rose-100 shadow-xl shadow-rose-100/30 p-8">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center">
              <Lock size={24} className="text-rose-500" strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="font-playfair text-xl font-bold text-charcoal text-center mb-1">
            Sign In
          </h1>
          <p className="font-sans text-sm text-gray-400 text-center mb-6">
            Enter your admin password to continue
          </p>

          <form onSubmit={submit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                <p className="font-sans text-sm text-red-600">{error}</p>
              </div>
            )}
            <div className="relative">
              <label className="form-label">Password</label>
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="form-input pr-10"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 bottom-3 text-gray-400 hover:text-gray-600"
              >
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3.5"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center font-sans text-xs text-gray-400 mt-6">
          <a href="/" className="hover:text-rose-500 transition-colors">
            ← Back to landing page
          </a>
        </p>
      </div>
    </div>
  );
}
