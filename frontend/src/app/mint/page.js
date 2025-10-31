'use client';

import { useState } from 'react';
import { mintBatch, connectWallet } from '@/utils/contract';
import QRCode from 'react-qr-code';

export default function MintPage() {
  const [formData, setFormData] = useState({
    batchId: '',
    manufacturer: '',
    expiryDate: '',
    ipfsHash: '',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);

  const handleConnect = async () => {
    try {
      const { address } = await connectWallet();
      setWalletAddress(address);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      if (!walletAddress) {
        throw new Error('Please connect your wallet first');
      }

      const { tokenId, txHash } = await mintBatch(
        formData.batchId,
        formData.manufacturer,
        formData.expiryDate,
        formData.ipfsHash || 'QmDefault'
      );

      setResult({ tokenId, txHash });
      
      // Reset form
      setFormData({
        batchId: '',
        manufacturer: '',
        expiryDate: '',
        ipfsHash: '',
      });
    } catch (err) {
      setError(err.message || 'Minting failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadQR = () => {
    const svg = document.getElementById('qr-code');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      
      const downloadLink = document.createElement('a');
      downloadLink.download = `drug-token-${result.tokenId}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-3">
          🏭 Mint Drug Batch
        </h1>
        <p className="text-white/80 text-center mb-8">
          Create a new pharmaceutical batch NFT on Rootstock
        </p>

        {/* Wallet Connection */}
        {!walletAddress ? (
          <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl p-8 text-center">
            <div className="text-6xl mb-4">🔐</div>
            <h2 className="text-2xl font-bold mb-3 text-gray-800">
              Connect Wallet
            </h2>
            <p className="text-gray-600 mb-6">
              Connect your wallet to mint pharmaceutical batch NFTs
            </p>
            <button
              onClick={handleConnect}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg"
            >
              Connect MetaMask
            </button>
          </div>
        ) : (
          <>
            {/* Connected Wallet Info */}
            <div className="bg-white/95 backdrop-blur rounded-xl shadow-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-600 text-sm">Connected:</span>
                  <code className="text-sm font-mono text-gray-800">
                    {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                  </code>
                </div>
                <button
                  onClick={() => setWalletAddress(null)}
                  className="text-red-600 hover:text-red-700 text-sm font-semibold"
                >
                  Disconnect
                </button>
              </div>
            </div>

            {/* Mint Form */}
            <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Batch ID */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Batch ID *
                  </label>
                  <input
                    type="text"
                    name="batchId"
                    value={formData.batchId}
                    onChange={handleChange}
                    placeholder="e.g., BATCH-2025-PFZ-001"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Manufacturer */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Manufacturer Name *
                  </label>
                  <input
                    type="text"
                    name="manufacturer"
                    value={formData.manufacturer}
                    onChange={handleChange}
                    placeholder="e.g., Pfizer Inc"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Expiry Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Expiry Date *
                  </label>
                  <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* IPFS Hash (Optional) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    IPFS Metadata Hash (Optional)
                  </label>
                  <input
                    type="text"
                    name="ipfsHash"
                    value={formData.ipfsHash}
                    onChange={handleChange}
                    placeholder="e.g., QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Leave empty to use default hash
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Minting...
                    </span>
                  ) : (
                    'Mint Batch NFT'
                  )}
                </button>
              </form>

              {/* Error Display */}
              {error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Success Result */}
        {result && (
          <div className="mt-8 bg-green-50 border-4 border-green-400 rounded-2xl shadow-xl p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-4">
                <span className="text-4xl text-white">✓</span>
              </div>
              <h2 className="text-3xl font-bold text-green-700 mb-2">
                Batch Minted Successfully!
              </h2>
              <p className="text-gray-600">Your pharmaceutical batch NFT has been created</p>
            </div>

            {/* Token Details */}
            <div className="bg-white rounded-xl p-6 mb-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Token ID</p>
                  <p className="text-2xl font-bold text-gray-800">#{result.tokenId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Transaction</p>
                  <a
                    href={`https://rootstock-testnet.blockscout.com/tx/${result.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 text-sm font-mono break-all"
                  >
                    {result.txHash.slice(0, 10)}...
                  </a>
                </div>
              </div>
            </div>

            {/* QR Code */}
            <div className="bg-white rounded-xl p-6 text-center">
              <h3 className="font-bold text-lg mb-4 text-gray-800">
                QR Code for Drug Package
              </h3>
              <div className="inline-block bg-white p-4 rounded-lg shadow-sm">
                <QRCode
                  id="qr-code"
                  value={result.tokenId.toString()}
                  size={200}
                  level="H"
                />
              </div>
              <p className="text-sm text-gray-600 mt-3 mb-4">
                Print this QR code on drug packages for verification
              </p>
              <button
                onClick={downloadQR}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Download QR Code
              </button>
            </div>

            {/* Action Button */}
            <button
              onClick={() => setResult(null)}
              className="w-full mt-6 bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
            >
              Mint Another Batch
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
