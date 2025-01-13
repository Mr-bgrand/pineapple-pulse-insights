import { toast } from "sonner";
import { PineappleChild } from "../types/pineapple";

const API_KEY = "86151a82-5dd8-4e3a-8a49-422db12d3ab5";

const fetchWithCORS = async (url: string) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      mode: 'no-cors', // Change to no-cors to handle the CORS issue
      credentials: 'omit'
    });
    
    if (!response.ok && response.type !== 'opaque') {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Handle opaque response
    if (response.type === 'opaque') {
      console.log('Received opaque response - this is expected with no-cors mode');
      return null;
    }
    
    return response;
  } catch (error) {
    console.error(`Fetch error for ${url}:`, error);
    return null;
  }
};

export const fetchChildInscriptions = async (inscriptionId: string): Promise<PineappleChild[]> => {
  try {
    console.log(`Fetching children for detonated pineapple ${inscriptionId}`);
    const response = await fetchWithCORS(
      `https://api.ordiscan.com/v1/inscription/${inscriptionId}/children`
    );
    
    if (!response) {
      console.log(`No response for inscription ${inscriptionId} children`);
      return [];
    }

    const data = await response.json();
    return (data.data || []).map((child: any) => ({
      inscriptionId: child.inscription_id,
      timestamp: child.timestamp,
      contentUrl: child.content_url,
    }));
  } catch (error) {
    console.error("Error fetching child inscriptions:", error);
    return [];
  }
};

export const fetchInscriptionDetails = async (inscriptionId: string) => {
  try {
    console.log(`Fetching details for inscription ${inscriptionId}`);
    const response = await fetchWithCORS(
      `https://api.ordiscan.com/v1/inscription/${inscriptionId}`
    );
    
    if (!response) {
      console.log(`No response for inscription ${inscriptionId} details`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching inscription ${inscriptionId}:`, error);
    return null;
  }
};