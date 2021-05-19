import React, {useState, useEffect} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [moviesList,setMoviesList] = useState([])
  const [title,setTitle] = useState("Fetch Movies")
  const [loading,setLoading] = useState(false)
  const [error, setError] = useState(null)
  
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
      setLoading(true)
      setError(null)

      try {
      const response = await fetch("https://swapi.dev/api/films/")
       if (!response.ok) {
          throw new Error("Something Went Wrong!!")
      }
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
      } catch (err) {
        setError(err.message)
      }
      setLoading(false)
      
    } else {
      setMoviesList([])
      setTitle("Fetch Movies")
    }
   }
  
  console.log("Movies: ", moviesList)
  return (
    <React.Fragment>
      <section>
        <button onClick={() => {fetchMoviesHandler();}} >{loading ? "Loading" : title}</button>
      </section>
      <section>
        {moviesList.length === 0 ? <p>Press Button to Display Movie List</p> : <MoviesList movies={moviesList} />}
        {moviesList.length === 0 && error ? error : null}
      </section>
    </React.Fragment>
  );
}

export default App;
