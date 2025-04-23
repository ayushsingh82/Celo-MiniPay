import React from 'react';
import Link from 'next/link';

export default function LocalPaymentsPage() {
  return (
    <div className="container mx-auto px-4 py-12 bg-black text-white min-h-screen">
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
            <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
              Open Scanner
            </button>
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
  );
} 