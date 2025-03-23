import { useEffect, useState } from "react"
import { Calendar, Clock } from "lucide-react"

export const JubkomPage = () => {
  const targetDate = new Date("2026-02-16T00:00:00") // 16th of February 2026
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  })

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference <= 0) {
        clearInterval(intervalId)
        setTimeLeft({ days: 0, hours: 0, minutes: 0 })
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))

      setTimeLeft({ days, hours, minutes })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="h-full bg-zinc-900 text-white relative overflow-hidden">
      <div className="flex-1 flex flex-col items-center justify-center text-center p-6 relative overflow-hidden h-full text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-black opacity-80 z-0"></div>

        <div className="relative z-10 mx-auto">
          <h1 className="text-8xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600">
            Online 40-års jubileum
          </h1>

          <div className="flex flex-row justify-center gap-8 my-12">
            <CountdownUnit value={timeLeft.days} label="DAGER" icon={<Calendar className="h-6 w-6" />} />
            <CountdownUnit value={timeLeft.hours} label="TIMER" icon={<Clock className="h-6 w-6" />} />
            <CountdownUnit value={timeLeft.minutes} label="MINUTTER" icon={<Clock className="h-6 w-6" />} />
          </div>
        </div>
      </div>
    </div>
  )
}


const CountdownUnit = ({ value, label, icon }: { value: number; label: string; icon: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 w-40 h-40 border border-white/20 shadow-xl">
        <div className="flex justify-center mb-2 text-yellow-400">{icon}</div>
        <span className="text-6xl font-bold block">{value.toString().padStart(2, "0")}</span>
        <span className="mt-2 tracking-widest font-medium text-yellow-300 block">{label}</span>
      </div>
    </div>
  )
}