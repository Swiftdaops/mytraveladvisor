"use client";
import Link from 'next/link';
import { Home, List, Plane, Users } from 'lucide-react';

export default function AdminSidebar() {
  return (
    <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r min-h-0 md:min-h-screen p-3 sm:p-4">
      <div className="mb-4 sm:mb-6 text-xl sm:text-2xl font-semibold">Admin</div>
      <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible -mx-3 px-3 md:mx-0 md:px-0">
        <Link href="/admin" className="shrink-0 flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 whitespace-nowrap">
          <Home className="w-5 h-5" />
          <span>Dashboard</span>
        </Link>
        <Link href="/admin/listings" className="shrink-0 flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 whitespace-nowrap">
          <List className="w-5 h-5" />
          <span>My Listings</span>
        </Link>
        <Link href="/admin/flights" className="shrink-0 flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 whitespace-nowrap">
          <Plane className="w-5 h-5" />
          <span>My Flights</span>
        </Link>
        <Link href="http://localhost:3000/admin/clients" className="shrink-0 flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 whitespace-nowrap">
          <Users className="w-5 h-5" />
          <span>My Clients</span>
        </Link>
      </nav>
    </aside>
  );
}
