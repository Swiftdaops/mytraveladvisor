"use client";
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        const base = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
        const res = await fetch(`${base}/api/admin/dashboard`, { credentials: 'include' });
        if (!res.ok) throw new Error('Not authenticated');
        if (!cancelled) setChecking(false);
      } catch {
        if (!cancelled) {
          const next = pathname ? `?next=${encodeURIComponent(pathname)}` : '';
          router.replace(`/admin/login${next}`);
        }
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [router, pathname]);

  if (checking) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-gray-600">
        Checking admin session…
      </div>
    );
  }

  return children;
}
