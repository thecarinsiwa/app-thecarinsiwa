import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Layout } from '@/components/layout/Layout';
import { ThemeProvider } from '@/components/theme/ThemeProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-geist-sans' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });

export const metadata: Metadata = {
  title: 'Carin Siwa | Fullstack Developer, Designer, Wildlife Photographer',
  description:
    'Portfolio of Carin Siwa — Fullstack Developer, Graphic Designer, Wildlife Photographer & Videographer.',
  keywords: ['Carin Siwa', 'Fullstack Developer', 'Graphic Designer', 'Wildlife Photographer', 'Videographer'],
  openGraph: {
    title: 'Carin Siwa | Portfolio',
    description: 'Fullstack Developer, Graphic Designer, Wildlife Photographer & Videographer',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        <ThemeProvider>
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
