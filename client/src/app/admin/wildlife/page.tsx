import Link from 'next/link';

export default function AdminWildlifePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:px-6">
      <Link href="/admin" className="text-slate-600 hover:text-accent-green dark:text-slate-300 dark:hover:text-accent-green-light">← Admin</Link>
      <h1 className="mt-4 font-display text-2xl font-bold text-slate-900 dark:text-white">Wildlife media</h1>
      <p className="mt-1 text-slate-600 dark:text-slate-300">Manage photos and videos (API integration ready).</p>
    </div>
  );
}
