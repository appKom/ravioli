const API_BASE = "https://rpc.online.ntnu.no";

export const fetchEventsByStartDate = async () => {
  const response = await fetch(`${API_BASE}/api/trpc/event.all`);
  if (!response.ok) throw new Error(`External API error: ${response.statusText}`);
  const json = await response.json();

  const items = json.result?.data?.json?.items ?? [];
  return items.map((item: { event: any; attendance: { id: any; }; }) => ({
    ...item.event,
    attendanceId: item.attendance?.id ?? null,
    attendance: item.attendance ?? null,
  }));
};
