import { useEffect, useState } from "react"

interface LoadingWrapperProps {
  seconds: number
  duration: number
  nextPage: () => void
}

const stripeConfig: StripeConfig = {
  primaryColor: "#0B5374",
  secondaryColor: "#F9B759",
  stripeWidth: 20,
  primaryWidth: 30,
  secondaryWidth: 5,
  angle: 45,
}

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

  /* const stripeStyle = generateStripePattern(stripeConfig) */

  // Create the striped background with angled lines
  const stripeStyle = {
    backgroundImage: `linear-gradient(45deg, 
      ${stripeConfig.primaryColor} 25%, 
      ${stripeConfig.secondaryColor} 25%, 
      ${stripeConfig.secondaryColor} 50%, 
      ${stripeConfig.primaryColor} 50%, 
      ${stripeConfig.primaryColor} 75%, 
      ${stripeConfig.secondaryColor} 75%, 
      ${stripeConfig.secondaryColor})`,
    backgroundSize: `${stripeConfig.stripeWidth * 2}px ${stripeConfig.stripeWidth * 2}px`,
  }

  return (
    <div className="fixed inset-0 w-full h-full overflow-auto z-[110] opacity-75">
      <div
        className="absolute bottom-0 left-0 h-2 transition-all duration-100 ease-linear z-50"
        onClick={nextPage}
        style={{
          ...stripeStyle,
          width: `${progress}%`,
        }}
      />
    </div>
  )
}

interface StripeConfig {
  primaryColor: string,
  secondaryColor: string,
  stripeWidth: number,
  primaryWidth: number,
  secondaryWidth: number,
  angle: number,
}

/* 
const generateStripePattern = (
  config: StripeConfig,
) => {
  const { primaryColor, secondaryColor, stripeWidth, primaryWidth, secondaryWidth, angle } = config

  // Calculate positions to ensure the pattern repeats correctly
  const firstTransition = primaryWidth
  const secondTransition = firstTransition + secondaryWidth
  const thirdTransition = 50
  const fourthTransition = thirdTransition + primaryWidth
  const fifthTransition = fourthTransition + secondaryWidth

  return {
    backgroundImage: `linear-gradient(${angle}deg, 
      ${stripeConfig.primaryColor} 0%, 
      ${stripeConfig.primaryColor} ${firstTransition}%, 
      ${stripeConfig.secondaryColor} ${firstTransition}%, 
      ${stripeConfig.secondaryColor} ${secondTransition}%, 
      ${stripeConfig.primaryColor} ${secondTransition}%, 
      ${stripeConfig.primaryColor} ${thirdTransition}%,
      ${stripeConfig.primaryColor} ${fourthTransition}%, 
      ${stripeConfig.secondaryColor} ${fourthTransition}%, 
      ${stripeConfig.secondaryColor} ${fifthTransition}%, 
      ${stripeConfig.primaryColor} ${fifthTransition}%)`,
    backgroundSize: `${stripeWidth * 2}px ${stripeWidth * 2}px`,
  }
} */