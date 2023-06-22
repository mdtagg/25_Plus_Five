import { useState } from 'react'
import './index.css'
import SessionTimeKeeper from '../components/SessionTimeKeeper'
import Counter from '../components/Counter'

function App() {

  const [ breakTime, setBreakTime ] = useState(5)
  const [ sessionTime, setSessionTime ] = useState(25)

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
        />
        <SessionTimeKeeper
          type="Session Length"
          session={sessionTime}
          setSession={setSessionTime}
        />
        <Counter
          breakTime={breakTime}
          sessionTime={sessionTime}
          setSessionTime={setSessionTime}
          setBreakTime={setBreakTime}
        />
      </main>
    </>
  )
}

export default App
