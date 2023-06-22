import "./index.css"
import { useState,useEffect,useRef } from "react"
import soundUrl from '../../assets/mixkit-retro-game-emergency-alarm-1000.wav'

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
    const [ red, setRed ] = useState(false)
    const test = red ? 'red' : ''

    const audioRef = useRef<HTMLAudioElement | null>(null)
    const audioElement = audioRef.current as HTMLAudioElement
    
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
        if(minutes < 1) {
            setRed(true)
        }
        if((seconds as number >= 10 && minutes > 10) || executing === null) {
            setTimer(`${minutes}:${seconds}`)
            setRed(false)
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
            setRed(false)
            audioElement.play()
            setTimeout(() => {
                audioElement.pause()
            },2000)
            if(executing === 'session') {
                changeSession('break',breakTime)
            }else {
                changeSession('session',sessionTime)
            }
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
            <audio id='beep' src={soundUrl} ref={audioRef}></audio>
            <div 
                className="counter"
            >
                <p id='timer-label'>
                    {executing === 'session' || executing === null ? 'session' : 'break'}
                </p>
                <p id='time-left' className={test}>
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