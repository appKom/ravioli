// import moment from 'moment';

export const fetchEventsByStartDate = async() => {
  const response = await fetch(`/owapi/api/trpc/event.all`);
  console.log("Raw response:", response);

  if (response.ok) {
    const json = await response.json();
    const items = json.result?.data?.json?.items ?? [];
    console.log("Raw JSON:", json);

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
    `owapi/api/trpc/event.get?input=${encodeURIComponent(JSON.stringify(eventId))}`
  );
  const json = await response.json();

  if (!response.ok) {
    console.error("tRPC error:", json);
    return null;
  }

  // tRPC response contains a 'result.data' field
  return json.result?.data ?? null;
};

