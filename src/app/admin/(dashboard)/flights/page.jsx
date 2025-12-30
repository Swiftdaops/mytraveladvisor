"use client";
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import EditFlightForm from '@/components/EditFlightForm';
import AddFlightForm from '@/components/AddFlightForm';

const getBase = () => process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

export default function AdminFlightsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const base = getBase();
    fetch(`${base}/api/trips`, { credentials: 'include' })
      .then((r) => r.json())
      .then((json) => {
        const data = Array.isArray(json) ? json : (json?.data || []);
        setItems(Array.isArray(data) ? data : []);
      })
      .catch((e) => setError(e?.message || 'Failed to load flights'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((it) => (it.name || '').toLowerCase().includes(q));
  }, [items, query]);

  return (
    <>
      <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold">My Flights</h1>
        <button
          onClick={() => setCreating(true)}
          className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-green-500 hover:bg-green-600 transition text-white font-medium"
        >
          Add Flight
        </button>
      </div>

      <div className="mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search flights…"
          className="w-full max-w-lg rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-gray-300"
        />
      </div>

      {loading && <div className="text-gray-600">Loading…</div>}
      {error && <div className="text-red-600">{error}</div>}

      {!loading && !error && filtered.length === 0 && (
        <div className="text-gray-600">No flights found.</div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((it) => (
          <div key={it._id} className="rounded-2xl border border-gray-200 bg-white p-4">
            <div className="font-semibold text-gray-900">{it.name}</div>
            <div className="text-sm text-gray-600 mt-1">Daily cost: {it.dailyCost ?? '—'}</div>
            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={() => setEditing(it)}
                className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-sm"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
      </div>
      {editing && (
      <EditFlightForm
        flight={editing}
        onClose={() => setEditing(null)}
        onSaved={(updated) => {
          setItems((prev) => prev.map((p) => (p._id === updated._id ? { ...p, ...updated } : p)));
        }}
      />
      )}
      {creating && (
        <AddFlightForm
          onClose={() => setCreating(false)}
          onCreated={(created) => setItems((prev) => [created, ...prev])}
        />
      )}
    </>
  );
}
