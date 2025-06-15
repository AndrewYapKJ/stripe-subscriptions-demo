import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export async function POST(request) {
  try {
    // In a real application, you would:
    // 1. Get the authenticated user from session/JWT
    // 2. Look up their customer ID in your database
    // 3. Use that customer ID for the portal session
    
    // For demo purposes, we'll create a test customer or use a provided one
    let customerId;
    
    try {
      const body = await request.json();
      customerId = body.customerId;
    } catch {
      // No body or invalid JSON, proceed without customer ID
    }

    if (!customerId) {
      // Create a test customer for demo purposes
      // In production, you should have the customer ID from your database
      const customer = await stripe.customers.create({
        email: 'demo@example.com',
        metadata: {
          source: 'codecraft_demo'
        }
      });
      customerId = customer.id;
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${request.headers.get('origin')}/account`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating portal session:', error);
    return NextResponse.json({ 
      error: 'Error creating portal session', 
      details: error.message 
    }, { status: 500 });
  }
}