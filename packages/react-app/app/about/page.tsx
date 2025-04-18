import React from 'react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">About Us</h1>
      <p className="text-lg mb-4">
        Welcome to our platform! We're dedicated to making blockchain technology accessible to everyone.
      </p>
      <p className="text-lg mb-4">
        Our mission is to provide simple, secure, and user-friendly tools for interacting with the Celo blockchain.
      </p>
      <div className="mt-8 p-6 bg-gray-100 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Our Features</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Easy wallet connection</li>
          <li>Secure transactions</li>
          <li>User-friendly interface</li>
          <li>Fast and reliable service</li>
        </ul>
      </div>
    </div>
  );
}