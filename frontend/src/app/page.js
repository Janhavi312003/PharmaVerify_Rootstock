import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <Hero />

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
