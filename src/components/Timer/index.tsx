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

    const { sessionTime,setSessionTime, breakTime, setBreakTime } = props

    const [ start, setStart ] = useState(false)
    const [ timer, setTimer ] = useState(`25:00`)
    const [ executing, setExecuting ] = useState<string | undefined>(undefined)
    const [ timerId,setTimerId ] = useState<number | undefined>(undefined)

    // console.log({minutes,seconds,timer,executing})

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

    useEffect(() => {
        if(!executing) return
        setTimerId(parseTimer())
    },[timer])

    const parseTimer = () => {
        return setTimeout(() => {
            const [ minutes, seconds ] = timer.split(':').map(item => {return parseInt(item)})
            if(seconds === 0 && minutes === 0) {
                if(executing === 'Session') {
                    setExecuting('Break')
                    setTimer(`${breakTime}:00`)
                }else {
                    setExecuting('Session')
                    setTimer(`${sessionTime}:00`)
                }
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

// else {
//     let newMinutes 
//     let newSeconds 

//     if(minutes > 10) {
//         newMinutes = `${minutes}`
//     }else {
//         newMinutes = `0${minutes}`
//     }
//     if(seconds > 10) {
//         newSeconds = `${seconds}`
//     }else {
//         newSeconds = `0${seconds}`
//     }
//     console.log({newMinutes,newSeconds})
//     setTimer(`${newMinutes}:${newSeconds}`)
// }

// setMinutes((prev) => {
        //     return prev -= 1
        // })
        // setSeconds(59)
        // setExecuting('Session')
        // setPlay(true)

    // const switchSession = () => {
    //     return setTimeout(() => {
    //         switch(executing) {
    //             case 'Session':
    //                 setExecuting('Break')
    //                 setSeconds(59)
    //                 setMinutes(breakTime - 1)
    //                 setTimer(`${breakTime}:00`)
    //                 break
    //             case 'Break':
    //                 setExecuting('Session')
    //                 setSeconds(59)
    //                 setMinutes(sessionTime - 1)
    //                 setTimer(`${sessionTime}:00`)
    //                 break
    //             default:
    //                 return
    //         }
    //     },1000)
    // }

    // useEffect(() => {
    //     if(!executing) return
    //     const [ minutes, ] = timer.split(':').map(item => {return parseInt(item)})
        
    //     // setMinutes(minutes)
    //     // setSeconds(seconds)
    // },[play])

    // useEffect(() => {
    //     if(!executing) return
    //     setTimerId(parseTimer)
    // },[seconds])