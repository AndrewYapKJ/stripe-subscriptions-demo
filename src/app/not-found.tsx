import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-purple-400 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-white mb-4">Page Not Found</h2>
          <p className="text-gray-300 mb-8">
            The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="block w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/subscriptions"
            className="block w-full border border-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
          >
            View Pricing Plans
          </Link>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm">
            Need help? Contact our support team
          </p>
        </div>
      </div>
    </div>
  );
}
