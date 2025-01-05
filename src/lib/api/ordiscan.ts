import { toast } from "sonner";
import { PineappleChild } from "../types/pineapple";

const API_KEY = "5dcbe0d2-91bd-485c-975b-317c1c2365a4";

export const fetchChildInscriptions = async (inscriptionId: string): Promise<PineappleChild[]> => {
  try {
    const response = await fetch(
      `https://ordiscan.com/api/v1/inscriptions/${inscriptionId}/children`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
        mode: 'no-cors'
      }
    );

    // Handle opaque response (no-cors mode)
    if (response.type === 'opaque') {
      console.log(`Received opaque response for child inscriptions of ${inscriptionId}`);
      return [];
    }

    // Handle non-ok responses
    if (!response.ok) {
      console.error(`Error fetching child inscriptions: ${response.status} ${response.statusText}`);
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
    toast.error("Failed to fetch child inscriptions");
    return [];
  }
};

export const fetchInscriptionDetails = async (inscriptionId: string) => {
  try {
    const response = await fetch(
      `https://ordiscan.com/api/v1/inscriptions/${inscriptionId}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
        mode: 'no-cors'
      }
    );

    // Handle opaque response
    if (response.type === 'opaque') {
      console.log(`Received opaque response for inscription ${inscriptionId}`);
      return null;
    }

    // Handle non-ok responses
    if (!response.ok) {
      console.error(`Error fetching inscription details: ${response.status} ${response.statusText}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching inscription ${inscriptionId}:`, error);
    return null;
  }
};