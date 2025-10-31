import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white/95 backdrop-blur p-8 rounded-2xl shadow-xl hover:shadow-2xl transition">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Bitcoin-Secured</h3>
              <p className="text-gray-600">
                Deployed on Rootstock, leveraging Bitcoin's unmatched security for pharmaceutical data integrity.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/95 backdrop-blur p-8 rounded-2xl shadow-xl hover:shadow-2xl transition">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Instant Verification</h3>
              <p className="text-gray-600">
                Scan QR codes to verify drug authenticity and expiry in seconds. No delays, just safety.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/95 backdrop-blur p-8 rounded-2xl shadow-xl hover:shadow-2xl transition">
              <div className="text-5xl mb-4">🌐</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Immutable Records</h3>
              <p className="text-gray-600">
                Every batch stored as an NFT on-chain. Tamper-proof, transparent, and permanent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl p-12">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">10-15%</div>
                <div className="text-gray-600">Of drugs worldwide are counterfeit</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">$200B</div>
                <div className="text-gray-600">Annual loss from fake medicines</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">1M+</div>
                <div className="text-gray-600">Deaths per year from fake drugs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
