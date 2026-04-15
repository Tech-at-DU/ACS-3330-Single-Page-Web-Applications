function Clicker({ score, setScore, multiplier }) {
  function handleClick() {
    setScore(score + multiplier)
  }

  return (
    <div className="clicker">
      <button className="click-button" onClick={handleClick}>
        Click!
      </button>
      <p>+{multiplier} per click</p>
    </div>
  )
}

export default Clicker
