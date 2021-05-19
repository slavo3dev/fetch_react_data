import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [moviesList,setMoviesList] = useState([])
  const [ title, setTitle ] = useState("Fetch Movies")
  
  // function fetchMoviesHandler() {

  //   if (moviesList.length === 0) {
  //     setTitle("Reset Movie List")
  //     fetch("https://swapi.dev/api/films/").then(response => response.json()).then(data => {
  //     const trasfromData = data.results.map(movieData => {
  //       return {
  //         id: movieData.episode_id,
  //         title: movieData.title,
  //         openingText: movieData.opening_crawl,
  //         releaseDate: movieData.release_date
  //       }
  //     })
  //     setMoviesList(trasfromData);
  //   }).catch(err => console.error("Error: ",err))
  //   } else {
  //     setMoviesList([])
  //     setTitle("Fetch Movies")
  //   }
  // }

   async function fetchMoviesHandler() {

    if (moviesList.length === 0) {
      setTitle("Reset Movie List")
      const response = await fetch("https://swapi.dev/api/films/")
        
      const data =  await response.json()
        
      const trasfromData = data.results.map(movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        }
      })
      setMoviesList(trasfromData);
      setTitle("Reset Movie List")
    } else {
      setMoviesList([])
      setTitle("Fetch Movies")
    }
  }

  
  console.log("Movies: ", moviesList)
  return (
    <React.Fragment>
      <section>
        <button onClick={() => {fetchMoviesHandler();}} >{title}</button>
      </section>
      <section>
        <MoviesList movies={moviesList} />
      </section>
    </React.Fragment>
  );
}

export default App;
