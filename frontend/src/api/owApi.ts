export const fetchEventsByStartDate = async() => {
  const response = await fetch(`/owapi/api/trpc/event.all`);

  if (response.ok) {
    const json = await response.json();
    const items = json.result?.data?.json?.items ?? [];

    return items.map((item: any) => ({
      ...item.event, 
      attendanceId: item.attendance?.id ?? null,
      attendance: item.attendance ?? null,
    }));
  }
  throw response;
};

export const fetchAttendanceByEventId = async (eventId: string) => {
const response = await fetch(
  `/owapi/api/trpc/event.get?input=${encodeURIComponent(JSON.stringify({ id: eventId }))}`
);

  const json = await response.json();

  if (!response.ok || json.error) {
    return null;
  }
return json.result?.data ?? null;
};

