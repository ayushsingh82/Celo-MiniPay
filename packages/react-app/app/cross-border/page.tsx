import React from 'react';
import Link from 'next/link';

export default function CrossBorderPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">Cross-Border Payments</h1>
      
      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <ol className="list-decimal pl-6 space-y-4">
          <li className="text-lg">
            <span className="font-medium">Connect your wallet</span>
            <p className="text-gray-700 mt-1">Securely connect your MiniPay wallet to our platform.</p>
          </li>
          <li className="text-lg">
            <span className="font-medium">Create a payment request</span>
            <p className="text-gray-700 mt-1">Generate a payment link or QR code to share with your international clients.</p>
          </li>
          <li className="text-lg">
            <span className="font-medium">Receive payment in your preferred currency</span>
            <p className="text-gray-700 mt-1">Your client pays in their currency, and you receive it in your local stablecoin.</p>
          </li>
          <li className="text-lg">
            <span className="font-medium">Withdraw or use funds locally</span>
            <p className="text-gray-700 mt-1">Use your funds for local payments or withdraw to your bank account.</p>
          </li>
        </ol>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Create Payment Request</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount
              </label>
              <div className="flex">
                <input 
                  type="number" 
                  className="w-full border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
                <select className="border border-l-0 border-gray-300 rounded-r-md px-3 py-2 bg-gray-50">
                  <option>cUSD</option>
                  <option>cEUR</option>
                  <option>cREAL</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Receive in
              </label>
              <select className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white">
                <option>cKES (Kenyan Shilling)</option>
                <option>cNGN (Nigerian Naira)</option>
                <option>cGHS (Ghanaian Cedi)</option>
                <option>cUSD (US Dollar)</option>
              </select>
            </div>
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Description
            </label>
            <input 
              type="text" 
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Design services for website"
            />
          </div>
          
          <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 w-full md:w-auto">
            Generate Payment Link
          </button>
        </div>
      </div>
      
      <div className="text-center mt-8">
        <Link 
          href="/services/local-payments" 
          className="text-blue-600 hover:underline"
        >
          Learn how to use your funds for local payments →
        </Link>
      </div>
    </div>
  );
}