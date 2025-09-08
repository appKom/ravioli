const API_BASE = import.meta.env.DEV ? "/owapi" : "https://rpc.online.ntnu.no"; // Proxy in dev, direct in prod

export const fetchEventsByStartDate = async () => {
  const response = await fetch(`${API_BASE}/api/trpc/event.all`);
  if (!response.ok) throw response;
  const json = await response.json();
  const items = json.result?.data?.json?.items ?? [];
  return items.map((item) => ({
    ...item.event,
    attendanceId: item.attendance?.id ?? null,
    attendance: item.attendance ?? null,
  }));
};
