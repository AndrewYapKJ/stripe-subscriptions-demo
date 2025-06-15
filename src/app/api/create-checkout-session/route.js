import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export async function POST(request) {
  try {
    const { priceId } = await request.json();

    if (!priceId) {
      return NextResponse.json({ error: 'Price ID is required' }, { status: 400 });
    }

    const origin = request.headers.get('origin');
    
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/subscriptions`,
      automatic_tax: { enabled: true },
      billing_address_collection: 'required',
      customer_creation: 'always',
      metadata: {
        source: 'codecraft_subscription'
      }
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Stripe checkout session creation error:', error);
    return NextResponse.json(
      { error: 'Error creating checkout session', details: error.message }, 
      { status: 500 }
    );
  }
}