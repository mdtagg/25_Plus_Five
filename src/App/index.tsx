import { useState } from 'react'
import './index.css'
import SessionTimeKeeper from '../components/SessionTimeKeeper'
import Timer from '../components/Timer'

function App() {

  const [ breakTime, setBreakTime ] = useState(5)
  const [ sessionTime, setSessionTime ] = useState(25)
  const [ executing, setExecuting ] = useState<string | undefined>(undefined)

  return (
    <>
      <main>
        <div className="main-title">
          25 + 5 Clock
        </div>
        <SessionTimeKeeper
          type="Break Length"
          session={breakTime}
          setSession={setBreakTime}
          executing={executing}
        />
        <SessionTimeKeeper
          type="Session Length"
          session={sessionTime}
          setSession={setSessionTime}
          executing={executing}
        />
        <Timer
          breakTime={breakTime}
          setBreakTime={setBreakTime}
          sessionTime={sessionTime}
          setSessionTime={setSessionTime}
          executing={executing}
          setExecuting={setExecuting}
        />
      </main>
    </>
  )
}

export default App
