"use client";

import { Button } from "@/components/ui/button";
import { useWeb3 } from "@/contexts/useWeb3";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const { address, getUserAddress } = useWeb3();
    const router = useRouter();

    useEffect(() => {
        getUserAddress();
    }, [getUserAddress]);

    const navigateToListProperty = () => {
        router.push("/list-property");
    };

    const navigateToBuyProperty = () => {
        router.push("/buy-property");
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen p-4 bg-white text-black">
            {!address ? (
                <div className="text-xl font-bold mb-6">Please install Metamask and connect.</div>
            ) : (
                <>
                    <h1 className="text-3xl font-bold mb-10 text-center">
                        Welcome to MiniPay Property Marketplace
                    </h1>
                    
                    <div className="flex flex-col w-full max-w-md gap-6">
                        <Button 
                            onClick={navigateToListProperty}
                            className="py-6 text-lg bg-blue-600 hover:bg-blue-700 text-white"
                            title="List Property"
                        >
                            List Property
                        </Button>
                        
                        <Button 
                            onClick={navigateToBuyProperty}
                            className="py-6 text-lg bg-green-600 hover:bg-green-700 text-white"
                            title="Buy Property"
                        >
                            Buy Property
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}
