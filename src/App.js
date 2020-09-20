import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [minute, setMinute] = useState(0)
  const [second, setSecond] = useState(0)
  const [timerInterval, setTimerInterval] = useState(0)
  const [running, setRunning] = useState(false)
  const bountyRune = new Audio('https://static.wikia.nocookie.net/dota2_gamepedia/images/3/3f/Rune_of_Bounty.mp3/revision/latest?cb=20141119020627')
  const toggle = () => {
    if (running) {
      clearInterval(timerInterval)
      setRunning(false)
    } else {
      const timerInterval = setInterval(() => {
        setSecond(s => {
          if (s === 59) setMinute(m => m + 1)
          return (s + 1) % 60
        })
      }, 1000);
      setTimerInterval(timerInterval)
      setRunning(true)
    }
  }

  useEffect(() => {
    if (minute % 5 === 4 && second === 50) {
      console.log('bounty in 10s')
      bountyRune.play()
    }
  })

  const minus = () => {
    if (second > 0) {
      setSecond(s => s - 1)
    } else {
      setSecond(() => 59)
      setMinute(m => m - 1)
    }
  }

  const plus = () => {
    if (second < 60) {
      setSecond(s => s + 1)
    } else {
      setSecond(() => 0)
      setMinute(m => m + 1)
    }
  }

  return (
    <div>
      <button onClick={() => toggle()}>
        Start/Stop
      </button>
      <div>
        {minute} : {second}
      </div>
      <div>
        <input id="number" type="number" value={minute} onChange={event => setMinute(event.target.value)}></input>
        <input id="number" type="number" value={second} onChange={event => setSecond(event.target.value)}></input>
      </div>
      <button onClick={() => minus()}>
        -
      </button>
      <button onClick={() => plus()}>
        +
      </button>
    </div>
  );
}



export default App;
