'use client';

import { usePathname } from 'next/navigation';
import { AdminSidebar } from './AdminSidebar';
import { AdminAuthGuard } from './AdminAuthGuard';

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return <AdminAuthGuard>{children}</AdminAuthGuard>;
  }

  return (
    <AdminAuthGuard>
      <div className="flex min-h-[calc(100vh-5rem)] bg-slate-50 dark:bg-slate-900/30">
        <AdminSidebar />
        <div className="min-w-0 flex-1 p-4 md:p-6 lg:p-8">{children}</div>
      </div>
    </AdminAuthGuard>
  );
}
