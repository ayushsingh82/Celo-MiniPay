"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useWeb3 } from "@/contexts/useWeb3";
import { useRouter } from "next/navigation";

interface Currency {
  name: string;
  symbol: string;
  address: string;
}

const ListPropertyPage = () => {
  const { address, getUserAddress } = useWeb3();
  const router = useRouter();
  
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
    description: '',
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
    console.log(`${name}: ${value}`);
  };

  const handleCurrencyChange = (value: string) => {
    setFormData(prev => ({ ...prev, currency: value }));
    console.log(`currency: ${value}`);
    
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
      console.log(`image: ${file.name}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get the selected currency address
    const selectedCurrency = currencies.find(c => c.symbol === formData.currency);
    
    // Log all form data
    console.log("Form submission:", {
      propertyName: formData.propertyName,
      description: formData.description,
      rentPerDay: formData.rentPerDay,
      currency: formData.currency,
      currencyAddress: selectedCurrency?.address,
      imageFile: formData.imageFile?.name
    });
    
    // Here you would typically:
    // 1. Upload the image to IPFS or similar storage
    // 2. Create metadata JSON with property details
    // 3. Mint the NFT with the metadata URI
    // 4. List the property on your marketplace contract
    
    // For now, we'll just show a success message
    alert("Property listed successfully!");
    router.push("/");
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
            />
          </div>
          
          {/* Property Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your property"
              rows={4}
              required
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
            />
          </div>
          
          {/* Currency Selection */}
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select 
              value={formData.currency} 
              onValueChange={handleCurrencyChange}
              defaultValue="USDC"
            >
              {currencies.map((currency) => (
                <SelectItem key={currency.symbol} value={currency.symbol}>
                  {currency.name} ({currency.symbol})
                </SelectItem>
              ))}
            </Select>
          </div>
          
          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full py-6 text-lg bg-green-400 hover:bg-green-500 text-black"
            onClick={() => {}}
          >
            List Property
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ListPropertyPage;