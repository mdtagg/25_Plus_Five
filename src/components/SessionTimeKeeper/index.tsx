import "./index.css"
import { Icon } from "@iconify/react"

interface SessionTimeKeeperProps {
    type:string
    session:number
    setSession:React.Dispatch<React.SetStateAction<number>>
}

const SessionTimeKeeper = (props:SessionTimeKeeperProps) => {

    const { type, setSession, session } = props

    const handleIncrement = () => {
        if(session === 60) return
        setSession((prev) => {
            return prev += 1
        })
    }

    const handleDecrement = () => {
        if(session === 1) return
        setSession((prev) => {
            return prev -= 1
        })
    }

    return (
        <div 
            className="session-container"
        >
            <div 
                className="title"
            >
                {type}
            </div>
            <div 
                className="keeper-controls"
            >
                <Icon 
                    className="icon"
                    icon="ph:arrow-up-bold" 
                    onClick={handleIncrement}/>
                <div 
                    className="session-amount"
                >
                    {session}
                </div>
                <Icon 
                    className="test"
                    icon="ph:arrow-down-bold"
                    onClick={handleDecrement}
                />
            </div>
        </div>
    )
}

export default SessionTimeKeeper
