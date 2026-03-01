import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Projects | Admin | Carin Siwa',
};

// TODO: fetch from API
const projects: { id: string; title: string }[] = [
  { id: '1', title: 'E-Commerce Platform' },
  { id: '2', title: 'Portfolio CMS' },
  { id: '3', title: 'Wildlife Gallery App' },
];

export default function AdminProjectsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:px-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin"
          className="text-slate-600 hover:text-accent-green dark:text-slate-300 dark:hover:text-accent-green-light"
        >
          ← Admin
        </Link>
      </div>
      <h1 className="mt-4 font-display text-2xl font-bold text-slate-900 dark:text-white">
        Development projects
      </h1>
      <p className="mt-1 text-slate-600 dark:text-slate-300">
        Add, edit, or remove projects. Data is loaded from the API when configured.
      </p>
      <ul className="mt-8 space-y-2">
        {projects.map((p) => (
          <li
            key={p.id}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800"
          >
            <span className="font-medium text-slate-900 dark:text-white">{p.title}</span>
            <span className="text-sm text-slate-500">Edit (API)</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
