'use client';

import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function QRScanner({ onScan, onReady }) {
  const scannerRef = useRef(null);
  const [error, setError] = useState(null);
  const [isStarted, setIsStarted] = useState(false);

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      stream.getTracks().forEach(track => track.stop());
      initializeScanner();
    } catch (err) {
      setError('❌ Camera access denied. Please allow camera access in browser settings.');
    }
  };

  const initializeScanner = () => {
    setIsStarted(true);
    
    setTimeout(() => {
      if (!scannerRef.current) {
        scannerRef.current = new Html5QrcodeScanner(
          'qr-reader',
          { 
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0
          },
          false
        );

        scannerRef.current.render(
          (decodedText) => {
            console.log('✅ QR Code detected:', decodedText);
            onScan(decodedText);
            if (scannerRef.current) {
              scannerRef.current.clear().catch(console.error);
            }
          },
          (errorMessage) => {
            // FIX: Check if errorMessage is string and ignore "NotFoundException"
            if (typeof errorMessage === 'string' && !errorMessage.includes('NotFoundException')) {
              console.warn('QR Error:', errorMessage);
            }
          }
        );

        if (onReady) {
          setTimeout(() => onReady(), 1000);
        }
      }
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
        scannerRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full">
      {!isStarted && !error && (
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 text-center border-2 border-blue-200">
          <div className="text-6xl mb-4 animate-bounce">📸</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Ready to Scan QR Code?
          </h3>
          <p className="text-gray-600 mb-6 text-sm">
            Click the button below to activate your camera.<br />
            Point at the QR code on the medicine package.
          </p>
          <button
            onClick={requestCameraPermission}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            🎥 Activate Camera
          </button>
          <p className="text-xs text-gray-500 mt-4 flex items-center justify-center gap-2">
            <span>🔒</span>
            <span>Your camera feed is private and secure</span>
          </p>
        </div>
      )}
      
      {isStarted && (
        <div className="bg-white rounded-xl p-4 shadow-inner">
          <div id="qr-reader" className="rounded-lg overflow-hidden"></div>
          <p className="text-center text-sm text-gray-600 mt-3">
            📱 Point your camera at the QR code on the medicine package
          </p>
        </div>
      )}
      
      {error && (
        <div className="mt-4 p-6 bg-red-50 border-2 border-red-200 rounded-xl">
          <div className="flex items-start gap-3">
            <span className="text-3xl">⚠️</span>
            <div className="flex-1">
              <p className="text-red-800 font-semibold mb-2">{error}</p>
              <div className="space-y-2 text-sm text-red-700">
                <p><strong>To fix camera access:</strong></p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>Click the 🔒 lock icon in browser address bar</li>
                  <li>Find "Camera" permissions</li>
                  <li>Change to "Allow"</li>
                  <li>Refresh the page</li>
                </ol>
              </div>
              <button
                onClick={() => {
                  setError(null);
                  setIsStarted(false);
                }}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
