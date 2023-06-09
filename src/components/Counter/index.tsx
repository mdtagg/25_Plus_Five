import "./index.css"
import { useState } from "react"
import { useEffect } from "react"

interface CounterProps {
    breakTime:number
    sessionTime:number
    executing:string
    setExecuting:React.Dispatch<React.SetStateAction<string>>
}

const Counter = (props:CounterProps) => {

    const { breakTime, sessionTime, executing, setExecuting } = props
    const [ minutes, setMinutes ] = useState(sessionTime)
    const [ seconds, setSeconds ] = useState(0)
    const [ timer, setTimer] = useState(`${minutes}:${seconds}`)

    const Session = "Session"
    const Break = "Break"

    const handleClick = () => {
        const timeArray = timer.split(':').map(time => {
            return parseInt(time)
        })
        const [minutes, seconds] = timeArray
        setSeconds(seconds)
        setMinutes(minutes)
        setExecuting('session')
    }

    useEffect(() => {
        if(executing === '') return
        if(seconds === 0 && minutes === 0) {
            console.log("both zeros")
            if(executing === 'session') {
                setExecuting('break')
                setTimer(`${breakTime}:00`)
            }else {
                setExecuting('session')
                setTimer(`${sessionTime}:00`)
            }
        }else if(seconds > 0) {
            console.log("seconds greater than 0")
            setTimeout(() => {
                setSeconds((prev) => {
                    return prev -= 1
                })
            },1000)
        }else if(seconds === 0 && minutes !== 0) {
            console.log("seconds equal to zero")
            setTimeout(() => {
                setMinutes((prev) => {
                    return prev -= 1
                })
                setSeconds(59)
            },1000)
            
        }
    },[seconds,minutes])

    return (
        <div className="counter-container">
            <div className="counter">
                <p>Session</p>
                <p>{timer}</p>
            </div>
            <div className="controls">
                <button className="pause">Pause</button>
                <button 
                    className="play"
                    onClick={handleClick}
                >
                    Play
                </button>
                <button className="reset">Reset</button>
            </div>
        </div>
    )
}

export default Counter