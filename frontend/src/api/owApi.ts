export const fetchEventsByStartDate = async() => {
  const response = await fetch(`/owapi/api/trpc/event.all`);

  if (response.ok) {
    const json = await response.json();
    const items = json.result?.data?.json?.items ?? [];

    return items.map((item) => ({
      ...item.event, 
      attendanceId: item.attendance?.id ?? null,
      attendance: item.attendance ?? null,
    }));
  }
  throw response;
};

