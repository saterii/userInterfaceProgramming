import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';

function App() {
  const [highscores, setHighscores] = useState([]) 
  // load JSON
  async function fetchData() {
    try {
      let response = await axios.get("http://localhost:3001/highscores");
      setHighscores(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    fetchData();
  }, []) 
  const highscoreItems = highscores.map((highscore,index) =>
    <li key={index}>{highscore.name} : {highscore.score}</li>
  );
  return (

    <div className="App">

      <ul>
        {highscoreItems}
      </ul>

    </div>
  );
}

export default App;
