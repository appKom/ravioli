import { useEffect, useRef } from 'react';
import OnlineLogo from '../Logo/OnlineLogo';
import { Badge } from '../Badge';
import { formatWeekday, formatClock, formatDateName, isLongEvent, sameMonth } from '../../lib/date';
import { EVENT_TYPES, IEvent } from '../../lib/types';
import { BaseCard } from './BaseCard';
import { removeOWFormatting } from '../../lib/text';
import { useQuery } from '@tanstack/react-query';
import { fetchAttendanceByEventId } from '../../api/owApi';
import { calculateSeatsInfo, selectIndicatorColor, determineTimeBeforeRegistrationOpens, determineStatusText } from '../../lib/event';
import clsx from 'clsx';

export function EventCard({ event }: { event: IEvent }) {
  const { ingress, title, start_date, end_date, event_type, images } = event;
  const image = images[0];

  const isRegistrationEvent = event.max_capacity !== null;

  const { isLoading: attendanceIsLoading, isError: attendanceIsError, data: attendanceData } = useQuery({
    queryKey: ['events', event.id],
    queryFn: () => fetchAttendanceByEventId(event.id),
    enabled: Boolean(event.id) && isRegistrationEvent,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const overflowWidth = container.scrollWidth - container.offsetWidth;
    container.style.setProperty('--overflow-width', `${overflowWidth}px`);
  }, [event, attendanceData]);

  if (attendanceIsLoading) return <BaseCard isLoading />;
  if (attendanceIsError) return <BaseCard isError />;

  const eventTypeName = EVENT_TYPES[event_type - 1]?.typeName;
  const eventColor = EVENT_TYPES[event_type - 1]?.colorName;

  const { seatsLeft, percentageFilled } = calculateSeatsInfo(attendanceData);
  const indicatorColor = selectIndicatorColor(percentageFilled, event.start_date, event.end_date);
  const registrationEnd = new Date(attendanceData?.registration_end);
  const registrationStart = new Date(attendanceData?.registration_start);
  const isRegistrationEnded = new Date() > registrationEnd;
  const timeBeforeRegistrationOpens = determineTimeBeforeRegistrationOpens(registrationStart);
  const isLongDurationEvent = isLongEvent(new Date(start_date), new Date(end_date));

  const dateBadgeText = isLongDurationEvent
  ? sameMonth(start_date, end_date)
    ? `Fra ${formatDateName(start_date, false)} til ${formatDateName(end_date)}` // Start and end date in same month
    : `Fra ${formatDateName(start_date)} til ${formatDateName(end_date)}` // Start and end date in different months
  : `${formatWeekday(start_date)} ${formatDateName(start_date)}, ${formatClock(start_date)}`; // Single day event

  const statusText = determineStatusText(
    isRegistrationEnded,
    timeBeforeRegistrationOpens,
    seatsLeft,
    attendanceData?.number_on_waitlist,
    event.start_date,
    event.end_date,
  );

  return (
    <BaseCard showOverflow>
      {statusText && (
        <div
          className= {clsx(
            'absolute inline-flex items-center justify-center py-0.5 px-2 text-sm font-bold border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900',
            isRegistrationEnded ? 'bg-gray-400 text-white' : indicatorColor
          )}
        >
          {statusText}
        </div>
      )}

      <div className='flex justify-center w-full h-60 border-b rounded-t-lg border-gray-200 dark:border-gray-700'>
        {image ? (
          <img className="object-cover w-full h-full bg-white rounded-t-lg" src={image.lg} alt={image.description} />
        ) : (
          <OnlineLogo fillColor={eventColor} />
        )}
      </div>

      <div ref={containerRef} className='flex flex-col justify-between flex-grow w-full gap-2 px-4 pt-2 pb-3 overflow-hidden'>
        <div>
          {title && <h5 className="w-full text-2xl font-bold tracking-tight line-clamp-1 dark:text-white">{removeOWFormatting(title)}</h5>}
          {ingress && <p className="font-normal text-gray-700 dark:text-gray-400 line-clamp-2">{removeOWFormatting(ingress)}</p>}
        </div>
        <div ref={contentRef} className='flex w-full gap-3 scrolling-text'>
          {eventTypeName && <Badge text={eventTypeName} leftIcon='star' color={eventColor} />}
          {start_date && <Badge text={dateBadgeText} leftIcon='calendar' color='gray' />}
          {isRegistrationEvent && attendanceData && (
            <Badge text={`${attendanceData.number_of_seats_taken}/${attendanceData.max_capacity}`} leftIcon='people' color='gray' />
          )}
        </div>
      </div>
    </BaseCard>
  );
}
