import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const { category } = useParams(); // Get category from route parameters

  useEffect(() => {
    const fetchProducts = () => {
      let url = 'https://fakestoreapi.com/products';
      if (category) {
        url = `https://fakestoreapi.com/products/category/${category}`;
      }
      
      fetch(url)
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(error => console.error('Error fetching data:', error));
    };

    fetchProducts();
  }, [category]); // Re-fetch when category changes

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
      {products.map(product => (
        <div key={product.id} className="border p-4 shadow-md rounded-lg transform transition hover:scale-105 flex flex-col justify-between h-full">
          <div>
            <img src={product.image} alt={product.title} className="w-full h-64 mb-4" />
            <h2 className="font-bold text-lg">{product.title}</h2>
            <p className="text-gray-700 mb-4">${product.price}</p>
          </div>
          <button
            className="w-full bg-black text-white py-2 px-4 round transition mt-auto"
            onClick={() => addToCart(product)}>
            <span>Add to <i className="fas fa-shopping-cart"></i></span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
