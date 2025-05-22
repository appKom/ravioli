import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Smartphone } from 'lucide-react';

const TITLES = [
  "Visste du at det finnes folk som ikke har Online-appen?",
  "Gjør som Brr Brr Patapim, last ned Online-appen!",
  "Gjør som Erna Solberg, last ned Online-appen!",
  "Hva?! Har du ikke Online-appen enda?",
  "Vi har oversikt over alle som ikke har Online-appen!",
];

export const OnlineAppBlastPage = () => {
  const randomTitle = useMemo(() => {
    const index = Math.floor(Math.random() * TITLES.length);
    return TITLES[index];
  }, []);

  return (
    <div className="h-full flex justify-around items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br dark:from-[#111827] dark:to-[#0B5374] from-white via-white via-60% to-online-yellow animate-gradient-x" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl z-10"
      >
        <h1 className="text-6xl font-bold leading-tight dark:text-white text-online-blue mb-16">
          {randomTitle.includes('Online-appen')
            ? <>{randomTitle.split('Online-appen')[0]}<span className="text-online-yellow">Online-appen</span>{randomTitle.split('Online-appen')[1]}</>
            : randomTitle}
        </h1>

        <div className='flex gap-6'>
          <img className='h-16' src="online-app/download-app-store.svg" />
          <img className='h-16' src="online-app/download-google-play.svg" />
        </div>
        {/* QR code */}
        <div className="my-6 flex bg-black border border-[#a6a6a6] rounded-xl items-center w-max p-4 gap-4">
          <img
            className="w-[150px] aspect-square"
            src="/qr-codes/online-app-white.svg"
            alt="Online-appen QR kode"
          />
          <div className='flex flex-col items-center gap-2 text-white'>
            <Smartphone className="h-16 w-16" />
            <span className='text-center text-xl w-32 font-medium'>
              Skann for å laste ned
            </span>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="z-10"
      >
        <div className='flex gap-4 items-end'>
          <FloatingImage
            src="online-app/iphone-1.png"
            height="700px"
            delay={0}
          />
          <FloatingImage
            src="online-app/iphone-2.png"
            height="600px"
            delay={1}
          />
          <FloatingImage
            src="online-app/iphone-3.png"
            height="500px"
            delay={2}
          />
        </div>
      </motion.div>
    </div>
  );
};

const FloatingImage = ({ src, height, delay }: {
  src: string;
  height: string;
  delay: number;
}) => (
  <motion.img
    animate={{ y: [0, -10, 0] }}
    transition={{
      y: {
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: delay,
      },
    }}
    style={{ height }}
    className='object-contain drop-shadow-[0_150px_150px_rgba(0,0,0,0.25)]'
    src={src}
  />
);
