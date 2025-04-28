'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamically import the components
const QRScanner = dynamic(() => import('../../../components/QRScanner'), {
  ssr: false,
});

const CameraTest = dynamic(() => import('../../../components/CameraTest'), {
  ssr: false,
});

export default function LocalPaymentsPage() {
  const [showScanner, setShowScanner] = useState(false);
  const [showCameraTest, setShowCameraTest] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState<number | null>(null);
  const [merchantName, setMerchantName] = useState<string | null>(null);

  const handleScan = (data: string) => {
    console.log("QR code scanned:", data);
    try {
      // Assuming QR code contains JSON data with payment info
      const paymentData = JSON.parse(data);
      setMerchantName(paymentData.merchant || 'Unknown Merchant');
      setPaymentAmount(paymentData.amount || 0);
      setScanResult(data);
      setShowScanner(false);
      setShowPaymentConfirmation(true);
    } catch (error) {
      // If not JSON, just use the raw data
      console.log("Error parsing QR data:", error);
      setScanResult(data);
      setMerchantName('Unknown Merchant');
      setPaymentAmount(100); // Default amount for demo
      setShowScanner(false);
      setShowPaymentConfirmation(true);
    }
  };

  const handleConfirmPayment = () => {
    // Here you would process the actual payment
    setShowPaymentConfirmation(false);
    
    // Add the transaction to the list (in a real app, this would come from a database)
    // For demo purposes, we're just showing the confirmation
    alert(`Payment of ${paymentAmount} cKES to ${merchantName} successful!`);
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-12 text-white">
        <h1 className="text-4xl font-bold mb-6">Local Payments</h1>
        
        <div className="bg-gray-900 p-6 rounded-lg mb-8 border border-gray-800">
          <h2 className="text-2xl font-semibold mb-4 text-green-400">Everyday Payments Made Simple</h2>
          <p className="text-lg mb-4 text-gray-300">
            Use your stablecoins for everyday transactions in your local economy without the need for cash.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gray-800 p-5 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-green-900 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2 text-white">Transportation</h3>
              <p className="text-gray-400">Pay for taxis, buses, and other transport by scanning QR codes. No more fumbling for cash.</p>
            </div>
            
            <div className="bg-gray-800 p-5 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-green-900 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2 text-white">Retail Shopping</h3>
              <p className="text-gray-400">Shop at local stores and pay with your stablecoins. Many merchants now accept digital payments.</p>
            </div>
            
            <div className="bg-gray-800 p-5 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-green-900 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2 text-white">Split Bills</h3>
              <p className="text-gray-400">Easily split restaurant bills or shared expenses with friends and family.</p>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-green-400">Scan & Pay</h2>
          <div className="bg-gray-900 p-6 rounded-lg shadow-md border border-gray-800">
            <div className="text-center mb-6">
              <p className="text-lg mb-4 text-gray-300">Scan a QR code to make a payment to a local merchant or service provider.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button 
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
                  onClick={() => {
                    console.log("Opening scanner...");
                    setShowScanner(true);
                  }}
                >
                  Open Scanner
                </button>
                <button 
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                  onClick={() => {
                    console.log("Testing camera...");
                    setShowCameraTest(true);
                  }}
                >
                  Test Camera Access
                </button>
              </div>
            </div>
            
            <div className="border-t border-gray-700 pt-6 mt-6">
              <h3 className="text-lg font-medium mb-4 text-white">Recent Transactions</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-800 rounded-md">
                  <div>
                    <p className="font-medium text-white">Taxi Ride</p>
                    <p className="text-sm text-gray-400">Today, 2:30 PM</p>
                  </div>
                  <p className="font-medium text-red-400">-250 cKES</p>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-800 rounded-md">
                  <div>
                    <p className="font-medium text-white">Local Market</p>
                    <p className="text-sm text-gray-400">Yesterday, 10:15 AM</p>
                  </div>
                  <p className="font-medium text-red-400">-450 cKES</p>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-800 rounded-md">
                  <div>
                    <p className="font-medium text-white">From John (Split Bill)</p>
                    <p className="text-sm text-gray-400">Yesterday, 8:30 PM</p>
                  </div>
                  <p className="font-medium text-green-400">+320 cKES</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <Link 
            href="/services/cross-border" 
            className="text-green-400 hover:underline"
          >
            Need to receive international payments? Learn about our cross-border services →
          </Link>
        </div>
      </div>

      {/* QR Scanner Modal */}
      {showScanner && (
        <QRScanner 
          onScan={handleScan}
          onClose={() => {
            console.log("Closing scanner...");
            setShowScanner(false);
          }}
        />
      )}

      {/* Camera Test Modal */}
      {showCameraTest && (
        <CameraTest 
          onClose={() => {
            console.log("Closing camera test...");
            setShowCameraTest(false);
          }}
        />
      )}

      {/* Payment Confirmation Modal */}
      {showPaymentConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg max-w-md w-full border border-gray-800">
            <h3 className="text-xl font-medium text-white mb-4">Confirm Payment</h3>
            
            <div className="bg-gray-800 p-4 rounded-md mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Merchant:</span>
                <span className="text-white font-medium">{merchantName}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Amount:</span>
                <span className="text-white font-medium">{paymentAmount} cKES</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Date:</span>
                <span className="text-white font-medium">{new Date().toLocaleString()}</span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowPaymentConfirmation(false)}
                className="flex-1 bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPayment}
                className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 