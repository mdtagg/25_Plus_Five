import { useState } from 'react'
import './index.css'
import SessionTimeKeeper from '../components/SessionTimeKeeper'
import Counter from '../components/Counter'

function App() {

  const [breakTime, setBreakTime] = useState(5)
  const [sessionTime,setSessionTime] = useState(25)
  const [executing,setExecuting] = useState('')

  return (
    <>
      <main>
        <div className="one">
          25 + 5 Clock
        </div>
        <SessionTimeKeeper
          type="Break"
          session={breakTime}
          setSession={setBreakTime}
        />
        <SessionTimeKeeper
          type="Session"
          session={sessionTime}
          setSession={setSessionTime}
        />
        <Counter
          breakTime={breakTime}
          sessionTime={sessionTime}
          executing={executing}
          setExecuting={setExecuting}
        />
      </main>
    </>
  )
}

export default App
