import { toast } from "sonner";
import { PineappleChild } from "../types/pineapple";

const API_KEY = "5dcbe0d2-91bd-485c-975b-317c1c2365a4";

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
      `https://ordiscan.com/api/v1/inscriptions/${inscriptionId}/children`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
        mode: 'no-cors'
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
      `https://ordiscan.com/api/v1/inscriptions/${inscriptionId}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
        mode: 'no-cors'
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