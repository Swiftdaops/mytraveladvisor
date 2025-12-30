"use client";
import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Footer from '@/components/Footer';
import posthog from 'posthog-js';

function AdminLoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next') || '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If already logged in, go straight to admin
    const base = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
    fetch(`${base}/api/admin/dashboard`, { credentials: 'include' })
      .then((r) => {
        if (r.ok) router.replace('/admin');
      })
      .catch(() => {});
  }, [router]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const base = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
      const res = await fetch(`${base}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json?.success === false) {
        throw new Error(json?.message || 'Login failed');
      }

      // PostHog: Identify admin user on successful login
      posthog.identify(email, {
        email: email,
        role: 'admin',
      });

      // PostHog: Track successful admin login
      posthog.capture('admin_login_success', {
        email: email,
      });

      router.replace(next);
    } catch (err) {
      // PostHog: Track failed admin login
      posthog.capture('admin_login_failed', {
        email: email,
        error_message: err?.message || 'Login failed',
      });

      setError(err?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-stone-800/60 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-lg">
      <h1 className="text-2xl sm:text-3xl font-serif font-semibold mb-2">Admin Login</h1>
      <p className="text-stone-200/90 text-sm sm:text-base mb-6">Sign in to manage your listings and flights.</p>

      {error && (
        <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-200 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-stone-200 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl bg-stone-900/60 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
            placeholder="mytraveladvisorlite@gmail.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-stone-200 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl bg-stone-900/60 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center px-6 py-3 rounded-full bg-green-500 hover:bg-green-600 disabled:opacity-60 transition font-medium"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-stone-900 text-white flex items-center justify-center px-6 py-16">
        <Suspense fallback={<div className="text-stone-400">Loading...</div>}>
          <AdminLoginForm />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
