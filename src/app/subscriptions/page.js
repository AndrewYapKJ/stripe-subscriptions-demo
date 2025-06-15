'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Link from 'next/link';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// Predefined plans with better structure for mobile app code marketplace
const predefinedPlans = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for individual developers',
    price: 2900, // $29/month
    interval: 'month',
    features: [
      '5 Mobile App Templates',
      'React Native & Flutter',
      'Basic Documentation',
      'Email Support',
      'Commercial License'
    ],
    popular: false
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Best for freelancers and small teams',
    price: 5900, // $59/month
    interval: 'month',
    features: [
      '20 Mobile App Templates',
      'All Frameworks (RN, Flutter, Native)',
      'Complete Documentation',
      'Priority Email Support',
      'Source Code Access',
      'Commercial License',
      'Monthly New Releases'
    ],
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For agencies and large teams',
    price: 12900, // $129/month
    interval: 'month',
    features: [
      'Unlimited App Templates',
      'All Frameworks + Backend Code',
      'Video Tutorials',
      '1-on-1 Support Calls',
      'Custom App Development',
      'White Label License',
      'Early Access to New Features'
    ],
    popular: false
  }
];

export default function Subscriptions() {
  const [plans, setPlans] = useState(predefinedPlans);
  const [loading, setLoading] = useState({});

  useEffect(() => {
    // Fetch actual subscription plans from Stripe API
    fetch('/api/subscription-plans')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setPlans(data);
        }
      })
      .catch(() => {
        // Fallback to predefined plans if API fails
        console.log('Using predefined plans');
      });
  }, []);

  const handleSubscribe = async (priceId, planId) => {
    setLoading(prev => ({ ...prev, [planId]: true }));
    
    try {
      const stripe = await stripePromise;
      const { sessionId } = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      }).then(res => res.json());

      const result = await stripe.redirectToCheckout({ sessionId });

      if (result.error) {
        console.error(result.error);
      }
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setLoading(prev => ({ ...prev, [planId]: false }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 lg:px-8">
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
            href="/account"
            className="px-4 py-2 text-sm font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Account
          </Link>
        </div>
      </nav>

      {/* Pricing Section */}
      <div className="px-6 lg:px-8 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Choose Your Plan
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
              Get access to premium mobile app source code with our flexible subscription plans
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-8 ${
                  plan.popular
                    ? 'bg-white/10 border-2 border-purple-400 shadow-2xl scale-105'
                    : 'bg-white/5 border border-white/10'
                } backdrop-blur-sm transition-all hover:bg-white/15`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                  <p className="mt-2 text-sm text-gray-300">{plan.description}</p>
                  <div className="mt-6">
                    <span className="text-4xl font-bold text-white">
                      ${(plan.price / 100).toFixed(0)}
                    </span>
                    <span className="text-gray-300">/{plan.interval}</span>
                  </div>
                </div>

                <ul className="mt-8 space-y-3">
                  {(plan.features || []).map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <svg
                        className="h-5 w-5 text-purple-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSubscribe(plan.price_id || plan.id, plan.id)}
                  disabled={loading[plan.id]}
                  className={`mt-8 w-full rounded-lg px-6 py-3 font-semibold transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                      : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                  } ${loading[plan.id] ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading[plan.id] ? 'Processing...' : 'Get Started'}
                </button>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center text-white mb-12">
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  question: "Can I cancel anytime?",
                  answer: "Yes, you can cancel your subscription at any time. You'll retain access until the end of your billing period."
                },
                {
                  question: "Do I get the source code?",
                  answer: "Yes, all plans include full source code with documentation and commercial license."
                },
                {
                  question: "What frameworks are supported?",
                  answer: "We provide React Native, Flutter, and native iOS/Android code depending on your plan."
                },
                {
                  question: "Is there a free trial?",
                  answer: "We offer a 7-day free trial for all plans. No credit card required to start."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}