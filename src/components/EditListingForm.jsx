"use client";
import { useEffect, useState } from 'react';
import posthog from 'posthog-js';

const getBase = () => process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

export default function EditListingForm({ listing, onClose, onSaved }) {
  const id = listing?._id;
  const [title, setTitle] = useState(listing?.title || '');
  const [description, setDescription] = useState(listing?.description || '');
  const [minPerDay, setMinPerDay] = useState(listing?.accommodationEstimate?.minPerDay ?? '');
  const [maxPerDay, setMaxPerDay] = useState(listing?.accommodationEstimate?.maxPerDay ?? '');
  const [imageUrl, setImageUrl] = useState(listing?.images?.[0]?.url || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    setTitle(listing?.title || '');
    setDescription(listing?.description || '');
    setMinPerDay(listing?.accommodationEstimate?.minPerDay ?? '');
    setMaxPerDay(listing?.accommodationEstimate?.maxPerDay ?? '');
    setImageUrl(listing?.images?.[0]?.url || '');
  }, [listing]);

  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setError(null);
    setUploadingImage(true);
    try {
      const base = getBase();
      const form = new FormData();
      for (const f of files) form.append('images', f);

      const res = await fetch(`${base}/api/upload`, { method: 'POST', body: form, credentials: 'include' });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.message || 'Image upload failed');
      const first = json?.data?.[0]?.url;
      if (first) setImageUrl(first);
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
        title,
        description: description || undefined,
        accommodationEstimate: {
          minPerDay: minPerDay === '' ? undefined : Number(minPerDay),
          maxPerDay: maxPerDay === '' ? undefined : Number(maxPerDay),
        },
        images: imageUrl ? [{ url: imageUrl }] : [],
      };

      const res = await fetch(`${base}/api/listings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.message || 'Failed to update listing');

      // PostHog: Track successful listing update
      posthog.capture('listing_updated', {
        listing_id: id,
        listing_title: title,
        has_description: !!description,
        has_image: !!imageUrl,
        min_per_day: minPerDay === '' ? null : Number(minPerDay),
        max_per_day: maxPerDay === '' ? null : Number(maxPerDay),
      });

      if (onSaved) onSaved(json?.data || payload);
      if (onClose) onClose();
    } catch (err) {
      setError(err?.message || 'Failed to update listing');
    } finally {
      setSaving(false);
    }
  };

  if (!listing) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl p-6 w-full max-w-2xl z-10 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Listing</h2>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-xl border border-gray-200 px-4 py-2" required />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full rounded-xl border border-gray-200 px-4 py-2 min-h-[100px]" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Min per day</label>
              <input type="number" value={minPerDay} onChange={(e) => setMinPerDay(e.target.value)} className="w-full rounded-xl border border-gray-200 px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Max per day</label>
              <input type="number" value={maxPerDay} onChange={(e) => setMaxPerDay(e.target.value)} className="w-full rounded-xl border border-gray-200 px-4 py-2" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Image (upload)</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="w-full" />
            <div className="mt-2 text-sm text-gray-600">{uploadingImage ? 'Uploading…' : imageUrl ? 'Uploaded' : 'No image uploaded'}</div>
            <label className="block text-sm text-gray-700 mb-1 mt-3">Or Image URL (optional)</label>
            <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full rounded-xl border border-gray-200 px-4 py-2" />
          </div>
          <div className="flex items-center gap-3 mt-4">
            <button type="submit" disabled={saving} className="px-5 py-2 rounded-full bg-green-500 text-white">{saving ? 'Saving…' : 'Save'}</button>
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-full bg-gray-200">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
