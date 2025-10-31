'use client';

import { useState } from 'react';

export default function MintForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    batchId: '',
    manufacturer: '',
    expiryDate: '',
    ipfsHash: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
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
  );
}
