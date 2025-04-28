'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

interface QRScannerProps {
  onScan: (data: string) => void;
  onClose: () => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScan, onClose }) => {
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const scannerId = "html5-qrcode-scanner";
    let scannerElement = document.getElementById(scannerId);
    
    if (!scannerElement) {
      scannerElement = document.createElement("div");
      scannerElement.id = scannerId;
      containerRef.current.appendChild(scannerElement);
    }
    
    scannerRef.current = new Html5Qrcode(scannerId);
    
    const startScanning = async () => {
      try {
        await scannerRef.current?.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            onScan(decodedText);
            if (scannerRef.current) {
              scannerRef.current.stop().catch(err => console.error("Error stopping scanner:", err));
            }
          },
          (errorMessage) => {
            console.warn(errorMessage);
          }
        );
      } catch (err: any) {
        console.error("Scanner error:", err);
        setError(err.toString());
      }
    };
    
    startScanning();
    
    return () => {
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().catch(err => console.error("Error stopping scanner:", err));
      }
    };
  }, [onScan]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-lg max-w-md w-full border border-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-medium text-white">Scan QR Code</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="relative">
          {error ? (
            <div className="bg-red-900 text-white p-4 rounded-md mb-4">
              {error}
              <div className="mt-2">
                <button 
                  onClick={() => window.location.reload()}
                  className="underline text-white"
                >
                  Refresh and try again
                </button>
              </div>
            </div>
          ) : null}
          
          <div ref={containerRef} className="overflow-hidden rounded-lg bg-black" style={{ minHeight: "300px" }}>
            {/* Scanner will be mounted here */}
          </div>
          
          <p className="text-gray-400 mt-4 text-center">
            Position the QR code within the frame to scan
          </p>
        </div>
        
        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRScanner; 