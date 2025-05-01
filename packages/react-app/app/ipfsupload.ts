import axios from 'axios';

const PINATA_JWT = process.env.NEXT_PUBLIC_PINATA_JWT;

export async function uploadToPinata(file: File) {
  try {
    // Create form data
    const formData = new FormData();
    formData.append('file', file);

    // Upload to Pinata
    const response = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      formData,
      {
        maxBodyLength: Infinity,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${PINATA_JWT}`
        },
      }
    );

    // Return the IPFS hash (CID)
    return response.data.IpfsHash;
  } catch (error: any) {
    console.error('Error details:', {
      message: error.message,
      response: error.response?.data,
      jwt: PINATA_JWT ? 'Present' : 'Missing'
    });
    throw error;
  }
}

// Function to create metadata and upload to Pinata
export async function uploadMetadataToPinata(metadata: any) {
  try {
    const response = await axios.post(
      'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      metadata,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${PINATA_JWT}`
        },
      }
    );

    return response.data.IpfsHash;
  } catch (error) {
    console.error('Error uploading metadata to Pinata:', error);
    throw error;
  }
}
