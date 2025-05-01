export const BrokerDemoAbi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "propertyId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "ownerName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "stablecoinAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "dailyRent",
				"type": "uint256"
			}
		],
		"name": "PropertyListed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "propertyId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "tenant",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "paymentToken",
				"type": "address"
			}
		],
		"name": "RentPaid",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "BI_POOL_MANAGER",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "CEUR",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "CUSD",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MENTO_ROUTER",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "USDC",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_propertyId",
				"type": "uint256"
			}
		],
		"name": "deactivateProperty",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllOwnersDetails",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "propertyId",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "ownerName",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "stablecoinAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "dailyRent",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "ipfsImageUrl",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "isActive",
						"type": "bool"
					}
				],
				"internalType": "struct BrokerDemo.OwnerDetails[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_propertyId",
				"type": "uint256"
			}
		],
		"name": "getPropertyDetails",
		"outputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "ownerName",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "stablecoinAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "dailyRent",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "ipfsImageUrl",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "isActive",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_ownerName",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_stablecoinAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_dailyRent",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_ipfsImageUrl",
				"type": "string"
			}
		],
		"name": "listProperty",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_propertyId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_days",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_paymentToken",
				"type": "address"
			}
		],
		"name": "payRent",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "properties",
		"outputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "ownerName",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "stablecoinAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "dailyRent",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "ipfsImageUrl",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "isActive",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "propertyCounter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]