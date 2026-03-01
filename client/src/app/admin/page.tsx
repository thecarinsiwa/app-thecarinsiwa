import type { Metadata } from 'next';
import { AdminDashboardClient } from '@/components/admin/AdminDashboardClient';

export const metadata: Metadata = {
  title: 'Tableau de bord | Admin | Carin Siwa',
  description: 'Gestion du contenu du portfolio.',
};

export default function AdminDashboardPage() {
  return <AdminDashboardClient />;
}
