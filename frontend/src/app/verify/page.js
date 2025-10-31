'use client';

import { useState } from 'react';
import { verifyDrug } from '@/utils/contract';
import QRScanner from '@/components/QRScanner';

export default function VerifyPage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [manualId, setManualId] = useState('');
  const [showScanner, setShowScanner] = useState(true);
  const [scannerReady, setScannerReady] = useState(false);

  const handleVerify = async (tokenId) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await verifyDrug(tokenId);
      setResult(data);
      setShowScanner(false);
    } catch (err) {
      setError(err.message || 'Verification failed');
      console.error(err);
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
    setShowScanner(true);
    setScannerReady(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          🔍 Verify Drug Authenticity
        </h1>

        {/* Scanner Section */}
        {showScanner && !result && (
          <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Scan QR Code
            </h2>
            
            <QRScanner 
              onScan={handleVerify}
              onReady={() => setScannerReady(true)}
            />
            
            {/* Manual Input */}
            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-gray-600 mb-3">Or enter Token ID manually:</p>
              <form onSubmit={handleManualSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={manualId}
                  onChange={(e) => setManualId(e.target.value)}
                  placeholder="Enter Token ID (e.g., 1)"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={!manualId.trim() || loading}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Verify
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl p-12 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Verifying on blockchain...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-3">
              <span className="text-3xl">⚠️</span>
              <div className="flex-1">
                <h3 className="font-bold text-red-800 text-lg mb-2">Verification Failed</h3>
                <p className="text-red-700">{error}</p>
                <button
                  onClick={resetVerification}
                  className="mt-4 text-red-600 hover:text-red-800 font-semibold"
                >
                  Try Again →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Result Display - Keep same as before */}
        {result && (
          <div className={`rounded-2xl shadow-xl p-8 ${
              result.isValid && !result.isRecalled
                ? 'bg-green-50 border-4 border-green-400'
                : 'bg-red-50 border-4 border-red-400'
            }`}>
            {/* Your existing result display code */}
          </div>
        )}
      </div>
    </div>
  );
}
