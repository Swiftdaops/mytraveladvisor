"use client";
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import AddListingForm from '@/components/AddListingForm';
import EditListingForm from '@/components/EditListingForm';

const getBase = () => process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

export default function AdminListingsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    const base = getBase();
    fetch(`${base}/api/listings`, { credentials: 'include' })
      .then((r) => r.json())
      .then((json) => {
        const data = Array.isArray(json) ? json : (json?.data || []);
        setItems(Array.isArray(data) ? data : []);
      })
      .catch((e) => setError(e?.message || 'Failed to load listings'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((it) => (it.title || '').toLowerCase().includes(q));
  }, [items, query]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold">My Listings</h1>
        <button
          onClick={() => setCreating(true)}
          className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-green-500 hover:bg-green-600 transition text-white font-medium"
        >
          Add Listing
        </button>
      </div>

      <div className="mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search listings…"
          className="w-full max-w-lg rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-gray-300"
        />
      </div>

      {loading && <div className="text-gray-600">Loading…</div>}
      {error && <div className="text-red-600">{error}</div>}

      {!loading && !error && filtered.length === 0 && (
        <div className="text-gray-600">No listings found.</div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((it) => {
          const min = it.accommodationEstimate?.minPerDay;
          const max = it.accommodationEstimate?.maxPerDay;
          return (
            <div key={it._id} className="rounded-2xl border border-gray-200 bg-white p-4">
              {(() => {
                const img = it.images?.[0]?.url || it.image || null;
                return img ? (
                  <div className="h-40 mb-3 overflow-hidden rounded-lg">
                    <img src={img} alt={it.title || 'Listing image'} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="h-40 mb-3 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">No image</div>
                );
              })()}
              <div className="text-sm text-gray-700 mt-2">{it.description || '—'}</div>
              <div className="font-semibold text-gray-900 mt-3">{it.title}</div>
              <div className="text-sm text-gray-600 mt-2">Est. accommodation/day: {min ?? '—'} - {max ?? '—'}</div>
              <div className="mt-4 flex items-center gap-2">
                <button onClick={() => setEditing(it)} className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-sm">Edit</button>
              </div>
            </div>
          );
        })}
      </div>
      {creating && (
        <AddListingForm
          onClose={() => setCreating(false)}
          onCreated={(created) => setItems((prev) => [created, ...prev])}
        />
      )}
      {editing && (
        <EditListingForm
          listing={editing}
          onClose={() => setEditing(null)}
          onSaved={(updated) => setItems((prev) => prev.map((p) => (p._id === (updated._id || editing._id) ? { ...p, ...(updated._id ? updated : updated) } : p)))}
        />
      )}
    </div>
  );
}
