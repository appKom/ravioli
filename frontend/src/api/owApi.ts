export const fetchEventsByStartDate = async () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL + `/events`;
  const response = await fetch(apiUrl);

  if (response.ok) {
    return await response.json();
  }
  throw response;
};