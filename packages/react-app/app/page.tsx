"use client";

import React from "react";
import Link from "next/link";
import { useWeb3 } from "@/contexts/useWeb3";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home, Calendar, Wallet, Globe } from "lucide-react";

export default function HomePage() {
  const { address } = useWeb3();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-500 to-green-700 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Decentralized Vacation Rentals on the Blockchain
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100">
              Book and list properties globally with crypto payments, no intermediaries, and lower fees.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/all-property">
                <Button className="bg-white text-green-700 hover:bg-green-50 text-lg px-8 py-6 rounded-lg shadow-lg flex items-center">
                  Find Properties
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/list-property">
                <Button className="bg-transparent border-2 border-white hover:bg-white/10 text-white text-lg px-8 py-6 rounded-lg shadow-lg">
                  List Your Property
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose StayChain?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of vacation rentals with blockchain technology
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
            <div className="bg-green-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
              <Wallet className="h-7 w-7 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Crypto Payments</h3>
            <p className="text-gray-600">
              Pay with various cryptocurrencies including USDC, cUSD, cEUR, and more.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
            <div className="bg-green-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
              <Home className="h-7 w-7 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Tokenized Properties</h3>
            <p className="text-gray-600">
              Each property is represented as an NFT, ensuring authenticity and ownership.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
            <div className="bg-green-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
              <Calendar className="h-7 w-7 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Smart Bookings</h3>
            <p className="text-gray-600">
              Automated bookings and payments through smart contracts with no intermediaries.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
            <div className="bg-green-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
              <Globe className="h-7 w-7 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Global Access</h3>
            <p className="text-gray-600">
              Book properties worldwide with lower fees and transparent transactions.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-green-600 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-12 md:p-12 md:flex items-center justify-between">
              <div className="md:w-2/3 mb-8 md:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to experience decentralized stays?
                </h2>
                <p className="text-green-100 text-xl">
                  {address ? 
                    "Browse available properties and start your journey today!" : 
                    "Connect your wallet to browse properties and start your journey!"}
                </p>
              </div>
              <div>
                <Link href={address ? "/all-property" : "#"}>
                  <Button 
                    className="bg-white text-green-700 hover:bg-green-50 text-lg px-8 py-6 rounded-lg shadow-lg w-full md:w-auto"
                    onClick={address ? undefined : () => document.getElementById('connect-wallet')?.click()}
                  >
                    {address ? "Explore Properties" : "Connect Wallet"}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials/Stats Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Transforming Vacation Rentals</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join the growing community of hosts and travelers using blockchain technology
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
            <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
            <p className="text-gray-700 text-lg">Secure Transactions</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
            <div className="text-4xl font-bold text-green-600 mb-2">5%</div>
            <p className="text-gray-700 text-lg">Lower Fees Than Traditional Platforms</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
            <div className="text-4xl font-bold text-green-600 mb-2">24/7</div>
            <p className="text-gray-700 text-lg">Global Availability</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How StayChain Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple steps to book or list your property on the blockchain
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 h-full">
                <div className="absolute -top-4 -left-4 bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">1</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 mt-4">Connect Your Wallet</h3>
                <p className="text-gray-600">
                  Link your cryptocurrency wallet to access the StayChain platform securely.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 h-full">
                <div className="absolute -top-4 -left-4 bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">2</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 mt-4">Browse or List Properties</h3>
                <p className="text-gray-600">
                  Search for your next stay or list your property to earn crypto from rentals.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 h-full">
                <div className="absolute -top-4 -left-4 bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">3</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 mt-4">Book or Receive Payments</h3>
                <p className="text-gray-600">
                  Complete transactions with smart contracts for secure, automated bookings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Start Your Blockchain Travel Experience Today
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Join the revolution in vacation rentals with StayChain
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/all-property">
            <Button className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6 rounded-lg shadow-lg">
              Explore Properties
            </Button>
          </Link>
          <Link href="/list-property">
            <Button className="bg-white border-2 border-green-600 text-green-600 hover:bg-green-50 text-lg px-8 py-6 rounded-lg shadow-lg">
              Become a Host
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
