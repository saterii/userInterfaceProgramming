import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import YouTube from 'react-youtube';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

Modal.setAppElement("#root")




function MovieList() {
  const [movies, setMovies] = useState([]) 
  useEffect(() => {
    axios
      .get('https://api.themoviedb.org/3/movie/now_playing?api_key=f7828d47c2dd6f3cc1d4475a4e9faaee&append_to_response=videos')
      .then(response => {
        setMovies(response.data.results)
      })
  }, [])
  
  if (movies.length === 0) {
    return(
      <div style={{flex: 1, padding: 20}}>
        <p>Loading, please wait...</p>
      </div>
    )
  } else {
      const movieItems = movies.map((movie,index) =>
        <MovieListItem key={index} movie={movie}/>
        
      );
      return(
        <div className='Movies'>
          {movieItems}
        </div>
      )
  }
  
}


function MovieListItem(props) {
  const [movie, setMovie] = useState([])
  useEffect(() => {
      axios
        .get('https://api.themoviedb.org/3/movie/'+props.movie.id+'?api_key=f7828d47c2dd6f3cc1d4475a4e9faaee&append_to_response=videos')
        .then(response => {
          setMovie(response.data)
        })
    }, [])
    
    let IMAGEPATH = 'http://image.tmdb.org/t/p/w500'
    let imageurl = IMAGEPATH + props.movie.poster_path;

    // get genres
    var genres = "";  
    if (movie !== undefined && movie.genres !== undefined) {
      for (var i=0;i<movie.genres.length;i++) {
        if(i != movie.genres.length - 1){
          genres += movie.genres[i].name+", ";
        }
        else{
          genres += movie.genres[i].name;
        }
      }
    }

    // MAKE THIS FUNCTION PLAY A VIDEO
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [videoLink, setVideoLink] = React.useState();

    function closeModal() {
      setIsOpen(false);
    }
    function videoPressed(link){
      setVideoLink(link)
      setIsOpen(true);
      return(
        <div>
          <YouTube videoId={link}></YouTube>
        </div>
      )
    }  


    var videos = []
     if (movie !== undefined && movie.videos !== undefined && movie.videos.results !== undefined) {
      for (var i=0;i<movie.videos.results.length;i++){
        let link = movie.videos.results[i].key
        videos.push(<span className="videoLink" onClick={()=>videoPressed(link)}>{movie.videos.results[i].name}</span>)
        if(i < movie.videos.results.length - 1){
        videos.push(" | ")
        }
      }
     }
     const videoOptions = {
      playerVars: {
        autoplay: 1,
        controls: 0,
        rel: 0,
        showinfo: 0,
        
      },
      
      width: "100%",
      height: 835,
      
    };
    return(
      <div className="movieBox">
      <img alt="poster" src={imageurl}></img>
      <p className='title'>{props.movie.original_title}</p>
      <p className='genres'>Genres: {genres}</p>
      <p className='desc'>{props.movie.overview}</p>
      <p className='videos'>{videos}</p>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <YouTube opts={videoOptions} videoId={videoLink}></YouTube>
      </Modal>
      
      </div>
    )
}



function App() {
  return (
    
      <div className="App">
        <MovieList/>
      </div>
      
    
  );
}

export default App;
