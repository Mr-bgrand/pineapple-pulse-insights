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
}

export interface PizzaPet {
  meta: PizzaPetMeta;
  stats: PizzaPetStats;
}

export const fetchPizzaPets = async (): Promise<PizzaPet[]> => {
  const walletAddress = 'bc1pk0ctmslve0v6eg6snka6em0kmykg2kmtjerk2alv2ncdmw60s4cs2le2w8';
  const apiUrl = `https://api-mainnet.magiceden.us/v2/ord/btc/tokens?ownerAddress=${walletAddress}`;
  const collectionFilter = "pizza-pets";

  try {
    console.log(`Fetching Pizza Pets for wallet: ${walletAddress}`);
    const { data } = await axios.get(apiUrl);

    const tokens = Array.isArray(data) ? data : data.tokens || [];
    const filteredTokens = tokens.filter(token => token.collectionSymbol === collectionFilter);

    if (filteredTokens.length === 0) {
      console.log('No Pizza Pets found');
      return [];
    }

    return filteredTokens.map(token => ({
      meta: {
        name: token.meta?.name || `Token ID: ${token.inscriptionNumber}` || 'Unknown',
        attributes: token.meta?.attributes || [],
        imageUrl: token.meta?.collection_page_img_url || '',
      },
      stats: {
        type: 'Loading...',
        stage: 'Loading...',
        weakness: 'Loading...',
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