import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');
  let event;

  // Verify webhook signature
  try {
    if (!endpointSecret) {
      console.warn('STRIPE_WEBHOOK_SECRET not configured');
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
    }
    
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  console.log(`Received webhook event: ${event.type}`);

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object);
        break;
      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object);
        break;
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object);
        break;
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object);
        break;
      case 'invoice.payment_succeeded':
        await handleInvoicePaid(event.data.object);
        break;
      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object);
        break;
      case 'customer.subscription.trial_will_end':
        await handleTrialWillEnd(event.data.object);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    console.error(`Error handling webhook event ${event.type}:`, error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutSessionCompleted(session) {
  console.log('Checkout session completed:', session.id);
  
  try {
    // Retrieve the subscription details
    if (session.mode === 'subscription' && session.subscription) {
      const subscription = await stripe.subscriptions.retrieve(session.subscription);
      
      // Here you would typically:
      // 1. Create or update user record in your database
      // 2. Activate their subscription
      // 3. Send welcome email
      // 4. Log the conversion for analytics
      
      console.log('New subscription activated:', {
        customerId: session.customer,
        subscriptionId: session.subscription,
        email: session.customer_details?.email,
        priceId: subscription.items.data[0]?.price.id,
        status: subscription.status
      });
      
      // Example database operations (you'll need to implement these):
      // await createOrUpdateUser({
      //   stripeCustomerId: session.customer,
      //   email: session.customer_details?.email,
      //   subscriptionId: session.subscription,
      //   status: 'active'
      // });
      
      // await sendWelcomeEmail(session.customer_details?.email);
    }
  } catch (error) {
    console.error('Error processing checkout session:', error);
    throw error;
  }
}

async function handleSubscriptionCreated(subscription) {
  console.log('Subscription created:', subscription.id);
  
  try {
    // Log subscription creation
    console.log('New subscription details:', {
      id: subscription.id,
      customerId: subscription.customer,
      status: subscription.status,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      priceId: subscription.items.data[0]?.price.id
    });
    
    // Update user access in your database
    // await updateUserSubscriptionStatus(subscription.customer, 'active');
  } catch (error) {
    console.error('Error handling subscription creation:', error);
    throw error;
  }
}

async function handleSubscriptionUpdated(subscription) {
  console.log('Subscription updated:', subscription.id);
  
  try {
    const statusChanged = subscription.status !== subscription.previous_attributes?.status;
    
    if (statusChanged) {
      console.log(`Subscription status changed from ${subscription.previous_attributes?.status} to ${subscription.status}`);
    }
    
    // Handle different subscription statuses
    switch (subscription.status) {
      case 'active':
        // Ensure user has access to premium features
        // await grantUserAccess(subscription.customer);
        break;
      case 'past_due':
        // Send payment reminder email
        // await sendPaymentReminderEmail(subscription.customer);
        break;
      case 'canceled':
        // Revoke access but keep data for potential reactivation
        // await revokeUserAccess(subscription.customer, { keepData: true });
        break;
      case 'unpaid':
        // Suspend access
        // await suspendUserAccess(subscription.customer);
        break;
    }
    
    // Update subscription details in your database
    // await updateSubscriptionInDatabase(subscription);
  } catch (error) {
    console.error('Error handling subscription update:', error);
    throw error;
  }
}

async function handleSubscriptionDeleted(subscription) {
  console.log('Subscription deleted:', subscription.id);
  
  try {
    // Revoke user access to premium features
    // await revokeUserAccess(subscription.customer);
    
    // Send cancellation confirmation email
    // await sendCancellationEmail(subscription.customer);
    
    // Update database
    // await updateUserSubscriptionStatus(subscription.customer, 'canceled');
    
    console.log('Subscription cancellation processed for customer:', subscription.customer);
  } catch (error) {
    console.error('Error handling subscription deletion:', error);
    throw error;
  }
}

async function handleInvoicePaid(invoice) {
  console.log('Invoice paid:', invoice.id);
  
  try {
    if (invoice.subscription) {
      // Update the user's payment status and extend access period
      const subscription = await stripe.subscriptions.retrieve(invoice.subscription);
      
      console.log('Payment successful:', {
        invoiceId: invoice.id,
        customerId: invoice.customer,
        subscriptionId: invoice.subscription,
        amount: invoice.amount_paid,
        currency: invoice.currency,
        billingReason: invoice.billing_reason
      });
      
      // If this is the first payment, activate the subscription
      if (invoice.billing_reason === 'subscription_create') {
        // await activateUserSubscription(invoice.customer);
      }
      
      // Send payment confirmation email
      // await sendPaymentConfirmationEmail(invoice.customer, invoice);
    }
  } catch (error) {
    console.error('Error handling invoice payment:', error);
    throw error;
  }
}

async function handleInvoicePaymentFailed(invoice) {
  console.log('Invoice payment failed:', invoice.id);
  
  try {
    console.log('Payment failed:', {
      invoiceId: invoice.id,
      customerId: invoice.customer,
      subscriptionId: invoice.subscription,
      amount: invoice.amount_due,
      attemptCount: invoice.attempt_count
    });
    
    // Send payment failure notification
    // await sendPaymentFailureEmail(invoice.customer, invoice);
    
    // If this is the final attempt, suspend access
    if (invoice.attempt_count >= 3) {
      // await suspendUserAccess(invoice.customer);
    }
  } catch (error) {
    console.error('Error handling invoice payment failure:', error);
    throw error;
  }
}

async function handleTrialWillEnd(subscription) {
  console.log('Trial will end soon:', subscription.id);
  
  try {
    const trialEndDate = new Date(subscription.trial_end * 1000);
    
    console.log('Trial ending:', {
      subscriptionId: subscription.id,
      customerId: subscription.customer,
      trialEndDate: trialEndDate
    });
    
    // Send trial ending notification
    // await sendTrialEndingEmail(subscription.customer, trialEndDate);
  } catch (error) {
    console.error('Error handling trial will end:', error);
    throw error;
  }
}