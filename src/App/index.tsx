import { useState } from 'react'
import './index.css'
import SessionTimeKeeper from '../components/SessionTimeKeeper'
import Counter from '../components/Counter'
import Timer from '../components/Timer'

function App() {

  const [ breakTime, setBreakTime ] = useState(5)
  const [ sessionTime, setSessionTime ] = useState(25)
  const [ executing, setExecuting ] = useState<string | null>(null)

  return (
    <>
      <main>
        <div className="one">
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
          executing={executing}
          setSessionTime={setSessionTime}
        />
        {/* <Counter
          breakTime={breakTime}
          sessionTime={sessionTime}
          setSessionTime={setSessionTime}
          setBreakTime={setBreakTime}
          executing={executing}
          setExecuting={setExecuting}
        /> */}
      </main>
    </>
  )
}

export default App
