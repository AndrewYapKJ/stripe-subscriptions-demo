import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export async function POST(request) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['subscription', 'customer']
    });

    // Log successful payment for debugging
    if (session.payment_status === 'paid') {
      console.log('Payment successful for session:', sessionId);
      console.log('Customer email:', session.customer_details?.email);
      console.log('Subscription ID:', session.subscription?.id);
      
      // Here you would typically:
      // 1. Update user record in your database
      // 2. Send welcome email
      // 3. Grant access to premium features
      // await updateUserSubscriptionStatus(session.customer.id, 'active');
    }

    return NextResponse.json({ 
      session: {
        id: session.id,
        status: session.status,
        payment_status: session.payment_status,
        customer_email: session.customer_details?.email,
        subscription_id: session.subscription?.id,
        amount_total: session.amount_total,
        currency: session.currency
      }
    });
  } catch (error) {
    console.error('Error retrieving session:', error);
    return NextResponse.json({ 
      error: 'Failed to retrieve session', 
      details: error.message 
    }, { status: 400 });
  }
}