import Link from 'next/link';

export default function BatchCard({ batch }) {
  const isValid = batch.isValid && !batch.isRecalled;
  
  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition ${
      isValid ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'
    }`}>
      {/* Status Badge */}
      <div className="flex justify-between items-start mb-4">
        <span className={`status-badge ${isValid ? 'status-valid' : 'status-invalid'}`}>
          {isValid ? '✓ Valid' : batch.isRecalled ? '⚠ Recalled' : '⏰ Expired'}
        </span>
        <span className="text-sm text-gray-500">#{batch.tokenId}</span>
      </div>

      {/* Batch Details */}
      <div className="space-y-3">
        <div>
          <p className="text-xs text-gray-500">Batch ID</p>
          <p className="font-bold text-gray-800">{batch.batchId}</p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Manufacturer</p>
          <p className="font-semibold text-gray-700">{batch.manufacturer}</p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Expiry Date</p>
          <p className="text-sm text-gray-600">
            {new Date(batch.expiryDate).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* View Details Button */}
      <Link
        href={`/batch/${batch.tokenId}`}
        className="mt-4 block text-center bg-blue-50 text-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-100 transition"
      >
        View Details →
      </Link>
    </div>
  );
}
