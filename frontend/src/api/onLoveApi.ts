import { IBids } from "../lib/types";

export const fetchBids = async (): Promise<IBids> => {
  const apiUrl = 'https://onlove.no/api/get-bid';

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch bids:', error);
    throw error;
  }
};