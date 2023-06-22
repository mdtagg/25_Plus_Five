import "./index.css"
import { useState } from "react"
import { useEffect } from "react"

interface CounterProps {
    breakTime:number
    sessionTime:number
}

const Counter = (props:CounterProps) => {

    const { breakTime, sessionTime } = props

    const [ minutes, setMinutes ] = useState(sessionTime)
    const [ seconds, setSeconds ] = useState<string | number>(`00`)
    const [ executing, setExecuting ] = useState<string | null>(null)
    const [ pause, setPause ] = useState<undefined | number>(undefined)
    const [ timer, setTimer] = useState(`${minutes}:${seconds}`)

    // console.log({executing,pause,timer,minutes,seconds})

    const handlePlay = () => { 
        if(!pause) {
            const intSeconds = parseInt(seconds as string)
            setExecuting('session')
            setSeconds(intSeconds)
        }else {
            decrementSeconds()
        }
    }

    const handlePause = () => {
        clearTimeout(pause)
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

    useEffect(() => {
        console.log({seconds})
        // if(pause) return
        if(seconds as number >= 10 || executing === null) {
            setTimer(`${minutes}:${seconds}`)
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
            setPause(decrementSeconds())
        }
        else if(seconds === 0 && minutes === 0) {
            if(executing === 'session') {
                changeSession('break',breakTime)
            }else {
                changeSession('session',sessionTime)
            }
            setSeconds(0)
        }
    },[timer,executing])

    useEffect(() => {
        setMinutes(sessionTime)
    },[sessionTime])

    useEffect(() => {
        if(pause || executing === null) return 
        // decrementSeconds()
        // if(pause) return 
        // setTimeout(() => {
            // setSeconds((prev) => {
            //     return prev as number - 1
            // })
            // setSeconds(seconds)
        // },1000)
    },[pause])

    return (
        <div 
            className="counter-container"
        >
            <div 
                className="counter"
            >
                <p>Session</p>
                <p>{timer}</p>
            </div>
            <div 
                className="controls"
            >
                <button 
                    className="pause"
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
                    className="reset"
                >
                    Reset
                </button>
            </div>
        </div>
    )
}

export default Counter



    // useEffect(() => {
    //    if(executing === 'session') {
    //         setMinutes(sessionTime)
    //         setSeconds(0)
    //     }else if(executing === 'break') {
    //         setMinutes(breakTime)
    //         setSeconds(0)
    //     }
    // },[executing])
