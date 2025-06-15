'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Account() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const handleManageSubscription = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/create-portal-session', {
        method: 'POST',
      });
      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Mock data - in a real app, this would come from your database
  const mockApps = [
    { id: 1, name: 'E-commerce App', framework: 'React Native', category: 'Shopping', downloads: 1240 },
    { id: 2, name: 'Food Delivery', framework: 'Flutter', category: 'Food & Drink', downloads: 980 },
    { id: 3, name: 'Fitness Tracker', framework: 'React Native', category: 'Health', downloads: 756 },
    { id: 4, name: 'Social Media', framework: 'Flutter', category: 'Social', downloads: 2100 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 lg:px-8 border-b border-white/10">
        <div className="flex lg:flex-1">
          <Link href="/" className="text-2xl font-bold text-white">
            CodeCraft
          </Link>
        </div>
        <div className="flex gap-4">
          <Link
            href="/"
            className="px-4 py-2 text-sm font-semibold text-white hover:text-purple-300 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/subscriptions"
            className="px-4 py-2 text-sm font-semibold text-white hover:text-purple-300 transition-colors"
          >
            Pricing
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Account Dashboard</h1>
          <p className="text-gray-300 mt-2">Manage your subscription and access your mobile app templates</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8 bg-white/5 p-1 rounded-lg w-fit">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'downloads', label: 'Downloads' },
            { id: 'subscription', label: 'Subscription' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Stats Cards */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Downloads</p>
                    <p className="text-2xl font-bold text-white">5,076</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Apps Available</p>
                    <p className="text-2xl font-bold text-white">47</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Account Since</p>
                    <p className="text-2xl font-bold text-white">Jan 2025</p>
                  </div>
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h.01L16 7v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7z"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Plan Status</p>
                    <p className="text-2xl font-bold text-green-400">Active</p>
                  </div>
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={handleManageSubscription}
                  disabled={isLoading}
                  className="w-full bg-purple-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Loading...' : 'Manage Subscription'}
                </button>
                <Link
                  href="/subscriptions"
                  className="block w-full text-center border border-white/20 text-white px-4 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
                >
                  View All Plans
                </Link>
                <button className="w-full text-left text-gray-300 px-4 py-3 hover:text-white transition-colors">
                  Download Invoice
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'downloads' && (
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <h3 className="text-lg font-semibold text-white">Popular App Templates</h3>
              <p className="text-gray-400 text-sm mt-1">Click to download source code</p>
            </div>
            <div className="divide-y divide-white/10">
              {mockApps.map((app) => (
                <div key={app.id} className="p-6 hover:bg-white/5 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{app.name.charAt(0)}</span>
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{app.name}</h4>
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                          <span>{app.framework}</span>
                          <span>•</span>
                          <span>{app.category}</span>
                          <span>•</span>
                          <span>{app.downloads} downloads</span>
                        </div>
                      </div>
                    </div>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'subscription' && (
          <div className="max-w-2xl">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-white">Professional Plan</h3>
                  <p className="text-gray-400">$59/month • Next billing: Feb 15, 2025</p>
                </div>
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Active
                </span>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between py-2">
                  <span className="text-gray-300">Plan Features</span>
                  <span className="text-white">20 App Templates</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-300">Frameworks</span>
                  <span className="text-white">All (RN, Flutter, Native)</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-300">Support</span>
                  <span className="text-white">Priority Email</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-300">License</span>
                  <span className="text-white">Commercial</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleManageSubscription}
                  disabled={isLoading}
                  className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Loading...' : 'Manage Subscription'}
                </button>
                <Link
                  href="/subscriptions"
                  className="flex-1 text-center border border-white/20 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
                >
                  Change Plan
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}