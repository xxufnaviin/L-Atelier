import type { Metadata } from 'next';
import { Inter, Italiana } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingAIChat from '@/components/FloatingAIChat';

const inter = Inter({ subsets: ['latin'] });
const italiana = Italiana({ 
  subsets: ['latin'],
  weight: '400',
  variable: '--font-italiana'
});

export const metadata: Metadata = {
  title: "L'Atelier - Beauty Trend Intelligence",
  description: 'AI-powered beauty trend analysis platform for L\'Oréal',
  keywords: ['beauty', 'trends', 'AI', 'marketing', 'L\'Oréal'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${italiana.variable}`}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <FloatingAIChat />
        </div>
      </body>
    </html>
  );
}
