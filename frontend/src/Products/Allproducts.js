import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Fetch products from your backend API
    axios.get('http://127.0.0.1:8000/api/v1/products/')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));

    // Check if user is logged in
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleAddToCart = async (productId) => {
    if (!isLoggedIn) {
      alert('Please login to add items to your cart.');
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/v1/carts/',
        { product: productId }, // Changed to 'product' as required by the backend
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`  // Adjusted for simple token
          }
        }
      );

      if (response.status === 200 || response.status === 201) {
        console.log('Product added to cart:', response.data);
        alert('Product added to cart successfully!');
      } else {
        console.error('Failed to add product to cart');
        alert('Failed to add product to cart');
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
        alert(`Failed to add product to cart: ${error.response.data.message || error.response.statusText}`);
      } else if (error.request) {
        // Request was made but no response was received
        console.error('Error request:', error.request);
        alert('Failed to add product to cart: No response received from server.');
      } else {
        // Something happened in setting up the request
        console.error('Error message:', error.message);
        alert(`Failed to add product to cart: ${error.message}`);
      }
    }
  };

  return (
    <div>
      <h2>Products</h2>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product">
            <h3>{product.product_name}</h3>
            <p>Description: {product.description}</p>
            <p>Price: ${product.price}</p>
            <button onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
