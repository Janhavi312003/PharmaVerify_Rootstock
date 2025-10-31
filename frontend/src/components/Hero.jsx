import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
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
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition shadow-xl"
          >
            🔍 Verify Drug Now
          </Link>
          <Link 
            href="/mint"
            className="bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-900 transition shadow-xl"
          >
            🏭 Mint Batch (Manufacturer)
          </Link>
        </div>
      </div>
    </section>
  );
}
