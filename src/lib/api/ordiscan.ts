import { toast } from "sonner";
import { PineappleChild } from "../types/pineapple";

const API_KEY = "86151a82-5dd8-4e3a-8a49-422db12d3ab5";

const handleOpaqueResponse = (response: Response, inscriptionId: string) => {
  if (response.type === 'opaque') {
    console.log(`Received opaque response for inscription ${inscriptionId} - this is expected with no-cors mode`);
    return null;
  }
  return response;
};

export const fetchChildInscriptions = async (inscriptionId: string): Promise<PineappleChild[]> => {
  try {
    const response = await fetch(
      `https://api.ordiscan.com/v1/inscription/${inscriptionId}/children`,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const handledResponse = handleOpaqueResponse(response, inscriptionId);
    if (!handledResponse) {
      return [];
    }

    if (!handledResponse.ok) {
      console.error(`Error fetching child inscriptions: ${handledResponse.status} ${handledResponse.statusText}`);
      return [];
    }

    const data = await handledResponse.json();
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
    const response = await fetch(
      `https://api.ordiscan.com/v1/inscription/${inscriptionId}`,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const handledResponse = handleOpaqueResponse(response, inscriptionId);
    if (!handledResponse) {
      return null;
    }

    if (!handledResponse.ok) {
      console.error(`Error fetching inscription details: ${handledResponse.status} ${handledResponse.statusText}`);
      return null;
    }

    return await handledResponse.json();
  } catch (error) {
    console.error(`Error fetching inscription ${inscriptionId}:`, error);
    return null;
  }
};