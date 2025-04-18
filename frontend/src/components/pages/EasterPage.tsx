import { useEffect, useState } from 'react';
import countdownToEaster from '../../lib/daysUntilEaster';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export const EasterPage = () => {
  const [daysUntilEaster, setDaysUntilEaster] = useState(countdownToEaster());

  useEffect(() => {
    const interval = setInterval(() => {
      setDaysUntilEaster(countdownToEaster());
    }, 60 * 60 * 1000); // Recalculate every hour

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex items-center justify-center h-full bg-gradient-to-b from-[#9acdf5] to-[#d1e3f1] dark:bg-none">
      {/* Background */}
      <img className="w-full h-full absolute object-cover" src="/easter/tulipfield.jpg" alt="" />
      <motion.img className='absolute bottom-0 max-h-40 max-w-40'
        src='easter/walking-chicken.gif'
        animate={{ x: ["-100vw", "100vw"] }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity }}
      />
      <div className="w-max max-w-3xl relative">
        <motion.img className='h-40'
          src='easter/easter-egg.svg'
          alt=''
          animate={{ x: [0, 500], rotate: [0, 360] }}
          transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }} />
        <div className="relative z-50 p-8 bg-white border border-gray-200 shadow-xl dark:bg-gray-800 dark:border-gray-700 rounded-3xl">
          {
            daysUntilEaster <= 0 ? (
              <p className="text-center font-extrabold text-pink-500 text-[125px] leading-none my-20 mx-20">endelig PÅSKE!</p>
            ) : (
              <div className='mx-20'>
                <h1 className="mb-8 text-4xl font-bold text-center text-gray-800 dark:text-gray-100">Nedtelling til påskeferie</h1>
                <div className='text-center'>
                  <p className="font-extrabold text-pink-500 text-[250px] leading-none mb-6">{daysUntilEaster}</p>
                  <p className='text-gray-600 dark:text-gray-300 text-3xl'>
                    {daysUntilEaster === 1 ? "dag" : "dager"} igjen!
                  </p>
                </div>
              </div>
            )}

          {['top-6 left-6', 'top-6 right-6', 'bottom-6 right-6', 'bottom-6 left-6'].map((pos) => (
            <img
              key={pos}
              src={"/easter/bow-ribbon.svg"}
              className={clsx("absolute max-h-14", pos)}
            />
          ))}
        </div>
      </div>
    </div>
  )
};
