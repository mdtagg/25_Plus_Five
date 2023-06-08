import './index.css'
import SessionTimeKeeper from '../components/SessionTimeKeeper'
import Counter from '../components/Counter'

function App() {

  return (
    <>
      <main>
        <div className="one">
          25 + 5 Clock
        </div>
        <SessionTimeKeeper/>
        <SessionTimeKeeper/>
        {/* <div className="counter-container"> */}
          <Counter/>
        {/* </div> */}
      </main>
    </>
  )
}

export default App
