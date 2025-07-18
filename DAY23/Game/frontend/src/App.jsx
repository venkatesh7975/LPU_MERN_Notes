import React from 'react'
import "./App.css"

export default function App() {
  const [score, setScore] = React.useState(0);

  const onCardClick = () => {
    setScore(score + 1);
  }
  return (
    <div>

      <h1>Game</h1>
      <div id="container" onClick={onCardClick}></div>
      <h2>Score: {score}</h2>
    </div>
  )
}
