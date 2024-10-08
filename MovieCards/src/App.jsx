// src/App.jsx
import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import FavoriteList from './components/FavoriteList';
import Footer from './components/Footer'; 
import Joyride from 'react-joyride';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieDetails from './components/MovieDetails'; 

// replace the api key with your api key
const API_KEY = "a441d712";
const BASE_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [movieType, setMovieType] = useState('');
  const [loading, setLoading] = useState(false); 
  const [runTour, setRunTour] = useState(false); 

  const fetchMovies = async (query = 'Marvel', type = '') => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}&s=${query}&type=${type}`);
      const data = await response.json();
      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setMovies([]); 
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]); 
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchMovies(); 
  }, []);

  useEffect(() => {
    if (searchQuery) {
      fetchMovies(searchQuery, movieType); 
    }
  }, [searchQuery, movieType]);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('hasSeenTour');
    if (!hasSeenTour) {
      setRunTour(true); 
      localStorage.setItem('hasSeenTour', 'true'); 
    }
  }, []);

  const addToFavorites = (movie) => {
    const newFavorites = [...favorites, movie];
    setFavorites(newFavorites);
  };

  const removeFromFavorites = (imdbID) => {
    const newFavorites = favorites.filter((movie) => movie.imdbID !== imdbID);
    setFavorites(newFavorites);
  };

  const steps = [
    {
      target: '.search-bar',
      content: 'Start by searching for your favorite movies!',
    },
    {
      target: '.movie-list',
      content: 'Here are the movies fetched from the OMDB API.',
    },
    {
      target: '.favorite-list',
      content: 'Your favorite movies will appear here!',
    },
    {
      target: '.dropdown-filter',
      content: 'Use this dropdown to filter by movie type.',
    },
    {
      target: '.footer',
      content: 'Here is the footer with additional information.',
    },
  ];

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen py-8 px-4">
        <h1 className="text-5xl font-extrabold text-center text-yellow-600 mb-8">
          OMDB Movie Search
        </h1>

        <Joyride
          steps={steps}
          run={runTour}
          continuous
          scrollToFirstStep
          showSkipButton
          styles={{
            options: {
              zIndex: 10000,
            },
          }}
        />

        <div className="flex justify-center mb-4">
          <select 
            className="border px-4 py-2 rounded dropdown-filter"
            value={movieType}
            onChange={(e) => setMovieType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="movie">Movies</option>
            <option value="series">Series</option>
            <option value="episode">Episodes</option>
          </select>
        </div>

       
        <div className="flex justify-center my-4 search-bar">
          <SearchBar setSearchQuery={setSearchQuery} />
        </div>

      
        <FavoriteList favorites={favorites} removeFromFavorites={removeFromFavorites} className="favorite-list" />

      
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <>
            {movies.length === 0 ? (
              <div className="text-center text-gray-500">No movies found. Try another search.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-6 movie-list">
                <MovieList movies={movies} addToFavorites={addToFavorites} favorites={favorites} />
              </div>
            )}
          </>
        )}


        <Footer className="footer" />
      </div>

  
      <Routes>
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
 