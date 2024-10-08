
import React from 'react';

const FavoriteList = ({ favorites, removeFromFavorites }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-center">Favorite Movies</h2>
      {favorites.length > 0 ? (
        <ul className="space-y-2">
          {favorites.map((movie) => (
            <li key={movie.imdbID} className="flex items-center justify-between bg-gray-100 p-2 rounded">
              <span>{movie.Title} ({movie.Year})</span>
              <button
                onClick={() => removeFromFavorites(movie.imdbID)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorite movies added yet.</p>
      )}
    </div>
  );
};

export default FavoriteList;
