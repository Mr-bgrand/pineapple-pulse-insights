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
    const { data } = await axios.get(proxyUrl);
    console.log('Fetching Pizza Pets - Raw API Response:', data);

    // Filter for pizza-pets collection
    const pizzaPets = data.tokens.filter(token => 
      token.collectionSymbol === collectionFilter ||
      (token.collection && token.collection.symbol === collectionFilter)
    );
    
    console.log('Fetching Pizza Pets - Filtered Pets:', pizzaPets);

    return pizzaPets.map(token => {
      const attributes = token.meta?.attributes || [];
      console.log('Processing Pet Token:', token.id, 'Attributes:', attributes);
      
      return {
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
    });
  } catch (error) {
    console.error('Error in fetchPizzaPets:', error);
    throw error;
  }
};