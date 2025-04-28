'use client';

import React, { useEffect, useRef, useState } from 'react';

interface CameraTestProps {
  onClose: () => void;
}

const CameraTest: React.FC<CameraTestProps> = ({ onClose }) => {
  const [error, setError] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        console.log("Requesting camera access...");
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        
        console.log("Camera access granted:", stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setCameraActive(true);
        }
      } catch (err: any) {
        console.error("Camera access error:", err);
        setError(`Camera error: ${err.message || err.toString()}`);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-lg max-w-md w-full border border-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-medium text-white">Camera Test</h3>
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
          ) : (
            <div className="text-center text-white mb-4">
              {cameraActive ? 'Camera is active!' : 'Starting camera...'}
            </div>
          )}
          
          <div className="overflow-hidden rounded-lg bg-black" style={{ minHeight: "300px" }}>
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
        
        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CameraTest; 