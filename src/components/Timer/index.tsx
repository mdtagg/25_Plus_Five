import "./index.css"
import { useState,useEffect,useRef } from "react"
import soundUrl from '../../assets/mixkit-retro-game-emergency-alarm-1000.wav'
import { Icon } from "@iconify/react"

interface TimerProps {
    breakTime:number
    setBreakTime:React.Dispatch<React.SetStateAction<number>>
    sessionTime:number
    setSessionTime:React.Dispatch<React.SetStateAction<number>>
    executing:string | undefined
    setExecuting:React.Dispatch<React.SetStateAction<string | undefined>>
}

const Timer = (props:TimerProps) => {

    const { sessionTime,setSessionTime, breakTime, setBreakTime,executing,setExecuting } = props

    const [ start, setStart ] = useState(false)
    const [ timer, setTimer ] = useState(`25:00`)
    const [ timerId,setTimerId ] = useState<number | undefined>(undefined)
    const audioRef = useRef<null | HTMLAudioElement>(null)

    const handlePlay = () => {
        if(!executing) {
            setTimerId(parseTimer())
            setExecuting('Session')
            setStart(true)
        }
        else if(start) {
            setStart(false)
            clearTimeout(timerId)
        }
        else {
            setStart(true)
            setTimerId(parseTimer())
        }
    }

    const startNewSession = () => {

        setTimeout(() => {
            const audioElement = audioRef.current as HTMLAudioElement
            audioElement.play()
        },3000)

        if(executing === 'Session') {
            setExecuting('Break')
            if(breakTime >= 10) {
                return setTimer(`${breakTime}:00`)
            }
            setTimer(`0${breakTime}:00`)
        }
        else {
            setExecuting('Session')
            if(sessionTime >= 10) {
                return setTimer(`${sessionTime}:00`)
            }
            setTimer(`0${sessionTime}:00`)
        }
    }

    useEffect(() => {
        if(!executing) return
        setTimerId(parseTimer())
    },[timer])

    const parseTimer = () => {
        return setTimeout(() => {
            const [ minutes, seconds ] = timer.split(':').map(item => {return parseInt(item)})
            
            if(seconds === 0 && minutes === 0) {
                return startNewSession()
            }
            else if(minutes > 10 && seconds === 0) {
                setTimer(`${minutes - 1}:59`)
            }
            else if(minutes <= 10 && seconds === 0) {
                setTimer(`0${minutes - 1}:59`)
            }
            else if(minutes >= 10 && seconds >= 10) {
                setTimer(`${minutes}:${seconds - 1}`)
            }
            else if(minutes < 10 && seconds > 10) {
                setTimer(`0${minutes}:${seconds - 1}`)
            }
            else if(minutes > 10 && seconds < 10) {
                setTimer(`${minutes}:0${seconds - 1}`)
            }
            else if(minutes < 10 && seconds <= 10) {
                setTimer(`0${minutes}:0${seconds - 1}`)
            }
        },1000)
    }

    const handleReset = () => {
        audioRef.current?.pause()
        setStart(false)
        clearTimeout(timerId)
        setSessionTime(25)
        setBreakTime(5)
        setTimer(`25:00`)
        setExecuting(undefined)
    }

    useEffect(() => {
        if(sessionTime >= 10) {
            setTimer(`${sessionTime}:00`)
        }else {
            setTimer(`0${sessionTime}:00`)
        }
    },[sessionTime])

    return (
        <div className="counter-container">
            <audio id='beep' src={soundUrl} ref={audioRef}></audio>
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

                <button id="reset" 
                onClick={handleReset}
                >
                    <Icon icon="carbon:reset"/>
                </button>

            </div>
        </div>
    )
}

export default Timer

   // const changeSession = (sessionType:string,sessionLength:number) => {
    //     setExecuting(sessionType)
    //     if(sessionLength >= 10) {
    //         setTimer(`${sessionLength}:00`)
    //     }else {
    //         setTimer(`0${sessionLength}:00`)
    //     }
    // }