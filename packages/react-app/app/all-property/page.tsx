"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createPublicClient, http } from 'viem'
import { celoMainnet } from 'viem/chains'
import { BrokerDemoAbi } from '../abi';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Property {
  id: number;
  owner: string;
  ownerName: string;
  stablecoinAddress: string;
  dailyRent: string;
  ipfsImageUrl: string;
  isActive: boolean;
  currencySymbol: string;
}

const AllPropertiesPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  const publicClient = createPublicClient({
    chain: celoMainnet,
    transport: http('https://forno.celo.org')
  });

  const currencyMap: { [key: string]: string } = {
    '0xcebA9300f2b948710d2653dD7B07f33A8B32118C': 'USDC',
    '0x765DE816845861e75A25fCA122bb6898B8B1282a': 'cUSD',
    '0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73': 'cEUR',
    '0xe8537a3d056DA446677B9E9d6c5dB704EaAb4787': 'cREAL',
    '0x73F93dcc49cB8A239e2032663e9475dd5ef29A08': 'eXOF',
    '0x456a3D042C0DbD3db53D5489e98dFb038553B0d0': 'cKES',
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const result = await publicClient.readContract({
          address: '0xe9980A142D5D3610a4a32693d4325b563DFe6404',
          abi: BrokerDemoAbi,
          functionName: 'getAllOwnersDetails',
        });

        const propertiesArray = result.map((property: any) => ({
          id: Number(property.propertyId),
          owner: property.owner,
          ownerName: property.ownerName,
          stablecoinAddress: property.stablecoinAddress,
          dailyRent: (Number(property.dailyRent) / 1e18).toString(),
          ipfsImageUrl: property.ipfsImageUrl,
          isActive: property.isActive,
          currencySymbol: currencyMap[property.stablecoinAddress.toLowerCase()] || 'Unknown'
        }));
        
        setProperties(propertiesArray);
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError('Failed to load properties. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleBookProperty = (propertyId: number) => {
    router.push(`/book-property/${propertyId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white text-black">
        <div className="text-xl font-bold">Loading properties...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white text-black">
        <div className="text-xl font-bold text-red-500">{error}</div>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-white text-black gap-4">
        <div className="text-xl font-bold">No properties found</div>
        <Link href="/list-property">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            List Your Property
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">All Properties</h1>
          <Link href="/list-property">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              List Your Property
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div 
              key={property.id} 
              className="border rounded-lg overflow-hidden shadow-md bg-white"
            >
              {property.ipfsImageUrl ? (
                <img 
                  src={property.ipfsImageUrl} 
                  alt={`Property ${property.id}`} 
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No image available</span>
                </div>
              )}
              
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">Property #{property.id}</h2>
                <p className="text-gray-600 mb-1">Owner: {property.ownerName}</p>
                <p className="text-gray-600 mb-1">
                  Daily Rent: {property.dailyRent} {property.currencySymbol}
                </p>
                <p className="text-gray-600 mb-4">
                  Status: {property.isActive ? 
                    <span className="text-green-600">Available</span> : 
                    <span className="text-red-600">Not Available</span>
                  }
                </p>
                
                {property.isActive && (
                  <Button 
                    onClick={() => handleBookProperty(property.id)}
                    className="w-full bg-green-500 hover:bg-green-600 text-white"
                  >
                    Book Now
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllPropertiesPage;