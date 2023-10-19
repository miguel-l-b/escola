import { useEffect, useState } from "react"

export default function Home() {
  const [hours, setHours] = useState(new Date().getHours())
  const [minutes, setMinutes] = useState(new Date().getMinutes())

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date()
      setHours(date.getHours())
      setMinutes(date.getMinutes())
    }, 1000)

    return () => clearInterval(interval)
  }, [])
  return (
    <>
    <div className="w-full h-full flex flex-col justify-between items-center">
      <h1 className="text-center sm:text-left text-2xl sm:text-3xl font-thin">
        Olá, agora são {hours} horas e {minutes} minutos
      </h1>

      <iframe src="https://api.wo-cloud.com/content/widget/?geoObjectKey=3705599&language=pt&region=BR&timeFormat=HH:mm&windUnit=kmh&systemOfMeasurement=metric&temperatureUnit=celsius" name="CW2" scrolling="no" width="290" height="318"/>
      </div>
    </>
  )
}