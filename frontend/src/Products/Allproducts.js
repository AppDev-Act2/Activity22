import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();

    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const handleAddToCart = async (productId) => {
    if (!loggedIn) {
      alert('Please log in to add products to your cart.');
      return;
    }

    try {
      // Add product to cart
      await axios.post(
        'http://127.0.0.1:8000/api/v1/cart/add/',
        { product_id: productId },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
        }
      );
      alert('Product added to cart successfully!');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart. Please try again.');
    }
  };

  return (
    <div>
      <h1>All Products</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h2>{product.product_name}</h2>
            <p>Description: {product.description}</p>
            <p>Category: {product.category}</p>
            <p>Price: {product.price}</p>
            {loggedIn && <button onClick={() => handleAddToCart(product.id)}>Add to Cart</button>}
            <Link to={`/products/${product.id}`}>View Details</Link>
            {loggedIn && <Link to={`/editproduct/${product.id}`}>Edit Product</Link>}
          </li>
        ))}
      </ul>
      {loggedIn && <Link to="/cart">View Cart</Link>}
    </div>
  );
}