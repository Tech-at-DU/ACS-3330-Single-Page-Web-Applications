function UpgradeShop({ score, setScore, multiplier, setMultiplier }) {
  const cost = multiplier * 10

  function buyUpgrade() {
    setScore(score - cost)
    setMultiplier(multiplier + 1)
  }

  return (
    <div className="upgrade-shop">
      <h2>Upgrades</h2>
      <div className="upgrade">
        <div>
          <strong>Bigger Clicks</strong>
          <p>Each click earns +1 more point</p>
        </div>
        <button
          onClick={buyUpgrade}
          disabled={score < cost}
        >
          Buy ({cost} pts)
        </button>
      </div>
      <p className="multiplier-display">Current multiplier: x{multiplier}</p>
    </div>
  )
}

export default UpgradeShop
