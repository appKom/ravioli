import { Clock, LinkIcon, MapPin, Users } from "lucide-react"
import { fetchBids } from "../../api/onLoveApi";
import { useQuery } from "@tanstack/react-query";
import { Oval } from 'react-loader-spinner'
import { useState } from "react";

const REFETCH_INTERVAL_MINUTES = 20; // how often to refetch bids
const NUMBER_OF_BLINKING_LIGHTS = 30;

export const CharityPage = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["bids"],
    queryFn: () => fetchBids(),
    refetchInterval: 1000 * 60 * REFETCH_INTERVAL_MINUTES,
  });

  // Generate random positions for blinking lights
  const [blinkPositions] = useState<IBlink[]>(generateRandomPositions(NUMBER_OF_BLINKING_LIGHTS));

  return (
    <div className="h-full bg-zinc-900 text-white p-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-online-yellow/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-online-yellow/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      {/* Randomly Placed Blinking Lights */}
      {blinkPositions.map((blink, index) => (
        <BlinkingLight key={index} top={blink.top} left={blink.left} duration={blink.duration} />
      ))}

      <div className=" flex gap-6 items-center text-3xl">
        <img src="/charity/MentalHelse_logo_hvitgraa.png" alt="Mental Helse logo" className="w-[200px] opacity-70 absolute right-4 bottom-4" />
      </div>

      {/* Title Section - Overlapping */}
      <div className="absolute top-0 left-0 translate-x-8 translate-y-16 text-8xl font-bold text-white/15 uppercase">veldedighetsfest 2025</div>

      <div className="max-w-7xl mx-auto grid grid-cols-3 gap-8 mt-[200px]">
        {/* QR Section - Spans 2 rows */}
        <div className="bg-white/5 backdrop-blur-sm px-16 py-8 rounded-3xl border border-white/10 h-full row-span-2 col-span-2 relative z-10 w-max rotate-2 transition-transform">
          <p className="text-6xl font-bold tracking-tight text-center">
            Støtt Mental Helse
            <span className="text-online-yellow pl-0.5">!</span>
          </p>
          <div className="bg-white rounded-2xl mx-auto mt-8 mb-4 w-max">
            <img
              src="/charity/vipps-qr.png"
              alt="Vipps QR Code"
              className="w-[500px]"
            />
          </div>
        </div>

        {/* Progress Section - Overlapping previous section */}
        {
          !isError && (
            <div className="top-[300px] left-[960px] absolute w-[700px] h-max z-20 bg-online-blue/50 backdrop-blur-sm p-8 rounded-3xl border border-white/10 -rotate-2">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold">Opptjent så langt</h2>
                {
                  isLoading ? (
                    <Oval
                      strokeWidth="4"
                      color="#F9B759"
                      secondaryColor="#F9B759"
                      height={72}
                    />
                  ) : (
                    <div className="text-7xl font-bold text-online-yellow">
                      kr {formatNumber(data?.totalCollected._sum.amount)}
                    </div>
                  )
                }

                <div className="space-y-5">
                  {/* Custom Progress Bar */}
                  <div className="w-full h-4 bg-black/20 rounded-full overflow-hidden">
                    <div
                      className='h-full bg-white rounded-full'
                      style={{ width: getPercentage(data?.totalCollected._sum.amount, data?.highestGoal.goal) + '%' }}
                    />
                  </div>
                  <div className="flex justify-between text-xl">
                    <span className="flex items-center gap-2 justify-start">
                      <Users className="w-5 h-5" />
                      {
                        isLoading ? (
                          <Oval
                            strokeWidth="4"
                            color="#F9B759"
                            secondaryColor="#F9B759"
                            height={16}
                          />
                        ) : (
                          <>
                            {data?.numberOfDonations} {data?.numberOfDonations == 1 ? 'donasjon' : 'donasjoner'}
                          </>
                        )
                      }

                    </span>
                    <span className="flex items-center">
                      Mål:{' '}
                      {
                        isLoading ? (
                          <Oval
                            strokeWidth="4"
                            color="#F9B759"
                            secondaryColor="#F9B759"
                            height={16}
                          />
                        ) : (
                          <>
                            kr {formatNumber(data?.highestGoal.goal)}
                          </>
                        )
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        }

        {/* Onlove.no blæst*/}
        <div className="absolute right-[200px] top-[600px] z-20 -rotate-3">
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 w-[25rem]">
            <h2 className="text-4xl font-bold mb-8 flex items-center gap-2">
              <LinkIcon className="w-8 h-8 text-online-yellow" />
              Gå til <span className="text-blue-300">onlove.no</span>
              <span className="text-online-yellow pl-0.5">!</span>
            </h2>
          </div>
        </div>

        {/* Onlove.no blæst*/}
        <div className="absolute right-[200px] top-[600px] z-20 -rotate-3">
          <div className="bg-white/5 backdrop-blur-lg p-8 rounded-3xl border border-white/10 w-[25rem]">
            <h2 className="text-4xl font-bold mb-8 flex items-center gap-2">
              <LinkIcon className="w-8 h-8 text-online-yellow" />
              Gå til <span className="text-blue-300">onlove.no</span>
              <span className="text-online-yellow pl-0.5">!</span>
            </h2>
          </div>
        </div>

        {/* Event Details - Offset from grid */}
        <div className="absolute left-[1000px] top-[675px] z-10 rotate-3">
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 w-96">
            <h2 className="text-4xl font-bold mb-8">Når og hvor
              <span className="text-online-yellow pl-0.5">?</span>
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Clock className="w-8 h-8 text-online-yellow mt-1" />
                <div>
                  <p className="text-2xl">Lørdag, 29. mars</p>
                  <p className="text-zinc-400 text-xl">18:00 - 23:00</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="w-8 h-8 text-online-yellow mt-1" />
                <div>
                  <p className="text-2xl">R2</p>
                  <p className="text-zinc-400 text-xl">Realfagsbygget</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const formatNumber = (number?: number | null): string => {
  if (!number) return "0";
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

const getPercentage = (amount?: number | null, goal?: number): number => {
  if (!amount || !goal) return 0;
  return (amount / goal) * 100;
}

const BlinkingLight = ({ top, left, duration }: IBlink) => {
  return (
    <div
      className="w-1 h-1 bg-online-yellow opacity-70 rounded-full animate-blink shadow-glow absolute"
      style={{
        top: `${top}%`,
        left: `${left}%`,
        animationDuration: `${duration}s`,
      }}
    />
  );
}

const generateRandomPositions = (count: number) => {
  const positions: IBlink[] = [];
  for (let i = 0; i < count; i++) {
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const duration = Math.random() * 2 + 1;
    positions.push({ top, left, duration });
  }
  return positions;
};

interface IBlink {
  top: number;
  left: number;
  duration: number;
}