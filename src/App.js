import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [minute, setMinute] = useState(0)
  const [second, setSecond] = useState(0)
  const [timerInterval, setTimerInterval] = useState(0)
  const [running, setRunning] = useState(false)
  
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
    const timers = Profile('off')
    timers.forEach(timer => timer())
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

  const Profile = (position) => {
    
    const OffProfile = () => {
        return [bountyRuneTimer]
    }

    const MidProfile = () => {
        return [bountyRuneTimer, powerRuneTimer]
    }

    const SoftSupProfile = () => {
        return []
    }

    const HardSupProfile = () => {
        return []
    }
    const profile = {
        'mid': MidProfile,
        'off': OffProfile,
        'soft-sup': SoftSupProfile,
        'hard-sup': HardSupProfile
    }

    const runeTimer = (audio, interval) => {
        if (minute % interval === interval - 1 && second === 48) {
            console.log('bounty in 10s')
            audio.play()
          }
    }

    const bountyRuneTimer = () => {
        const bountyAudio = new Audio('https://static.wikia.nocookie.net/dota2_gamepedia/images/3/3f/Rune_of_Bounty.mp3/revision/latest?cb=20141119020627')
        runeTimer(bountyAudio, 5)
    }

    const powerRuneTimer = () => {
        const powerAudio = new Audio('https://static.wikia.nocookie.net/dota2_gamepedia/images/2/26/Rune_of_Invisibility.mp3/revision/latest?cb=20141119020651')
        runeTimer(powerAudio, 2)
    }

    return profile[position]()
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
