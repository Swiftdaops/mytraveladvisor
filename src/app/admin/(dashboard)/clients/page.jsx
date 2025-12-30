"use client";
import { useEffect, useMemo, useState } from 'react';

const getBase = () => process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

export default function AdminClientsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const base = getBase();
    fetch(`${base}/api/clients`, { credentials: 'include' })
      .then((r) => r.json())
      .then((json) => {
        const data = json?.data || [];
        setItems(Array.isArray(data) ? data : []);
      })
      .catch((e) => setError(e?.message || 'Failed to load clients'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((it) => {
      return (
        (it.name || '').toLowerCase().includes(q) ||
        (it.email || '').toLowerCase().includes(q) ||
        (it.phone || '').toLowerCase().includes(q)
      );
    });
  }, [items, query]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold">My Clients</h1>
      </div>

      <div className="mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search clients…"
          className="w-full max-w-lg rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-gray-300"
        />
      </div>

      {loading && <div className="text-gray-600">Loading…</div>}
      {error && <div className="text-red-600">{error}</div>}

      {!loading && !error && filtered.length === 0 && (
        <div className="text-gray-600">No clients found.</div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((it) => (
          <div key={it._id} className="rounded-2xl border border-gray-200 bg-white p-4">
            <div className="font-semibold text-gray-900">{it.name || '—'}</div>
            <div className="text-sm text-gray-600 mt-1">{it.email}</div>
            {it.phone && <div className="text-sm text-gray-600">{it.phone}</div>}
            <div className="text-xs text-gray-500 mt-2">Status: {it.status || '—'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
