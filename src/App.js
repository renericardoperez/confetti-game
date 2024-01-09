import React from 'react';
import './App.css';
import {usePersistStore, useStore} from "./store";
import Confetti from "./confetti/Confetti";

function App() {
  const { count, inc, reset } = useStore()
  const { wins, saveWin } = usePersistStore()
    const [showConfetti, setShowConfetti] = React.useState(false);

  const handleAction = (callback) => {
      callback();

      if(count >= 9) {
          setShowConfetti(true);
          saveWin();

          setTimeout(() => {
              setShowConfetti(false);
              reset();
              window.location.reload()
          }, 5000);
      }
  }

  return (
    <div className="App">
      <Confetti show={showConfetti} />
      <header className="App-header">
        <span className="confetti-icon">🎉</span>
        <h1 className="title">Hit <span style={{fontWeight:900, letterSpacing: '2px'}}>10</span> and claim the prize!</h1>
        <button className="button" onClick={()=>handleAction(inc)} disabled={count>=10}>one up</button>
        <p className="number">{count}</p>
        <br/>
        <button className="button red" onClick={reset} disabled={count===0 || count>=10}>reset</button>
        <br/>
        <p>WINS: {wins}</p>

      </header>
        <a href="https://www.flaticon.com/free-icons/confetti" title="confetti icons" className="attribution">Confetti icons created by Freepik - Flaticon</a>
    </div>
  );
}

export default App;
