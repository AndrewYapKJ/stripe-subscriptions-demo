'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SuccessPage() {
  const [status, setStatus] = useState('loading');
  const [customerEmail, setCustomerEmail] = useState('');
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      fetchSessionStatus();
    }
  }, [sessionId]);

  async function fetchSessionStatus() {
    try {
      const response = await fetch('/api/check-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      });

      const { session, error } = await response.json();

      if (error) {
        setStatus('failed');
        console.error(error);
        return;
      }

      setStatus(session.status);
      setCustomerEmail(session.customer_email);
    } catch (error) {
      setStatus('failed');
      console.error('Error fetching session:', error);
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-white text-lg">Processing your subscription...</p>
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">Payment Failed</h1>
          <p className="text-gray-300 mb-8">
            There was an issue processing your subscription. Please try again or contact support.
          </p>
          <div className="space-y-4">
            <Link
              href="/subscriptions"
              className="block w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Try Again
            </Link>
            <Link
              href="/"
              className="block w-full border border-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="text-2xl font-bold text-white">
            CodeCraft
          </Link>
        </div>
      </nav>

      {/* Success Content */}
      <div className="flex items-center justify-center px-6 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-6">
            Welcome to CodeCraft!
          </h1>
          
          <p className="text-xl text-gray-300 mb-4">
            🎉 Your subscription is now active!
          </p>
          
          {customerEmail && (
            <p className="text-gray-400 mb-8">
              A confirmation email has been sent to <span className="text-purple-400 font-semibold">{customerEmail}</span>
            </p>
          )}

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">What's Next?</h2>
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Access Your Dashboard</h3>
                  <p className="text-gray-300 text-sm">Manage your subscription and download source code</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Browse App Templates</h3>
                  <p className="text-gray-300 text-sm">Explore our collection of premium mobile apps</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Start Building</h3>
                  <p className="text-gray-300 text-sm">Use our documentation and support to get started</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/account"
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/"
              className="border border-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Browse Templates
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
