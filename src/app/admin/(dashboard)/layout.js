import AdminShell from '@/components/AdminShell';
import AdminGuard from '@/components/AdminGuard';

export const metadata = {
  title: 'Admin',
};

export default function AdminDashboardLayout({ children }) {
  return (
    <AdminGuard>
      <AdminShell>{children}</AdminShell>
    </AdminGuard>
  );
}
