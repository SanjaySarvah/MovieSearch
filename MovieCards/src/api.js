const API_KEY = "a441d712";
const BASE_URL = "https://www.omdbapi.com/";

export const searchMovies = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}?s=${query}&apikey=${API_KEY}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching movies.");
  }
};

export const getMovieDetails = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}?i=${id}&apikey=${API_KEY}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching movie details.");
  }
};
