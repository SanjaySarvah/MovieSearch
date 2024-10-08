import React, { useState } from 'react';
import Modal from './Modal';

const MovieList = ({ movies, addToFavorites, favorites }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const openModal = async (movie) => {
    setLoading(true);
    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=a441d712&i=${movie.imdbID}`);
      const data = await response.json();
      setSelectedMovie(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setIsModalOpen(false);
  };

  return (
    <>
      {movies.map((movie) => (
        <div key={movie.imdbID} className="bg-white rounded-lg shadow-lg p-4">
          <img src={movie.Poster} alt={movie.Title} className="w-full h-64 object-cover rounded" />
          <h3 className="text-lg font-bold mt-2">{movie.Title}</h3>
          <p>{movie.Year}</p>
          <div className="mt-4 flex justify-between">
            <button
              className="bg-yellow-600 text-white px-4 py-2 rounded"
              onClick={() => addToFavorites(movie)}
              disabled={favorites.find((fav) => fav.imdbID === movie.imdbID)}
            >
              {favorites.find((fav) => fav.imdbID === movie.imdbID) ? 'Favorited' : 'Add to Favorites'}
            </button>
            <button
              onClick={() => openModal(movie)}
              className="text-blue-500"
            >
              Details
            </button>
          </div>
        </div>
      ))}

     
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {loading ? (
          <div className="text-gray-500">Loading...</div>
        ) : selectedMovie ? (
          <div className="text-center space-y-4">
            <img src={selectedMovie.Poster} alt={selectedMovie.Title} className="w-full h-auto max-w-md rounded-lg shadow-lg mb-4" />
            <h1 className="text-3xl font-bold">{selectedMovie.Title}</h1>
            <p className="mt-2 text-lg">{selectedMovie.Plot}</p>

            <div className="flex flex-col items-center space-y-2">
              <p><strong>Released:</strong> {selectedMovie.Released}</p>
              <p><strong>Genre:</strong> {selectedMovie.Genre}</p>
              <p><strong>Director:</strong> {selectedMovie.Director}</p>
              <p><strong>Actors:</strong> {selectedMovie.Actors}</p>
              <p><strong>Rating:</strong> {selectedMovie.imdbRating}</p>
            </div>

        
            <button
              onClick={closeModal}
              className="bg-blue-500 text-white px-6 py-2 mt-4 rounded-lg hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="text-red-500">Movie details not available.</div>
        )}
      </Modal>
    </>
  );
};

export default MovieList;
