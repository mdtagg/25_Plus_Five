import { useState } from 'react'
import './index.css'
import SessionTimeKeeper from '../components/SessionTimeKeeper'
import Counter from '../components/Counter'

function App() {

  const [breakTime, setBreakTime] = useState(1)
  const [sessionTime,setSessionTime] = useState(1)

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
        />
      </main>
    </>
  )
}

export default App
