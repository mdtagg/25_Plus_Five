import "./index.css"
import { Icon } from "@iconify/react"

interface SessionTimeKeeperProps {
    type:string
    sessionTime:number
    setSessionTime:React.Dispatch<React.SetStateAction<number>>
    executing:string | null
}

const SessionTimeKeeper = (props:SessionTimeKeeperProps) => {

    const { type, setSessionTime, sessionTime, executing } = props

    let titleId = 'session-label'
    let decrementId = 'session-decrement'
    let incrementId = 'session-increment'
    let sessionId = 'session-length'

    if(type === 'Break Length') {
        titleId = 'break-label'
        decrementId = 'break-decrement'
        incrementId = 'break-increment'
        sessionId = 'break-length'
    }

    const handleIncrement = () => {
        if(sessionTime >= 60 || executing) return
        setSessionTime((prev) => {
            return prev += 1
        })
    }

    const handleDecrement = () => {
        if(sessionTime <= 1 || executing) return
        setSessionTime((prev) => {
            return prev -= 1
        })
    }

    return (
        <div className="session-container">
            <div id={titleId}>
                {type}
            </div>
            <div className="keeper-controls">

                <button 
                    id={incrementId} 
                    onClick={handleIncrement}
                >
                    <Icon className="icon" icon="ph:arrow-up-bold" />
                </button>
                
                <p id={sessionId}>
                    {sessionTime}
                </p>

                <button
                    id={decrementId}
                    onClick={handleDecrement}
                >
                    <Icon className="icon" icon="ph:arrow-down-bold" />
                </button>
            </div>
        </div>
    )
}

export default SessionTimeKeeper
