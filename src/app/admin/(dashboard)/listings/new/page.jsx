"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const getBase = () => process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

export default function AdminNewListingPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [minPerDay, setMinPerDay] = useState('');
  const [maxPerDay, setMaxPerDay] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const base = getBase();
      const payload = {
        title,
        description,
        accommodationEstimate: {
          minPerDay: minPerDay === '' ? undefined : Number(minPerDay),
          maxPerDay: maxPerDay === '' ? undefined : Number(maxPerDay),
        },
        images: imageUrl ? [{ url: imageUrl }] : [],
      };

      const res = await fetch(`${base}/api/listings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.message || 'Failed to create listing');
      router.push('/admin/listings');
    } catch (err) {
      setError(err?.message || 'Failed to create listing');
    } finally {
      setLoading(false);
    }
  };

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
      if (first) setImageUrl(first);
    } catch (err) {
      setError(err?.message || 'Image upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Add Listing</h1>
      {error && <div className="mb-4 text-red-600">{error}</div>}

      <form onSubmit={onSubmit} className="max-w-xl space-y-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none min-h-[110px]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Min per day</label>
            <input
              type="number"
              value={minPerDay}
              onChange={(e) => setMinPerDay(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Max per day</label>
            <input
              type="number"
              value={maxPerDay}
              onChange={(e) => setMaxPerDay(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Image (upload to Cloudinary)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          />
          <div className="mt-2 text-sm text-gray-600">{uploadingImage ? 'Uploading…' : imageUrl ? 'Uploaded' : 'No image uploaded'}</div>
          <label className="block text-sm text-gray-700 mb-1 mt-3">Or Image URL (optional)</label>
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-green-500 hover:bg-green-600 disabled:opacity-60 transition text-white font-medium"
        >
          {loading ? 'Saving…' : 'Create listing'}
        </button>
      </form>
    </div>
  );
}
