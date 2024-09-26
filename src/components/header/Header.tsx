import {useState, useEffect} from 'react';
import moment from 'moment';
import { getRelevantMessages } from '../../lib/messages';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { DebugQR } from './DebugQR';

const REFRESH_TIME = '03:00'; // the time of day to refresh the page (use latest code from git)

const MESSAGE_INTERVAL_MINUTES = 1.5; // how long between each message
const MESSAGE_TIME_SECONDS = 10; // how long the message should be displayed

type HeaderProps = {
  timeToComponentChange: number;
  timePerComponent: number;
  nextPage: () => void;
};

export const Header = (props: HeaderProps) => {
  const [time, setTime] = useState<string>(moment().format('HH:mm:ss'));
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [messageContent, setMessageContent] = useState<string>();

  useEffect(() => {
    const timeInterval = setInterval(() => {

      // update the clock
      setTime(moment().format('HH:mm:ss'));

      // logic for refreshing the page once each day
      const currentTime = moment().format('YYYY-MM-DD HH:mm');
      const lastRefreshTime = localStorage.getItem('lastRefreshTime');
      if (moment().format('HH:mm') === REFRESH_TIME && currentTime !== lastRefreshTime) {
        localStorage.setItem('lastRefreshTime', currentTime);
        window.location.reload();
      }
    }, 1000);

    // logic for displaying messages
    const messageInterval = setInterval(() => {
      const messages = getRelevantMessages();
      if (messages.length > 0) { // Check if there are any relevant messages
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        setMessageContent(randomMessage);
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 1000 * MESSAGE_TIME_SECONDS);
      } else {
        setShowMessage(false); // No messages, stop showing any animation
      }
    }, 1000 * 60 * MESSAGE_INTERVAL_MINUTES);

    return () => {
      clearInterval(timeInterval);
      clearInterval(messageInterval);
    };
  }, []);

  return (
    <div className='relative border-b-[1.5px] min-h-32 h-32 max-h-32 border-light-grey dark:border-gray-700 dark:text-white z-20 bg-white dark:bg-[#111827]'>
      <div className={`absolute top-0 left-0 flex items-center justify-center w-full h-full text-6xl italic duration-1000 ${showMessage ? 'animate-[slideIn_1s_forwards]' : 'animate-[slideOut_1s_forwards]'}`}>
        {messageContent}
      </div>

      <div className={`h-full flex items-center justify-between transition-transform duration-1000 ${showMessage ? 'translate-x-full' : ''}`}>
        <div className="flex items-center h-full gap-8 px-12 py-6">
          <img className="h-full dark:hidden" src="/online/online_icon_blue.svg" alt="Online logo" />
          <img className="hidden h-full dark:block" src="/online/online_icon_white.svg" alt="Online logo" />

          <img className="px-8 h-3/5 border-x-[1.5px] dark:border-gray-700 dark:hidden" src="/bekk/Bekk_navnetrekk_svart.svg" alt="Bekk logo" />
          <img className="hidden px-8 h-3/5 border-x dark:border-gray-700 dark:block" src="/bekk/Bekk_navnetrekk_hvit.svg" alt="Bekk logo" />
          <span className="text-6xl">{time}</span>
        </div>

        <div className='flex items-center h-full gap-10'>
          <DebugQR />

          <div
            className='mr-12 cursor-pointer pl-10 border-l-[1.5px] dark:border-gray-700'
            onClick={props.nextPage}
          >
            <CircularProgressbar
              className="h-12"
              value={props.timeToComponentChange}
              maxValue={props.timePerComponent}
              strokeWidth={50}
              styles={buildStyles({
                pathColor: '#0D5474',
                trailColor: '#eee',
              })}
            />
          </div>
        </div>
        {/* DONT KNOW WETHER TO KEEP THIS OR NOT */}
        {/* <div className='flex items-center h-full gap-5 px-4'>
          <SeasonalGraphic />
        </div> */}
      </div>
    </div>
  );
}
