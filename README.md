# CodeCraft - Premium Mobile App Source Code Marketplace

A modern micro SaaS platform built with Next.js and Stripe that sells premium mobile app source code with subscription-based access.

## 🚀 Features

- **Beautiful Landing Page** - Modern gradient design with responsive layout
- **Subscription Management** - Multiple pricing tiers with Stripe integration
- **Account Dashboard** - User-friendly interface for managing subscriptions
- **Secure Payments** - Full Stripe integration with webhooks
- **Mobile App Templates** - React Native, Flutter, and native iOS/Android code
- **Commercial Licensing** - Full rights to use code in commercial projects
- **TypeScript Support** - Fully typed codebase for better development experience

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Payments**: Stripe (Checkout, Subscriptions, Customer Portal)
- **Styling**: Tailwind CSS with custom gradients and animations
- **Fonts**: Geist Sans and Geist Mono

## 📋 Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Stripe account for payment processing
- Basic knowledge of Next.js and React

## 🏃‍♂️ Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd stripe-subscriptions-demo
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your Stripe keys in `.env.local`:
   ```env
   STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
   STRIPE_SECRET_KEY=sk_test_your_key_here
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Stripe Configuration

### 1. Create Stripe Products and Prices

Create these products in your Stripe Dashboard:

**Starter Plan**
- Name: "Starter"
- Price: $29/month
- Metadata: Add features as JSON in metadata

**Professional Plan** 
- Name: "Professional"
- Price: $59/month
- Metadata: Add features as JSON in metadata

**Enterprise Plan**
- Name: "Enterprise" 
- Price: $129/month
- Metadata: Add features as JSON in metadata

### 2. Set up Webhook Endpoint

1. Go to Stripe Dashboard → Webhooks
2. Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
3. Select these events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── check-session/         # Verify Stripe sessions
│   │   ├── create-checkout-session/ # Create Stripe checkout
│   │   ├── create-portal-session/  # Customer portal access
│   │   ├── subscription-plans/     # Fetch available plans
│   │   └── webhooks/stripe/        # Handle Stripe webhooks
│   ├── account/                    # User dashboard
│   ├── subscriptions/              # Pricing page
│   ├── success/                    # Payment success page
│   ├── layout.tsx                  # Root layout
│   ├── page.tsx                    # Landing page
│   ├── not-found.tsx              # 404 page
│   └── globals.css                 # Global styles
```

## 🎨 Customization

### Colors and Branding

The app uses a purple gradient theme. To customize:

1. **Primary Colors**: Edit the purple shades in Tailwind classes
2. **Gradients**: Modify `from-slate-900 via-purple-900 to-slate-900`
3. **Logo**: Replace "CodeCraft" with your brand name
4. **Copy**: Update the marketing copy in `page.tsx`

### App Categories

Edit the app categories in `src/app/page.tsx`:

```javascript
const categories = [
  { name: "E-commerce", icon: "🛒", count: "15+ apps" },
  { name: "Social Media", icon: "📱", count: "12+ apps" },
  // Add your categories here
];
```

### Pricing Plans

Modify the fallback plans in `src/app/api/subscription-plans/route.js`:

```javascript
const fallbackPlans = [
  {
    id: 'starter_monthly',
    name: 'Starter',
    price: 2900, // Price in cents
    features: [
      'Your features here'
    ]
  }
];
```

## 🚀 Deployment

### Deploy to Vercel

1. **Connect to Vercel**
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Set Environment Variables**
   Add your Stripe keys in the Vercel dashboard

3. **Update Webhook URL**
   Update your Stripe webhook endpoint to use your production domain

### Deploy to Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔍 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/subscription-plans` | GET | Fetch available subscription plans |
| `/api/create-checkout-session` | POST | Create Stripe checkout session |
| `/api/check-session` | POST | Verify payment session status |
| `/api/create-portal-session` | POST | Create customer portal session |
| `/api/webhooks/stripe` | POST | Handle Stripe webhook events |

## 🧪 Testing

### Test Stripe Integration

Use Stripe's test card numbers:

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0027 6000 3184`

### Test Webhooks Locally

1. Install Stripe CLI
2. Forward webhooks to local server:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Support

For support, email support@codecraft.dev or create an issue in this repository.

---

Built with ❤️ using Next.js and Stripe
