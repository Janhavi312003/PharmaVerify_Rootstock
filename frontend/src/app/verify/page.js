'use client';

import { useState } from 'react';
import { verifyDrug } from '@/utils/contract';
import QRScanner from '@/components/QRScanner';

export default function VerifyPage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [manualId, setManualId] = useState('');
  const [showScanner, setShowScanner] = useState(false);

  const handleVerify = async (tokenId) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      console.log('Verifying token:', tokenId);
      const data = await verifyDrug(tokenId);
      setResult(data);
      setShowScanner(false);
    } catch (err) {
      setError(err.message || 'Verification failed');
      console.error('Verify error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualId.trim()) {
      handleVerify(manualId.trim());
    }
  };

  const resetVerification = () => {
    setResult(null);
    setError(null);
    setManualId('');
    setShowScanner(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-3">
            🔍 Verify Drug Authenticity
          </h1>
          <p className="text-white/80 text-lg">
            Scan QR code or enter Token ID to verify pharmaceutical products
          </p>
        </div>

        {/* Main Content */}
        {!result && !loading && (
          <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl p-8">
            {/* Manual Input Section */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Enter Token ID
              </h2>
              <form onSubmit={handleManualSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Token ID *
                  </label>
                  <input
                    type="text"
                    value={manualId}
                    onChange={(e) => setManualId(e.target.value)}
                    placeholder="e.g., 1 or Token #1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter the token ID from the medicine package
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={!manualId.trim()}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg"
                >
                  🔍 Verify Drug
                </button>
              </form>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-gray-500 text-sm font-semibold">OR</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* QR Scanner Toggle */}
            {!showScanner ? (
              <button
                onClick={() => setShowScanner(true)}
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition shadow-lg"
              >
                📱 Scan QR Code
              </button>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Scan QR Code
                  </h2>
                  <button
                    onClick={() => setShowScanner(false)}
                    className="text-red-600 hover:text-red-700 font-semibold text-sm"
                  >
                    ✕ Close Scanner
                  </button>
                </div>
                <QRScanner 
                  onScan={handleVerify}
                  onReady={() => console.log('Scanner ready')}
                />
              </div>
            )}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl p-12 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg font-semibold">Verifying on blockchain...</p>
            <p className="text-gray-500 text-sm mt-2">Please wait...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border-4 border-red-200 rounded-2xl shadow-xl p-8">
            <div className="flex items-start gap-4">
              <span className="text-4xl">⚠️</span>
              <div className="flex-1">
                <h3 className="font-bold text-red-800 text-xl mb-2">Verification Failed</h3>
                <p className="text-red-700 text-lg mb-4">{error}</p>
                <button
                  onClick={resetVerification}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success Result */}
        {result && !loading && (
          <div className={`rounded-2xl shadow-xl p-8 ${
            result.isValid && !result.isRecalled
              ? 'bg-green-50 border-4 border-green-400'
              : 'bg-red-50 border-4 border-red-400'
          }`}>
            {/* Status Header */}
            <div className="text-center mb-6">
              <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 ${
                result.isValid && !result.isRecalled
                  ? 'bg-green-500'
                  : 'bg-red-500'
              }`}>
                <span className="text-5xl text-white">
                  {result.isValid && !result.isRecalled ? '✓' : '✗'}
                </span>
              </div>
              
              <h2 className={`text-4xl font-bold mb-3 ${
                result.isValid && !result.isRecalled
                  ? 'text-green-700'
                  : 'text-red-700'
              }`}>
                {result.isValid && !result.isRecalled ? 'AUTHENTIC ✓' : 'WARNING ✗'}
              </h2>
              
              <p className={`text-xl ${
                result.isValid && !result.isRecalled
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}>
                {result.isValid && !result.isRecalled
                  ? 'This drug is verified and safe to use'
                  : result.isRecalled
                  ? 'This batch has been RECALLED by manufacturer'
                  : 'This drug has EXPIRED - Do not use'
                }
              </p>
            </div>

            {/* Drug Details */}
            <div className="bg-white rounded-xl p-6 space-y-4 mb-6">
              <h3 className="font-bold text-lg text-gray-800 mb-4">Drug Information</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Token ID</p>
                  <p className="text-xl font-bold text-gray-800">#{result.tokenId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Batch ID</p>
                  <p className="text-xl font-bold text-gray-800">{result.batchId}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Manufacturer</p>
                <p className="text-lg font-bold text-gray-800">{result.manufacturer}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Expiry Date</p>
                <p className="text-lg font-bold text-gray-800">
                  {result.expiryDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>

              {result.ipfsHash && result.ipfsHash !== 'QmDefault' && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Documentation</p>
                  <a
                    href={`https://ipfs.io/ipfs/${result.ipfsHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 text-sm font-mono break-all hover:underline"
                  >
                    View Certificate on IPFS →
                  </a>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={resetVerification}
                className="bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
              >
                Verify Another
              </button>
              <a
                href={`https://explorer.testnet.rootstock.io/token/${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}/instance/${result.tokenId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition text-center"
              >
                View on Explorer
              </a>
            </div>
          </div>
        )}

        {/* Info Box */}
        {!result && !loading && !error && (
          <div className="mt-8 p-6 bg-blue-50 rounded-xl">
            <h3 className="font-bold text-blue-800 mb-3 text-lg">
              📱 How to Verify:
            </h3>
            <ul className="text-sm text-blue-700 space-y-2">
              <li className="flex items-start gap-2">
                <span className="font-bold">1.</span>
                <span><strong>Enter Token ID:</strong> Type the number from the medicine package (e.g., 1, 2, 3)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">2.</span>
                <span><strong>Or Scan QR Code:</strong> Use your device camera to scan the QR code</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">3.</span>
                <span><strong>Instant Result:</strong> Get real-time verification from the blockchain</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
