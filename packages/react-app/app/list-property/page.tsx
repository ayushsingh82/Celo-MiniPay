"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useWeb3 } from "@/contexts/useWeb3";
import { useRouter } from "next/navigation";
import { createPublicClient, http, createWalletClient, custom } from 'viem';
import { celoMainnet } from 'viem/chains';
import { BrokerDemoAbi } from '../abi';
import { uploadToPinata } from '../ipfsupload';

// Remove old IPFS configuration and replace with Viem client setup
const publicClient = createPublicClient({
  chain: celoMainnet,
  transport: http('https://forno.celo.org')
});

interface Currency {
  name: string;
  symbol: string;
  address: string;
}

const ListPropertyPage = () => {
  const { address, getUserAddress } = useWeb3();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const currencies: Currency[] = [
    { name: 'USDC', symbol: 'USDC', address: '0xcebA9300f2b948710d2653dD7B07f33A8B32118C' },
    { name: 'Celo Dollar', symbol: 'cUSD', address: '0x765DE816845861e75A25fCA122bb6898B8B1282a' },
    { name: 'Celo Euro', symbol: 'cEUR', address: '0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73' },
    { name: 'Celo Real', symbol: 'cREAL', address: '0xe8537a3d056DA446677B9E9d6c5dB704EaAb4787' },
    { name: 'Celo XOF', symbol: 'eXOF', address: '0x73F93dcc49cB8A239e2032663e9475dd5ef29A08' },
    { name: 'Celo KES', symbol: 'cKES', address: '0x456a3D042C0DbD3db53D5489e98dFb038553B0d0' },
  ];
  
  const [formData, setFormData] = useState({
    propertyName: '',
    rentPerDay: '',
    currency: 'USDC',
    imageFile: null as File | null,
    imagePreview: ''
  });

  useEffect(() => {
    getUserAddress();
  }, [getUserAddress]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCurrencyChange = (value: string) => {
    setFormData(prev => ({ ...prev, currency: value }));
    
    // Log the selected currency address
    const selectedCurrency = currencies.find(c => c.symbol === value);
    console.log(`Selected currency address: ${selectedCurrency?.address}`);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          imageFile: file,
          imagePreview: reader.result as string
        }));
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.imageFile) {
      alert("Please select an image for your property");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Get the selected currency address
      const selectedCurrency = currencies.find(c => c.symbol === formData.currency);
      if (!selectedCurrency) {
        throw new Error("Selected currency not found");
      }

      // 1. Upload the image to Pinata
      const ipfsHash = await uploadToPinata(formData.imageFile);
      const ipfsUrl = `ipfs://${ipfsHash}`;

      // 2. Create wallet client
      if (!window.ethereum) throw new Error("No crypto wallet found");
      
      const walletClient = createWalletClient({
        chain: celoMainnet,
        transport: custom(window.ethereum)
      });

      // Get the user's address
      const [address] = await walletClient.requestAddresses();

      // 3. Prepare contract data
      const contractAddress = '0xe9980A142D5D3610a4a32693d4325b563DFe6404' as `0x${string}`;
      
      // 4. Convert rent to wei (assuming 18 decimals)
      const rentInWei = BigInt(parseFloat(formData.rentPerDay) * 1e18);

      // 5. Call the listProperty function with correct parameters
      const { request } = await publicClient.simulateContract({
        address: contractAddress,
        abi: BrokerDemoAbi,
        functionName: 'listProperty',
        args: [
          formData.propertyName,           // _ownerName
          selectedCurrency.address as `0x${string}`,  // _stablecoinAddress
          rentInWei,                       // _dailyRent
          ipfsUrl                          // _ipfsImageUrl
        ],
        account: address,
      });

      const hash = await walletClient.writeContract(request);
      
      // 6. Wait for the transaction to be mined
      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      
      // Success! Redirect to the properties page
      alert("Property listed successfully!");
      router.push("/all-property");
      
    } catch (error) {
      console.error("Error listing property:", error);
      alert("Error listing property. Please try again.");
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  if (!address) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white text-black">
        <div className="text-xl font-bold">Please connect your wallet to list a property</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-white text-black">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">List Your Property</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Property Image */}
          <div className="space-y-2">
            <Label htmlFor="propertyImage">Property Image</Label>
            <Input 
              id="propertyImage" 
              type="file" 
              accept="image/*"
              onChange={handleImageChange}
              className="cursor-pointer"
              disabled={isSubmitting}
            />
            {formData.imagePreview && (
              <div className="mt-2 relative w-full h-64 rounded-md overflow-hidden">
                <img 
                  src={formData.imagePreview} 
                  alt="Property preview" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
          
          {/* Property Name */}
          <div className="space-y-2">
            <Label htmlFor="propertyName">Property Name</Label>
            <Input 
              id="propertyName"
              name="propertyName"
              value={formData.propertyName}
              onChange={handleInputChange}
              placeholder="Enter property name"
              required
              disabled={isSubmitting}
            />
          </div>
          
          {/* Rent Per Day */}
          <div className="space-y-2">
            <Label htmlFor="rentPerDay">Rent Per Day</Label>
            <Input 
              id="rentPerDay"
              name="rentPerDay"
              type="number"
              min="0"
              step="0.01"
              value={formData.rentPerDay}
              onChange={handleInputChange}
              placeholder="0.00"
              required
              disabled={isSubmitting}
            />
          </div>
          
          {/* Currency Selection */}
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select 
              value={formData.currency} 
              onValueChange={handleCurrencyChange}
              defaultValue="USDC"
              disabled={isSubmitting}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.symbol} value={currency.symbol}>
                    {currency.name} ({currency.symbol})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Submit Button */}
          <Button 
            type="submit" 
            className={`w-full py-6 text-lg ${isSubmitting ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'} text-white`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {uploadProgress > 0 ? `Uploading... ${uploadProgress}%` : 'Processing...'}
              </>
            ) : (
              'List Property'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ListPropertyPage;