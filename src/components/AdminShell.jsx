"use client";
import AdminSidebar from './AdminSidebar';

export default function AdminShell({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col md:flex-row">
        <AdminSidebar />
        <div className="flex-1 p-4 sm:p-6 min-h-screen">
          {children}
        </div>
      </div>
    
    </div>
  );
}
