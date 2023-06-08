import "./index.css"

const Counter = () => {
    return (
        <div className="counter-container">
            <div className="counter">
                <p>Session</p>
                <p>25:00</p>
            </div>
            <div className="controls">
                <button className="pause">Pause</button>
                <button className="play">Play</button>
                <button className="reset">Reset</button>
            </div>
        </div>
    )
}

export default Counter