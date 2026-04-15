import { useState } from 'react'
import Header from './components/Header'
import GameArea from './components/GameArea'
import './App.css'

function App() {
  const [score, setScore] = useState(0)
  const [multiplier, setMultiplier] = useState(1)

  return (
    <div className="app">
      <Header score={score} />
      <GameArea
        score={score}
        setScore={setScore}
        multiplier={multiplier}
        setMultiplier={setMultiplier}
      />
    </div>
  )
}

export default App
