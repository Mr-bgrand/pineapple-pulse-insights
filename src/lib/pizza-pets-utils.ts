import axios from 'axios';

export interface PizzaPetStats {
  type: string;
  stage: string;
  weakness: string;
  evolutionRate: string;
  poopRate: string;
  healthRate: string;
  poopIncoming: string;
  diesIn: string;
}

export interface PizzaPetMeta {
  name: string;
  attributes: any[];
  imageUrl: string;
  inscriptionId: string;
}

export interface PizzaPet {
  meta: PizzaPetMeta;
  stats: PizzaPetStats;
}

export const fetchPizzaPets = async (): Promise<PizzaPet[]> => {
  const walletAddress = 'bc1pk0ctmslve0v6eg6snka6em0kmykg2kmtjerk2alv2ncdmw60s4cs2le2w8';
  const baseUrl = 'https://api-mainnet.magiceden.us/v2/ord/btc/tokens';
  const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(`${baseUrl}?ownerAddress=${walletAddress}`)}`;
  const collectionFilter = "pizza-pets";

  try {
    console.log('Fetching Pizza Pets - Starting API call');
    console.log('Using wallet address:', walletAddress);
    console.log('Using base URL:', baseUrl);
    console.log('Using proxy URL:', proxyUrl);
    console.log('Collection filter:', collectionFilter);
    
    const response = await axios.get(proxyUrl);
    console.log('Fetching Pizza Pets - API Response Status:', response.status);
    console.log('Fetching Pizza Pets - API Response Headers:', response.headers);
    console.log('Fetching Pizza Pets - Raw API Response:', JSON.stringify(response.data, null, 2));

    if (!response.data) {
      console.log('No data received from API');
      return [];
    }

    if (!response.data.tokens) {
      console.log('No tokens array found in response');
      return [];
    }

    console.log('Total tokens received:', response.data.tokens.length);

    // Filter for pizza-pets collection
    const pizzaPets = response.data.tokens.filter(token => {
      console.log('Checking token:', token.id);
      console.log('Token collection symbol:', token.collectionSymbol);
      console.log('Token collection details:', token.collection);
      
      const isMatch = token.collectionSymbol === collectionFilter ||
        (token.collection && token.collection.symbol === collectionFilter);
      
      console.log(`Token ${token.id} collection match: ${isMatch}`);
      return isMatch;
    });
    
    console.log('Fetching Pizza Pets - Filtered Pets Count:', pizzaPets.length);
    console.log('Fetching Pizza Pets - Filtered Pets:', JSON.stringify(pizzaPets, null, 2));

    return pizzaPets.map(token => {
      const attributes = token.meta?.attributes || [];
      console.log('Processing Pet Token:', token.id);
      console.log('Token Meta:', token.meta);
      console.log('Token Attributes:', attributes);
      
      const pet = {
        meta: {
          name: token.meta?.name || `Pizza Pet #${token.inscriptionNumber}`,
          attributes: attributes,
          imageUrl: token.meta?.collection_page_img_url || token.contentPreviewURI,
          inscriptionId: token.id,
        },
        stats: {
          type: attributes.find(attr => attr.trait_type === 'Elemental Type')?.value || 'Unknown',
          stage: attributes.find(attr => attr.trait_type === 'Stage of Evolution')?.value || 'Unknown',
          weakness: attributes.find(attr => attr.trait_type === 'Pineapple Weakness')?.value || 'Unknown',
          evolutionRate: 'Loading...',
          poopRate: 'Loading...',
          healthRate: attributes.find(attr => attr.trait_type === 'Hearts Remaining')?.value || 'Unknown',
          poopIncoming: 'Loading...',
          diesIn: 'Loading...',
        }
      };
      
      console.log('Processed Pet Object:', JSON.stringify(pet, null, 2));
      return pet;
    });
  } catch (error) {
    console.error('Error in fetchPizzaPets:', error);
    if (axios.isAxiosError(error)) {
      console.error('Axios Error Details:', {
        message: error.message,
        response: {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          headers: error.response?.headers,
        },
        request: {
          method: error.config?.method,
          url: error.config?.url,
          headers: error.config?.headers,
        }
      });
    }
    throw error;
  }
};