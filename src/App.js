import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [ moviesList, setMoviesList ] = useState([])
  
  function fetchMoviesHandler() {
    fetch("https://swapi.dev/api/films/").then(response => response.json()).then(data => {
      const trasfromData = data.results.map(movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        }
      })
      setMoviesList(trasfromData);
    }).catch(err => console.error("Error: ",err))
  }
  
  console.log("Movies: ", moviesList)
  return (
    <React.Fragment>
      <section>
        <button onClick={() => { fetchMoviesHandler()}} >Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={moviesList} />
      </section>
    </React.Fragment>
  );
}

export default App;
