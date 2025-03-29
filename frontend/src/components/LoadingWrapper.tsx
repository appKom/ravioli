import { useEffect, useState } from "react"

interface LoadingWrapperProps {
  seconds: number
  duration: number
  nextPage: () => void
}

const primaryColor = "#0B5374"
const secondaryColor = "#F9B759"
const stripeWidth = 20

export const LoadingWrapper = ({ seconds, duration, nextPage }: LoadingWrapperProps) => {
  const [progress, setProgress] = useState(100)
  const [startTime, setStartTime] = useState<number | null>(null)

  useEffect(() => {
    setStartTime(Date.now())

    const interval = setInterval(() => {
      const elapsed = Date.now() - (startTime || Date.now())
      const remaining = Math.max(0, (seconds * 1000) - elapsed)

      const newProgress = (remaining / (duration * 1000)) * 100
      setProgress(newProgress)

      if (remaining <= 0) {
        clearInterval(interval)
      }
    }, 16)

    return () => clearInterval(interval)
  }, [seconds, duration, startTime])

  // Create the striped background with angled lines
  const stripeStyle = {
    backgroundImage: `linear-gradient(45deg, 
      ${primaryColor} 25%, 
      ${secondaryColor} 25%, 
      ${secondaryColor} 50%, 
      ${primaryColor} 50%, 
      ${primaryColor} 75%, 
      ${secondaryColor} 75%, 
      ${secondaryColor})`,
    backgroundSize: `${stripeWidth * 2}px ${stripeWidth * 2}px`,
  }

  return (
    <div className="fixed inset-0 w-full h-full overflow-auto z-[110]">
      <div
        className="absolute top-0 left-0 h-2 transition-all duration-100 ease-linear z-50"
        onClick={nextPage}
        style={{
          ...stripeStyle,
          width: `${progress}%`,
        }}
      />
    </div>
  )
}