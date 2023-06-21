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
    const [executing,setExecuting] = useState('')

    const [ timer, setTimer] = useState(`${sessionTime}:00`)

    const handleClick = () => {
        const intSeconds = parseInt(seconds as string) 
        setSeconds(intSeconds)
        setExecuting('session')
    }

    useEffect(() => {
        if(executing === '') return
        if(seconds === 0 && minutes === 0) {
            if(executing === 'session') {
                setExecuting('break')
                setMinutes(breakTime)
                setSeconds(0)
            }else {
                setExecuting('session')
                setMinutes(sessionTime)
                setSeconds(0)
            }
        }
        else if(seconds as number > 0) {
            setTimeout(() => {
                setSeconds((prev) => {
                    let intSeconds = prev as number
                    return intSeconds -= 1 
                })
            },1000)
        }else if(seconds === 0 && minutes !== 0) {
            //problem here, once timer gets to zero this fires twice
            //results minutes being decremented an extra time
            setTimeout(() => {
                setMinutes((prev) => {
                    return prev -= 1
                })
                setSeconds(59)
            },1000)
        }
    },[timer,executing])

    useEffect(() => {
        setMinutes(sessionTime)
    },[sessionTime])

    useEffect(() => {
        if(executing === '' || 
        (seconds as number >= 10 && executing !== '')) {
            setTimer(`${minutes}:${seconds}`)
        }
        // else if(seconds as number >= 10 && executing !== '') {
        //     setTimer(`${minutes}:${seconds}`)
        // }
        else if(seconds as number < 10 && executing !== '') {
            setTimer(`${minutes}:0${seconds}`)
        }
    },[seconds,minutes])

    
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
                >
                    Pause
                </button>
                <button 
                    className="play"
                    onClick={handleClick}
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
