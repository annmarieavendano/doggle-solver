import './App.css';
import logo from './images/logo.png';
import DoggleBoard from './components/DoggleBoard';
import React, { useEffect } from 'react';

function App() 
{
  // only run once
  useEffect(() =>
  {
    DoggleBoard.init();  
  }, [])

  return (
    <div className="container">
      <div class="left-half">
        <h1>Doggle Solver</h1>
        <img src={logo} class="logo" alt="Doggle" />
        <DoggleBoard />
      </div>
      <div class="right-half">
          <h1>Right Half</h1>          
      </div>
    </div>
  );
}

export default App;
