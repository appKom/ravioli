import React, { useState, useEffect } from 'react';
import { SeasonalGraphic } from './SeasonalGraphic.jsx';
import moment from 'moment';

const MESSAGE_INTERVAL_MINUTES = 2;
const MESSAGE_TIME_SECONDS = 10;
const MESSAGE_CONTENT = 'Lykke til på eksamen!';

export function Header() {
  const [time, setTime] = useState(moment().format('HH:mm:ss'));
  const [showMessage, setShowMessage] = useState(false);
  const [moveContent, setMoveContent] = useState(false);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTime(moment().format('HH:mm:ss'));

      const currentTime = moment().format('YYYY-MM-DD HH:mm');
      const lastRefreshTime = localStorage.getItem('lastRefreshTime');
      if (moment().format('HH:mm') === '03:00' && currentTime !== lastRefreshTime) {
        localStorage.setItem('lastRefreshTime', currentTime);
        window.location.reload();
      }
    }, 1000);

    const messageInterval = setInterval(() => {
      setShowMessage(true);
      setMoveContent(true);
      setTimeout(() => {
        setMoveContent(false);
        setTimeout(() => {
          setShowMessage(false);
        }, 1000);
      }, 1000 * MESSAGE_TIME_SECONDS);
    }, 1000 * 60 * MESSAGE_INTERVAL_MINUTES);

    return () => {
      clearInterval(timeInterval);
      clearInterval(messageInterval);
    };
  }, []);

  return (
    <div className='relative h-32 border-b-[1.5px] border-light-grey dark:border-gray-700'>
        {showMessage && (
          <div className='absolute top-0 left-0 flex items-center justify-center w-full h-full text-6xl italic dark:text-white message'>
            {MESSAGE_CONTENT}
          </div>
        )}
      <div className={`h-full flex items-center justify-between transition-transform duration-1000 ${moveContent ? 'pushed' : ''}`}>
        <div className="flex items-center h-full gap-8 px-12 py-6">
          <img className="h-5/6 dark:hidden" src="/online/online_icon_blue.svg" alt="Online logo" />
          <img className="hidden h-5/6 dark:block" src="/online/online_icon_white.svg" alt="Online logo" />

          <img className="px-4 h-5/6 border-x-[1.5px] dark:border-gray-700 dark:hidden" src="/bekk/Bekk_navnetrekk_svart.svg" alt="Bekk logo" />
          <img className="hidden px-4 h-5/6 border-x dark:border-gray-700 dark:block" src="/bekk/Bekk_navnetrekk_hvit.svg" alt="Bekk logo" />

          <span className="text-6xl ">{time}</span>
        </div>

        <div className='flex h-full gap-5 px-4'>
          <SeasonalGraphic />
        </div>
      </div>
    </div>
  );
}
