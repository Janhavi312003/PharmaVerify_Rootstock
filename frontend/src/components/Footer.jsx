export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <h3 className="text-2xl font-bold mb-3 gradient-text bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              PharmaVerify
            </h3>
            <p className="text-gray-400 mb-4">
              Blockchain-powered drug authentication system built on Rootstock. 
              Combating counterfeit medicine with Bitcoin-level security.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://github.com/yourusername/pharma-verify" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                GitHub
              </a>
              <a 
                href="https://twitter.com/yourhandle" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                Twitter
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/" className="hover:text-white transition">Home</a>
              </li>
              <li>
                <a href="/verify" className="hover:text-white transition">Verify Drug</a>
              </li>
              <li>
                <a href="/mint" className="hover:text-white transition">Mint Batch</a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a 
                  href="https://rootstock.io" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  Rootstock
                </a>
              </li>
              <li>
                <a 
                  href="https://rootstock-testnet.blockscout.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  Block Explorer
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/yourusername/pharma-verify#readme" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  Documentation
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© 2025 PharmaVerify. Built with Next.js, Foundry & Rootstock.</p>
          <p className="mt-2">Hackathon Project | Open Source</p>
        </div>
      </div>
    </footer>
  );
}
