"use client";
import { useEffect, useState } from 'react';
import posthog from 'posthog-js';

const getBase = () => process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

export default function EditFlightForm({ flight, onClose, onSaved }) {
  const id = flight?._id;
  const [name, setName] = useState(flight?.name || '');
  const [dailyCost, setDailyCost] = useState(flight?.dailyCost ?? '');
  const [image, setImage] = useState(flight?.image || '');
  const [description, setDescription] = useState(flight?.description || '');
  const [active, setActive] = useState(Boolean(flight?.active ?? true));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    setName(flight?.name || '');
    setDailyCost(flight?.dailyCost ?? '');
    setImage(flight?.image || '');
    setDescription(flight?.description || '');
    setActive(Boolean(flight?.active ?? true));
  }, [flight]);

  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setError(null);
    setUploadingImage(true);
    try {
      const base = getBase();
      const form = new FormData();
      for (const f of files) form.append('images', f);

      const res = await fetch(`${base}/api/upload`, {
        method: 'POST',
        body: form,
        credentials: 'include',
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.message || 'Image upload failed');
      const first = json?.data?.[0]?.url;
      if (first) setImage(first);
    } catch (err) {
      setError(err?.message || 'Image upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const base = getBase();
      const payload = {
        name,
        dailyCost: dailyCost === '' ? undefined : Number(dailyCost),
        image: image || undefined,
        description: description || undefined,
        active,
      };

      // backend expects PUT for updates
      const res = await fetch(`${base}/api/trips/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.message || 'Failed to update flight');

      // PostHog: Track successful flight update
      posthog.capture('flight_updated', {
        flight_id: id,
        flight_name: name,
        daily_cost: dailyCost === '' ? null : Number(dailyCost),
        has_description: !!description,
        has_image: !!image,
        is_active: active,
      });

      if (onSaved) onSaved(json?.data || payload);
      if (onClose) onClose();
    } catch (err) {
      setError(err?.message || 'Failed to update flight');
    } finally {
      setSaving(false);
    }
  };

  if (!flight) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl p-6 w-full max-w-2xl z-10 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Flight</h2>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border border-gray-200 px-4 py-2" required />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Daily cost</label>
            <input type="number" value={dailyCost} onChange={(e) => setDailyCost(e.target.value)} className="w-full rounded-xl border border-gray-200 px-4 py-2" required />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Image (upload)</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="w-full" />
            <div className="mt-2 text-sm text-gray-600">{uploadingImage ? 'Uploading…' : image ? 'Uploaded' : 'No image uploaded'}</div>
            <label className="block text-sm text-gray-700 mb-1 mt-3">Or Image URL (optional)</label>
            <input value={image} onChange={(e) => setImage(e.target.value)} className="w-full rounded-xl border border-gray-200 px-4 py-2" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full rounded-xl border border-gray-200 px-4 py-2 min-h-[100px]" />
          </div>
          <div className="flex items-center gap-2">
            <input id="edit-active" type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} className="h-4 w-4" />
            <label htmlFor="edit-active" className="text-sm text-gray-700">Active</label>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <button type="submit" disabled={saving} className="px-5 py-2 rounded-full bg-green-500 text-white">
              {saving ? 'Saving…' : 'Save'}
            </button>
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-full bg-gray-200">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
