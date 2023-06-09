import "./index.css"
import { Icon } from "@iconify/react"

interface SessionTimeKeeperProps {
    type:string
    session:number
    setSession:React.Dispatch<React.SetStateAction<number>>
    executing:string | undefined
}

const SessionTimeKeeper = (props:SessionTimeKeeperProps) => {

    const { type, setSession, session, executing } = props

    const firstWord = type === 'Break Length' ? 'break' : 'session'

    const titleId = `${firstWord}-label`
    const decrementId = `${firstWord}-decrement`
    const incrementId = `${firstWord}-increment`
    const sessionId = `${firstWord}-length`


    const handleIncrement = () => {
        if(session >= 60 || executing) return
        setSession((prev) => {
            return prev + 1
        })
    }

    const handleDecrement = () => {
        if(session <= 1 || executing) return;
        setSession((prev) => {
            if(prev === 1) return 1
            return prev - 1
        })
     }

    return (
        <div className="keeper-container">
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
                    {session}
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
