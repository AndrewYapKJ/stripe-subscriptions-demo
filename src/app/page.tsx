import Link from "next/link";

export default function Home() {
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
            href="/subscriptions"
            className="px-4 py-2 text-sm font-semibold text-white hover:text-purple-300 transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/account"
            className="px-4 py-2 text-sm font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Account
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="px-6 lg:px-8">
        <div className="mx-auto max-w-4xl py-20 sm:py-28 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Premium Mobile App
            <span className="text-purple-400"> Source Code</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
            Access high-quality, production-ready mobile app source code. 
            Get complete React Native, Flutter, and native iOS/Android projects with documentation.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/subscriptions"
              className="rounded-lg bg-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-purple-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 transition-all"
            >
              Get Started
            </Link>
            <Link
              href="#features"
              className="text-sm font-semibold leading-6 text-white hover:text-purple-300 transition-colors"
            >
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="py-20">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                What You Get
              </h2>
              <p className="mt-4 text-lg text-gray-300">
                Professional mobile app templates and components
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">RN</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">React Native</h3>
                </div>
                <p className="text-gray-300">
                  Cross-platform apps with modern UI components, navigation, and state management.
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">FL</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">Flutter</h3>
                </div>
                <p className="text-gray-300">
                  High-performance native apps with beautiful Material Design and Cupertino widgets.
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">N</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">Native</h3>
                </div>
                <p className="text-gray-300">
                  Pure iOS (Swift) and Android (Kotlin) applications with platform-specific features.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* App Categories */}
        <div className="py-20">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                App Categories
              </h2>
              <p className="mt-4 text-lg text-gray-300">
                Browse our collection of premium mobile app templates
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { name: "E-commerce", icon: "🛒", count: "15+ apps" },
                { name: "Social Media", icon: "📱", count: "12+ apps" },
                { name: "Food Delivery", icon: "🍔", count: "8+ apps" },
                { name: "Fitness", icon: "💪", count: "10+ apps" },
                { name: "Finance", icon: "💰", count: "6+ apps" },
                { name: "Education", icon: "📚", count: "9+ apps" },
                { name: "Travel", icon: "✈️", count: "7+ apps" },
                { name: "Games", icon: "🎮", count: "20+ apps" },
              ].map((category) => (
                <div
                  key={category.name}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
                >
                  <div className="text-3xl mb-3">{category.icon}</div>
                  <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                  <p className="text-sm text-gray-400">{category.count}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
  