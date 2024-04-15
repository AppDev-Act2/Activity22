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
        
        // Fetch product details for each item in the cart
        const productDetailsPromises = response.data.map(async (item) => {
          const productResponse = await axios.get(`http://127.0.0.1:8000/api/v1/products/${item.product}/`, {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
          console.log('Product details:', productResponse.data); // Add logging
          return { ...item, productDetails: productResponse.data };
        });
        
        // Wait for all product detail requests to finish
        const cartItemsWithProductDetails = await Promise.all(productDetailsPromises);

        setCartItems(cartItemsWithProductDetails);
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
            <p>User: {item.user.email}</p>
            {item.productDetails ? ( // Add conditional rendering
              <>
                <p>Product: {item.productDetails.product_name}</p>
                <p>Price: {item.productDetails.price}</p>
              </>
            ) : (
              <p>Loading product details...</p>
            )}
            {/* Add other item details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}
