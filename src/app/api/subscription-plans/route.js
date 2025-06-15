
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

// Fallback plans if Stripe API fails
const fallbackPlans = [
  {
    id: 'starter_monthly',
    name: 'Starter',
    description: 'Perfect for individual developers',
    price: 2900,
    interval: 'month',
    price_id: 'starter_monthly',
    features: [
      '5 Mobile App Templates',
      'React Native & Flutter',
      'Basic Documentation',
      'Email Support',
      'Commercial License'
    ]
  },
  {
    id: 'professional_monthly',
    name: 'Professional',
    description: 'Best for freelancers and small teams',
    price: 5900,
    interval: 'month',
    price_id: 'professional_monthly',
    features: [
      '20 Mobile App Templates',
      'All Frameworks (RN, Flutter, Native)',
      'Complete Documentation',
      'Priority Email Support',
      'Source Code Access',
      'Commercial License',
      'Monthly New Releases'
    ]
  },
  {
    id: 'enterprise_monthly',
    name: 'Enterprise',
    description: 'For agencies and large teams',
    price: 12900,
    interval: 'month',
    price_id: 'enterprise_monthly',
    features: [
      'Unlimited App Templates',
      'All Frameworks + Backend Code',
      'Video Tutorials',
      '1-on-1 Support Calls',
      'Custom App Development',
      'White Label License',
      'Early Access to New Features'
    ]
  }
];

export async function GET() {
  try {
    // Try to fetch from Stripe first
    const prices = await stripe.prices.list({
      expand: ['data.product'],
      active: true,
      type: 'recurring',
      limit: 10,
    });

    if (prices.data.length === 0) {
      // Return fallback plans if no Stripe products found
      return NextResponse.json(fallbackPlans);
    }

    const plans = prices.data.map(price => ({
      id: price.id,
      name: price.product.name,
      description: price.product.description || 'Premium mobile app source code',
      price: price.unit_amount,
      interval: price.recurring.interval,
      price_id: price.id,
      features: price.product.metadata?.features ? 
        JSON.parse(price.product.metadata.features) : 
        ['Mobile App Templates', 'Source Code Access', 'Documentation', 'Support']
    }));

    return NextResponse.json(plans);
  } catch (error) {
    console.error('Error fetching subscription plans:', error);
    
    // Return fallback plans if Stripe API fails
    return NextResponse.json(fallbackPlans);
  }
}