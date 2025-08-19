// import moment from 'moment';

export const fetchEventsByStartDate = async() => {
  const response = await fetch(`/owapi/api/trpc/event.all`);
  console.log("Raw response:", response);

  if (response.ok) {
    const json = await response.json();
    const items = json.result?.data?.json?.items ?? [];

    return items.map((item: any) => ({
      ...item.event, 
      attendanceId: item.attendance?.id ?? null,
      attendance: item.attendance ?? null,
    }));
      // return await response.json();
  }
  throw response;
};

export const fetchAttendanceByEventId = async (eventId: string) => {
const response = await fetch(
  `/owapi/api/trpc/event.get?input=${encodeURIComponent(JSON.stringify({ id: eventId }))}`
);

  const json = await response.json();
  console.log("Full API response:", json);

  if (!response.ok || json.error) {
    console.error("API returned error:", json.error);
    return null;
  }

  // tRPC response contains a 'result.data' field
return json.result?.data ?? null;
};

