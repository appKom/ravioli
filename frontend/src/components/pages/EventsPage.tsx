import { useQuery } from "@tanstack/react-query";
import { fetchEventsByStartDate } from "../../api/owApi";
import { EventCard } from "../cards/EventCard";
import { Loading } from "../utils/Loading";
import { Error } from "../utils/Error";
import { INewEvent } from "../../lib/types";

const REFETCH_INTERVAL_MINUTES = 5; // how often to refetch events from Online API
const NUMBER_OF_EVENTS = 8; // how many events to display

export const EventsPage = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["events"],
    queryFn: () => fetchEventsByStartDate(),
    refetchInterval: 1000 * 60 * REFETCH_INTERVAL_MINUTES,
  });

  console.log("Events API response:", data);


  if (isLoading) return <Loading text="Henter siste arrangementer fra OW..." />;
  if (isError) return <Error />;

  // Filter and limit events before rendering
  const now = new Date();
  const filteredEvents = data
    ?.filter((event: INewEvent) => new Date(event.end) > now) // Filter out past events
    .sort((a: INewEvent, b: INewEvent) => new Date(a.start).getTime() - new Date(b.start).getTime())
    .slice(0, NUMBER_OF_EVENTS); // Limit to NUMBER_OF_EVENTS

  return (
    <div className="px-8 py-8">
      <div className="mb-5 text-4xl font-bold dark:text-white">
        Kommende arrangementer
      </div>
      <div className="grid justify-between max-w-full grid-cols-4 gap-8">
        {(filteredEvents ?? []).map((event: INewEvent) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      <div className="mt-5 text-xl dark:text-white">
        Meld deg på arrangementer via{" "}
        <span className="font-medium">online.ntnu.no</span>
      </div>
    </div>
  );
};
