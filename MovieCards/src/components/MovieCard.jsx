import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie, addToFavorites, isFavorite }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow">
      <Link to={`/movie/${movie.imdbID}`}>
        <img src={movie.Poster} alt={movie.Title} className="w-full h-80 object-cover" />
      </Link>
      <div className="p-4">
        <Link to={`/movie/${movie.imdbID}`}>
          <h2 className="text-xl font-semibold mb-2 text-indigo-700">{movie.Title}</h2>
        </Link>
        <p className="text-gray-500">Year: {movie.Year}</p>
        <p className="text-gray-500">Type: {movie.Type}</p>
        <button
          onClick={() => addToFavorites(movie)}
          disabled={isFavorite}
          className={`mt-4 py-2 px-4 rounded transition-colors ${isFavorite ? 'bg-gray-300 cursor-not-allowed' : 'bg-yellow-500 text-white hover:bg-black'}`}
        >
          {isFavorite ? 'Added to Favorites' : 'Add to Favorites'}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
