import Clicker from './Clicker'
import UpgradeShop from './UpgradeShop'

// Notice: GameArea receives all these props but doesn't use any of them.
// It only exists to pass them down to its children.
function GameArea({ score, setScore, multiplier, setMultiplier }) {
  return (
    <div className="game-area">
      <Clicker
        score={score}
        setScore={setScore}
        multiplier={multiplier}
      />
      <UpgradeShop
        score={score}
        setScore={setScore}
        multiplier={multiplier}
        setMultiplier={setMultiplier}
      />
    </div>
  )
}

export default GameArea
