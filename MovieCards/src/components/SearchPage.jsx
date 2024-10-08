import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import MovieList from './MovieList';
import Pagination from './Pagination';

const SearchPage = () => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [query, setQuery] = useState('');
  const [movieType, setMovieType] = useState(''); 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // const apiKey = ''; 

 
  useEffect(() => {
    if (query) {
      fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}&type=${movieType}&page=${currentPage}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.Response === 'True') {
            setMovies(data.Search);
            setTotalPages(Math.ceil(data.totalResults / 10));
          } else {
            setMovies([]);
          }
        });
    }
  }, [query, movieType, currentPage]);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setCurrentPage(1); 
  };

  const handleAddToFavorites = (movie) => {
    setFavorites([...favorites, movie]);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      
      <div className="flex justify-center mt-4">
        <select
          value={movieType}
          onChange={(e) => setMovieType(e.target.value)}
          className="border px-4 py-2 rounded"
        >
          <option value="">All Types</option>
          <option value="movie">Movies</option>
          <option value="series">Series</option>
          <option value="episode">Episodes</option>
        </select>
      </div>

      <MovieList movies={movies} addToFavorites={handleAddToFavorites} favorites={favorites} />

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default SearchPage;
