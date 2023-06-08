import "./index.css"
import { Icon } from "@iconify/react"

const SessionTimeKeeper = () => {

    const handleClick = () => {
        console.log('test')
    }

    return (
        <div className="session-container">
            <div className="title">Break Length</div>
            <div className="keeper-controls">
                <Icon 
                    className="test"
                    icon="ph:arrow-up-bold" 
                    onClick={handleClick}/>
                <div>Amount</div>
                <Icon 
                    className="test"
                    icon="ph:arrow-down-bold"
                    onClick={handleClick}
                />
            </div>
        </div>
    )
}

export default SessionTimeKeeper
