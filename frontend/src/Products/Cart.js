import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Cart({ userId }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/cart/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, [userId]);

  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            <p>User: {item.user.email}</p> {/* Assuming 'email' is a field in the 'CustomUser' model */}
            <p>Product: {item.product.product_name}</p> {/* Assuming 'product_name' is a field in the 'Product' model */}
            {/* Add other item details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}
