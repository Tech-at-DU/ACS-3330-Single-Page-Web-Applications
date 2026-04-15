function Header({ score }) {
  return (
    <header className="header">
      <h1>Clicker Game</h1>
      <span className="header-score">Score: {score}</span>
    </header>
  )
}

export default Header
