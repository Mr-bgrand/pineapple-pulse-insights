const API_KEY = '';

const fetchWithCORS = async (url: string) => {
  try {
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
    console.log(`Fetching through CORS proxy: ${proxyUrl}`);
    
    const response = await fetch(proxyUrl, {
      headers: {
        'Authorization': API_KEY ? `Bearer ${API_KEY}` : '',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return null;
    }
    
    return response;
  } catch (error) {
    console.error(`Fetch error for ${url}:`, error);
    return null;
  }
};

export const fetchInscriptionDetails = async (inscriptionId: string) => {
  const url = `https://api.ordiscan.com/v1/inscription/${inscriptionId}`;
  const response = await fetchWithCORS(url);
  if (response) {
    return response.json();
  }
  return null;
};

export const fetchInscriptionChildren = async (inscriptionId: string) => {
  const url = `https://api.ordiscan.com/v1/inscription/${inscriptionId}/children`;
  const response = await fetchWithCORS(url);
  if (response) {
    return response.json();
  }
  return null;
};
