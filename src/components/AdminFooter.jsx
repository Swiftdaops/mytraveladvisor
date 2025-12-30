"use client";

export default function AdminFooter() {
  return (
    <footer className="w-full border-t bg-white p-3 sm:p-4 text-sm text-gray-600">
      <div className="max-w-7xl mx-auto text-center">© {new Date().getFullYear()} TravelAdvisor — Admin</div>
    </footer>
  );
}
