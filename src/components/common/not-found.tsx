import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-display font-bold text-brand-amber">404</h1>
          <p className="mt-4 text-xl text-brand-gray-300">Page not found</p>
          <p className="mt-2 text-sm text-brand-gray-500">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link href="/" className="btn-primary mt-8 inline-flex">
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
