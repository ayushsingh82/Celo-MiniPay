import React from 'react';
import Link from 'next/link';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-12 text-white">
        <h1 className="text-4xl font-bold mb-8">Our Services</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-900 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-800">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">Cross-Border Payments</h2>
            <p className="mb-4 text-gray-300">Send and receive money internationally without the high fees and long waiting times.</p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-300">
              <li>Freelancers can receive payments from international clients</li>
              <li>Lock in exchange rates while waiting for payments</li>
              <li>Convert between multiple stablecoins instantly</li>
            </ul>
            <Link 
              href="/services/cross-border" 
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Learn More
            </Link>
          </div>
          
          <div className="bg-gray-900 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-800">
            <h2 className="text-2xl font-semibold mb-4 text-green-400">Local Payments</h2>
            <p className="mb-4 text-gray-300">Use stablecoins for your everyday transactions in your local economy.</p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-300">
              <li>Pay for transportation with QR codes</li>
              <li>Split bills with friends and family</li>
              <li>Pay merchants without carrying cash</li>
            </ul>
            <Link 
              href="/services/local-payments" 
              className="inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 