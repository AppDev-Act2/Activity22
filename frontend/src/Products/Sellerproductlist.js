import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Sellerproductlist() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          // If user is not logged in, do not fetch products
          return;
        }
        const userData = await axios.get('http://127.0.0.1:8000/api/v1/auth/users/me', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        const userId = userData.data.id;
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/user_products/${userId}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchUserProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h2>{product.product_name}</h2>
            <p>Description: {product.description}</p>
            <p>Category: {product.category}</p>
            <p>Price: {product.price}</p>
            <p>Stock Quantity: {product.stock_quantity}</p>
            <p>Stock Small Size: {product.stock_small_size}</p>
            <p>Stock Medium Size: {product.stock_medium_size}</p>
            <p>Stock Large Size: {product.stock_large_size}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
