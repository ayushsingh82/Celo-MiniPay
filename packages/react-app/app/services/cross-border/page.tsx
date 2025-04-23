import React from 'react';
import Link from 'next/link';

export default function CrossBorderPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-12 text-white">
        <h1 className="text-4xl font-bold mb-6">Cross-Border Payments</h1>
        
        <div className="bg-gray-900 p-6 rounded-lg mb-8 border border-gray-800">
          <h2 className="text-2xl font-semibold mb-4 text-blue-400">International Payments Made Simple</h2>
          <p className="text-lg mb-4 text-gray-300">
            Send and receive money across borders without high fees, delays, or currency conversion headaches.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gray-800 p-5 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2 text-white">Instant Currency Conversion</h3>
              <p className="text-gray-400">Get paid in your local currency regardless of what currency your clients use. No more waiting for bank conversions.</p>
            </div>
            
            <div className="bg-gray-800 p-5 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2 text-white">Secure Transactions</h3>
              <p className="text-gray-400">All payments are secured by blockchain technology. No more worrying about payment fraud or chargebacks.</p>
            </div>
            
            <div className="bg-gray-800 p-5 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2 text-white">Fast Settlement</h3>
              <p className="text-gray-400">Receive payments in minutes instead of days. No more waiting for international wire transfers to clear.</p>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-400">Create Payment Request</h2>
          <div className="bg-gray-900 p-6 rounded-lg shadow-md border border-gray-800">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Amount
                </label>
                <div className="flex">
                  <input 
                    type="number" 
                    className="w-full border border-gray-700 bg-gray-800 text-white rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                    defaultValue="100"
                  />
                  <select className="border border-l-0 border-gray-700 bg-gray-800 text-white rounded-r-md px-3 py-2">
                    <option>cUSD</option>
                    <option>cEUR</option>
                    <option>cREAL</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Receive in
                </label>
                <select className="w-full border border-gray-700 bg-gray-800 text-white rounded-md px-4 py-2">
                  <option>cKES (Kenyan Shilling)</option>
                  <option>cNGN (Nigerian Naira)</option>
                  <option>cGHS (Ghanaian Cedi)</option>
                  <option>cUSD (US Dollar)</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Recipient's Wallet Address
              </label>
              <input 
                type="text" 
                className="w-full border border-gray-700 bg-gray-800 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0x..."
              />
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Payment Description
              </label>
              <input 
                type="text" 
                className="w-full border border-gray-700 bg-gray-800 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Design services for website"
              />
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-700">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <p className="text-gray-300 mb-1">Exchange Rate</p>
                  <p className="text-white font-medium">1 cUSD = 145.32 cKES</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <p className="text-gray-300 mb-1">Recipient Gets</p>
                  <p className="text-white font-medium text-xl">14,532 cKES</p>
                </div>
              </div>
              
              <button className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 w-full md:w-auto font-medium">
                Transfer Now
              </button>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <Link 
            href="/services/local-payments" 
            className="text-blue-400 hover:underline"
          >
            Learn how to use your funds for local payments →
          </Link>
        </div>
      </div>
    </div>
  );
} 