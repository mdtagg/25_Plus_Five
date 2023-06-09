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
    const [ seconds, setSeconds ] = useState<string | number>(`00`)
    const [ timer, setTimer] = useState(`${sessionTime}:00`)

    const handleClick = () => {
        // const timeArray = timer.split(':').map(time => {
        //     return parseInt(time)
        // })
        // const [minutes, seconds] = timeArray
        const intSeconds = parseInt(seconds as string) 
        // setMinutes(minutes)
        setSeconds(intSeconds)
        setExecuting('session')
        console.log("handle Click")
    }

    useEffect(() => {
        if(executing === '') return
        if(seconds === 0 && minutes === 0) {
            console.log("both equal zero")
            if(executing === 'session') {
                setExecuting('break')
                setTimer(`${breakTime}:00`)
            }else {
                setExecuting('session')
                setTimer(`${sessionTime}:00`)
            }
        }else if(seconds as number > 0) {
            console.log("seconds greater",seconds)
            setTimeout(() => {
                setSeconds((prev) => {
                    let test = prev as number
                    return test -= 1 
                })
            },1000)
        }else if(seconds === 0 && minutes !== 0) {
            console.log("seconds zero")
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
        if(executing === '') {
            setTimer(`${minutes}:${seconds}`)
        }
        else if(seconds as number >= 10 && executing !== '') {
            setTimer(`${minutes}:${seconds}`)
        }
        else if(seconds as number < 10 && executing !== '') {
            setTimer(`${minutes}:0${seconds}`)
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