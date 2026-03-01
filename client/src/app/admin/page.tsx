import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Admin | Carin Siwa Portfolio',
  description: 'Admin dashboard for portfolio content.',
};

const adminLinks = [
  { href: '/admin/projects', label: 'Development projects' },
  { href: '/admin/designs', label: 'Design works' },
  { href: '/admin/wildlife', label: 'Wildlife media' },
  { href: '/admin/messages', label: 'Contact messages' },
];

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 md:px-6">
      <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
        Admin
      </h1>
      <p className="mt-1 text-slate-600 dark:text-slate-300">
        Manage portfolio content.
      </p>
      <ul className="mt-8 space-y-2">
        {adminLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="block rounded-xl border border-slate-200 bg-white p-4 font-medium text-slate-800 transition hover:border-accent-green hover:bg-accent-green/5 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-accent-green-light"
            >
              {link.label} →
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
