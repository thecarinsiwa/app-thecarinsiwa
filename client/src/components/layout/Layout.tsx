'use client';

import { Navbar } from './Navbar';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-[72px] md:pt-20">{children}</main>
    </>
  );
}
