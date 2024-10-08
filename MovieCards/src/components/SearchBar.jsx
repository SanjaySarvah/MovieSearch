import React, { useState } from 'react';

const SearchBar = ({ setSearchQuery }) => {
  const [query, setQuery] = useState('');


  const handleSearch = (e) => {
    e.preventDefault();
    if (query.length >= 3) { 
      setSearchQuery(query);
    } else {
      alert('Please enter at more than 3 characters');
    }
  };


  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    
    if (newQuery.length >= 3) {
      setSearchQuery(newQuery);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex space-x-4 w-full max-w-md">
      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={handleInputChange}
        className="w-full p-3 border border-black rounded-l-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
      <button
        type="submit"
        className="p-3 bg-black text-white rounded-r-lg hover:bg-grey-600 transition-colors"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
