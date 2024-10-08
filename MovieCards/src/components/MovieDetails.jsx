
import React, { useEffect, useState } from 'react';
import Modal from './Modal'; 
import { useParams } from 'react-router-dom';

const API_KEY = "a441d712"; 
const BASE_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

const MovieDetails = ({ showModal, onClose }) => {
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true); 
      try {
        const response = await fetch(`${BASE_URL}&i=${id}`);
        const data = await response.json();
        console.log("API Response:", data); 
        
        if (data.Response === "True") {
          setMovie(data); 
        } else {
          setMovie(null); 
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setMovie(null); 
      } finally {
        setLoading(false); 
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>Movie not found.</div>; 
  }

  return (
    <Modal isOpen={showModal} onClose={onClose}>
      <div className="flex flex-col items-center p-4">
        <img src={movie.Poster} alt={movie.Title} className="w-full h-auto max-w-md mb-4" />
        <h1 className="text-4xl font-bold mt-6">{movie.Title}</h1>
        <p className="mt-4 text-lg">{movie.Plot}</p>
        <p className="mt-2"><strong>Released:</strong> {movie.Released}</p>
        <p className="mt-2"><strong>Genre:</strong> {movie.Genre}</p>
        <p className="mt-2"><strong>Director:</strong> {movie.Director}</p>
        <p className="mt-2"><strong>Actors:</strong> {movie.Actors}</p> 
        <p className="mt-2"><strong>Rating:</strong> {movie.imdbRating}</p> 
      </div>
    </Modal>
  );
};

export default MovieDetails;
