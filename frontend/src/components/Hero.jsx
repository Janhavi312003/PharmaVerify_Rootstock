import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Title & CTA */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Combat Counterfeit Medicine
            <br />
            <span className="text-blue-200">with Blockchain</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Verify drug authenticity instantly using blockchain-powered NFTs on Rootstock. 
            Bitcoin-level security for pharmaceutical supply chains.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/verify"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition shadow-xl hover:scale-105 transform"
            >
              🔍 Verify Drug Now
            </Link>
            <Link 
              href="/mint"
              className="bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-900 transition shadow-xl hover:scale-105 transform"
            >
              🏭 Mint Batch (Manufacturer)
            </Link>
          </div>
        </div>

        {/* Feature Cards - Interactive & Animated */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {/* Card 1: Bitcoin-Secured */}
          <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 hover:border-white/40 hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer">
            <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-300">
              🔒
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors">
              Bitcoin-Secured
            </h3>
            <p className="text-white/80 group-hover:text-white transition-colors">
              Deployed on Rootstock, leveraging Bitcoin's unmatched security for pharmaceutical data integrity.
            </p>
          </div>

          {/* Card 2: Instant Verification */}
          <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 hover:border-white/40 hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer">
            <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-300">
              ⚡
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-yellow-200 transition-colors">
              Instant Verification
            </h3>
            <p className="text-white/80 group-hover:text-white transition-colors">
              Scan QR codes to verify drug authenticity and expiry in seconds. No delays, just safety.
            </p>
          </div>

          {/* Card 3: Immutable Records */}
          <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 hover:border-white/40 hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer">
            <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-300">
              🌐
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-green-200 transition-colors">
              Immutable Records
            </h3>
            <p className="text-white/80 group-hover:text-white transition-colors">
              Every batch stored as an NFT on-chain. Tamper-proof, transparent, and permanent.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
