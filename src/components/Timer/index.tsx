import "./index.css"
import { useState,useEffect,useRef } from "react"
import soundUrl from '../../assets/mixkit-retro-game-emergency-alarm-1000.wav'
import { Icon } from "@iconify/react"

interface TimerProps {
    breakTime:number
    setBreakTime:React.Dispatch<React.SetStateAction<number>>
    sessionTime:number
    setSessionTime:React.Dispatch<React.SetStateAction<number>>
    executing:string | null 
}

const Timer = (props:TimerProps) => {

    const { sessionTime, breakTime, setSessionTime, setBreakTime } = props

    const [ minutes, setMinutes ] = useState(sessionTime)
    const [ seconds, setSeconds ] = useState(0)
    const [ timer, setTimer ] = useState(`25:00`)
    const [ executing, setExecuting ] = useState<string | undefined>(undefined)
    const [ timerId,setTimerId ] = useState<number | undefined>(undefined)

    console.log({minutes,seconds,timer,executing})

    const handlePlay = () => {
        setMinutes((prev) => {
            return prev -= 1
        })
        setSeconds(59)
        setExecuting('Session')
    }

    const handleReset = () => {
        clearTimeout(timerId)
        setSessionTime(25)
        setBreakTime(5)
        setMinutes(sessionTime)
        setSeconds(0)
        setTimer(`25:00`)
        setExecuting(undefined)
    }

    const parseTimer = () => {
        return setTimeout(() => {
            if(seconds === 0 && minutes === 0) {
                setTimer(`00:00`)
                setTimerId(switchSession())
                return
            }
            if(seconds >= 10 && minutes >= 10) {
                setTimer(`${minutes}:${seconds}`)
            }else if(seconds >= 10 && minutes < 10) {
                setTimer(`0${minutes}:${seconds}`)
            }else if(seconds < 10 && minutes >= 10) {
                setTimer(`${minutes}:0${seconds}`)
            }else {
                setTimer(`0${minutes}:0${seconds}`)
            }
            setSeconds((prev) => {
                return prev -= 1
            })
        },1000)
    }
    
    const switchSession = () => {
        return setTimeout(() => {
            switch(executing) {
                case 'Session':
                    setExecuting('Break')
                    setSeconds(59)
                    setMinutes(breakTime - 1)
                    setTimer(`${breakTime}:00`)
                    break
                case 'Break':
                    setExecuting('Session')
                    setSeconds(59)
                    setMinutes(sessionTime - 1)
                    setTimer(`${sessionTime}:00`)
                    break
                default:
                    return
            }
        },1000)
    }

    useEffect(() => {
        if(!executing) return
        setTimerId(parseTimer)
    },[seconds])

    useEffect(() => {
        if(sessionTime >= 10) {
            setTimer(`${sessionTime}:00`)
        }else {
            setTimer(`0${sessionTime}:00`)
        }
        setMinutes(sessionTime)
    },[sessionTime])

    return (
        <div className="counter-container">
            <audio id='beep' src={soundUrl}></audio>
            <div className="counter">

                <p id='timer-label'>
                    {!executing || executing === 'Session' ? 
                    'Session' : 'Break'}
                </p>

                <p id='time-left'>
                    {timer}
                </p>

            </div>
            <div className="controls">

                <button id='start_stop' onClick={handlePlay}>
                    <Icon className="test" icon="bi:play-fill" />
                </button>

                <button id="reset" onClick={handleReset}>
                    <Icon icon="carbon:reset"/>
                </button>

            </div>
        </div>
    )
}

export default Timer