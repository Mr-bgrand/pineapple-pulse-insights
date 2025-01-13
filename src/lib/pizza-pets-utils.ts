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
    console.log(`Fetching Pizza Pets for wallet: ${walletAddress}`);
    const { data } = await axios.get(proxyUrl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    const tokens = data.tokens || data || [];
    console.log('Raw token data:', tokens);

    const filteredTokens = tokens.filter(token => 
      token.collectionSymbol === collectionFilter || 
      (token.collection && token.collection.symbol === collectionFilter)
    );

    if (filteredTokens.length === 0) {
      console.log(`No tokens found in the collection "${collectionFilter}".`);
      return [];
    }

    console.log(`Found ${filteredTokens.length} tokens in the collection "${collectionFilter}".`);

    return filteredTokens.map(token => ({
      meta: {
        name: token.meta?.name || `Token ID: ${token.inscriptionNumber}` || 'Unknown',
        attributes: token.meta?.attributes || [],
        imageUrl: token.meta?.collection_page_img_url || token.contentPreviewURI || '',
        inscriptionId: token.id || '',
      },
      stats: {
        type: token.meta?.attributes?.find(attr => attr.trait_type === 'Elemental Type')?.value || 'Loading...',
        stage: token.meta?.attributes?.find(attr => attr.trait_type === 'Stage of Evolution')?.value || 'Loading...',
        weakness: token.meta?.attributes?.find(attr => attr.trait_type === 'Pineapple Weakness')?.value || 'Loading...',
        evolutionRate: 'Loading...',
        poopRate: 'Loading...',
        healthRate: 'Loading...',
        poopIncoming: 'Loading...',
        diesIn: 'Loading...',
      }
    }));
  } catch (error) {
    console.error('Error fetching Pizza Pets:', error);
    return [];
  }
};