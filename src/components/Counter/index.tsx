import "./index.css"
import { useState } from "react"
import { useEffect } from "react"

interface CounterProps {
    breakTime:number
    sessionTime:number
    setSessionTime:React.Dispatch<React.SetStateAction<number>>
    setBreakTime:React.Dispatch<React.SetStateAction<number>>
}

const Counter = (props:CounterProps) => {

    const { breakTime, sessionTime, setSessionTime,setBreakTime } = props

    const [ minutes, setMinutes ] = useState(sessionTime)
    const [ seconds, setSeconds ] = useState<string | number>(`00`)
    const [ executing, setExecuting ] = useState<string | null>(null)
    const [ timeoutId, setTimeoutId ] = useState<undefined | number>(undefined)
    const [ timer, setTimer] = useState(`${minutes}:${seconds}`)

    const handlePlay = () => { 
        if(!timeoutId) {
            const intSeconds = parseInt(seconds as string)
            setExecuting('session')
            setSeconds(intSeconds)
        }else {
            decrementSeconds()
        }
    }

    const handlePause = () => {
        clearTimeout(timeoutId)
    }

    const decrementMinutes = () => {
        setTimeout(() => {
            setMinutes((prev) => {
                return prev -= 1
            })
            setSeconds(59)
        },1000)
    }

    const decrementSeconds = () => {
        
        return setTimeout(() => {
            setSeconds((prev) => {
                return prev as number - 1
            })
            
        },1000)
    }

    const changeSession = (type:string,minutes:number) => {
        setExecuting(type)
        setMinutes(minutes)
    }

    const handleReset = () => {
        clearTimeout(timeoutId)
        setSessionTime(25)
        setBreakTime(5)
        setMinutes(25)
        setSeconds(`00`)
        setTimeoutId(undefined)
        setExecuting(null)
        setTimer(`25:00`)
    }

    useEffect(() => {
        if((seconds as number >= 10 && minutes > 10) || executing === null) {
            setTimer(`${minutes}:${seconds}`)
        }
        else if(seconds as number >= 10 && minutes < 10) {
            setTimer(`0${minutes}:${seconds}`)
        }
        else if(seconds as number < 10 && minutes < 10) {
            setTimer(`0${minutes}:0${seconds}`)
        }
        else {
            setTimer(`${minutes}:0${seconds}`)
        }
    },[seconds])

    useEffect(() => {
        if(executing === null) return
        if(seconds === 0 && minutes !== 0) {
            decrementMinutes()
        }
        else if(seconds as number > 0) {
            setTimeoutId(decrementSeconds())
        }
        else if(seconds === 0 && minutes === 0) {
            if(executing === 'session') {
                changeSession('break',breakTime)
            }else {
                changeSession('session',sessionTime)
            }
            // setSeconds(0)
        }
    },[timer,executing])

    useEffect(() => {
        setMinutes(sessionTime)
        if(sessionTime < 10) {
            setTimer(`0${sessionTime}:00`)
        }else {
            setTimer(`${sessionTime}:00`)
        }
    },[sessionTime])

    return (
        <div 
            className="counter-container"
        >
            <div 
                className="counter"
            >
                <p id='timer-label'>Session</p>
                <p id='time-left'>
                    {timer}
                </p>
            </div>
            <div 
                className="controls"
            >
                <button 
                    id="start_stop"
                    onClick={handlePause}
                >
                    Pause
                </button>
                <button 
                    className="play"
                    onClick={handlePlay}
                >
                    Play
                </button>
                <button 
                    id="reset"
                    onClick={handleReset}
                >
                    Reset
                </button>
            </div>
        </div>
    )
}

export default Counter