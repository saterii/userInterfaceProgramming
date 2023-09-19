import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios'

function MovieList(){
  const [movies, setMovies] = useState([])
  useEffect(() => {
    axios
      .get('https://api.themoviedb.org/3/movie/now_playing?api_key=f7828d47c2dd6f3cc1d4475a4e9faaee&append_to_response=videos')
      .then(response => {
        setMovies(response.data.results)
      })
  }, [])
  function MovieListItem(props) {
    return(
      <p>{props.movie.original_title}</p>
    )
  }
  return(
    MovieListItem(movies)
  )
}





function App() {
  return (
    <div className="App">
      <MovieList />
    </div>
  );
}

export default App;
