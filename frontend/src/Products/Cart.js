import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Cart({ userId }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/cart/${userId}`);
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
            <p>Product Name: {item.product_name}</p>
            <p>Price: {item.price}</p>
            {/* Add other item details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}
