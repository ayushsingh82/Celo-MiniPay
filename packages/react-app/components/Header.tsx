"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWeb3 } from "@/contexts/useWeb3";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react"; // Import icons for mobile menu

const Header = () => {
  const { address, getUserAddress } = useWeb3();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [network, setNetwork] = useState<string | null>(null);

  useEffect(() => {
    // Get the current network when component mounts
    const getNetwork = async () => {
      if (window.ethereum) {
        try {
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          setNetworkName(chainId);
          
          // Listen for chain changes
          window.ethereum.on('chainChanged', (chainId: string) => {
            setNetworkName(chainId);
            // Reload the page when network changes
            window.location.reload();
          });
        } catch (error) {
          console.error("Error getting network:", error);
        }
      }
    };
    
    getNetwork();
    
    return () => {
      // Clean up event listener
      if (window.ethereum) {
        window.ethereum.removeListener('chainChanged', setNetworkName);
      }
    };
  }, []);

  const setNetworkName = (chainId: string) => {
    switch (chainId) {
      case '0xa4ec':
        setNetwork('Celo');
        break;
      case '0xaef3':
        setNetwork('Alfajores');
        break;
      default:
        setNetwork('Unknown Network');
    }
  };

  const switchToCelo = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xa4ec' }], // Celo Mainnet
        });
      } catch (error: any) {
        // This error code means the chain has not been added to MetaMask
        if (error.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0xa4ec',
                chainName: 'Celo Mainnet',
                nativeCurrency: {
                  name: 'CELO',
                  symbol: 'CELO',
                  decimals: 18,
                },
                rpcUrls: ['https://forno.celo.org'],
                blockExplorerUrls: ['https://explorer.celo.org'],
              },
            ],
          });
        }
      }
    }
  };

  const switchToAlfajores = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xaef3' }], // Alfajores Testnet
        });
      } catch (error: any) {
        // This error code means the chain has not been added to MetaMask
        if (error.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0xaef3',
                chainName: 'Alfajores Testnet',
                nativeCurrency: {
                  name: 'CELO',
                  symbol: 'CELO',
                  decimals: 18,
                },
                rpcUrls: ['https://alfajores-forno.celo-testnet.org'],
                blockExplorerUrls: ['https://alfajores-blockscout.celo-testnet.org'],
              },
            ],
          });
        }
      }
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Navigation links
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Properties", path: "/all-property" },
    { name: "List Property", path: "/list-property" },
    { name: "My Bookings", path: "/my-bookings" },
  ];

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-green-600" onClick={closeMobileMenu}>
              StayChain
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                  pathname === link.path
                    ? "border-green-500 text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Network and Wallet Connection - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Network Dropdown */}
            {network && (
              <div className="relative group">
                <button className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none">
                  <span className="mr-1">{network}</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                  <button
                    onClick={switchToCelo}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Switch to Celo Mainnet
                  </button>
                  <button
                    onClick={switchToAlfajores}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Switch to Alfajores Testnet
                  </button>
                </div>
              </div>
            )}

            {/* Wallet Connection */}
            {address ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  {address.slice(0, 6)}...{address.slice(-4)}
                </span>
                <Button
                  variant="outline"
                  className="border-green-500 text-green-500 hover:bg-green-50"
                >
                  Connected
                </Button>
              </div>
            ) : (
              <Button
                onClick={getUserAddress}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                Connect Wallet
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  pathname === link.path
                    ? "bg-green-50 border-green-500 text-green-700"
                    : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                }`}
                onClick={closeMobileMenu}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          {/* Network Selection - Mobile */}
          {network && (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="px-4">
                <p className="text-sm font-medium text-gray-500 mb-2">Current Network</p>
                <p className="text-sm font-medium text-gray-900 mb-3">{network}</p>
                <div className="space-y-2">
                  <button
                    onClick={switchToCelo}
                    className="w-full text-left block px-4 py-2 text-sm text-gray-700 bg-gray-50 rounded-md hover:bg-gray-100"
                  >
                    Switch to Celo Mainnet
                  </button>
                  <button
                    onClick={switchToAlfajores}
                    className="w-full text-left block px-4 py-2 text-sm text-gray-700 bg-gray-50 rounded-md hover:bg-gray-100"
                  >
                    Switch to Alfajores Testnet
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Wallet Connection - Mobile */}
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              {address ? (
                <div className="flex flex-col w-full">
                  <span className="text-sm font-medium text-gray-500 mb-2">
                    Connected Wallet
                  </span>
                  <span className="text-sm text-gray-700 break-all">
                    {address}
                  </span>
                </div>
              ) : (
                <Button
                  onClick={() => {
                    getUserAddress();
                    closeMobileMenu();
                  }}
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                >
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
