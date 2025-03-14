import { MemeType } from "../lib/types";

export const fetchMemes = async (amount: number, type?: 'image' | 'video'): Promise<MemeType[]> => {
  let apiUrl = import.meta.env.VITE_BACKEND_URL + `/latest-memes?count=${amount}`;

  if (type) {
    apiUrl += `&type=${type}`;
  }

  const response = await fetch(apiUrl);

  if (response.ok) {
    return await response.json();
  }
  throw response;
};
