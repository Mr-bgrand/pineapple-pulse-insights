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
      mode: 'cors', // Try with regular CORS first
      credentials: 'omit'
    });
    
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return null;
    }
    
    return response;
  } catch (error) {
    console.error(`Fetch error for ${url}:`, error);
    // If CORS error, try with proxy
    if (error instanceof TypeError && error.message.includes('CORS')) {
      try {
        // Use a CORS proxy
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
        const proxyResponse = await fetch(proxyUrl);
        
        if (!proxyResponse.ok) {
          console.error(`Proxy HTTP error! status: ${proxyResponse.status}`);
          return null;
        }
        
        return proxyResponse;
      } catch (proxyError) {
        console.error(`Proxy fetch error for ${url}:`, proxyError);
        return null;
      }
    }
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