import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [productDetails, setProductDetails] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/carts/')
      .then(response => {
        setCartItems(response.data);
        fetchProductDetails(response.data);
      })
      .catch(error => console.error('Error fetching cart items:', error));
  }, []);

  const fetchProductDetails = async (cartItems) => {
    const productDetails = {};
    for (let item of cartItems) {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/products/${item.product}/`);
        productDetails[item.product] = response.data;
      } catch (error) {
        console.error(`Error fetching product details for product ID ${item.product}:`, error);
      }
    }
    setProductDetails(productDetails);
  };

  const handleCheckboxChange = (cartItemId) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(cartItemId)) {
        return prevSelectedItems.filter(item => item !== cartItemId);
      } else {
        return [...prevSelectedItems, cartItemId];
      }
    });
  };

  const handleCheckout = () => {
    const selectedProductDetails = cartItems
      .filter(item => selectedItems.includes(item.id))
      .map(item => ({
        ...productDetails[item.product],
        cartItemId: item.id,
      }));

    navigate('/checkout', { state: { selectedProductDetails } });
  };

  return (
    <div>
      <h2>Cart</h2>
      <div className="cart-items">
        {cartItems.map(item => {
          const product = productDetails[item.product] || {};
          return (
            <div key={item.id} className="cart-item">
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={() => handleCheckboxChange(item.id)}
              />
              <p>Product: {product.product_name}</p>
              <p>Description: {product.description}</p>
              <p>Price: ${product.price}</p>
            </div>
          );
        })}
      </div>
      <button onClick={handleCheckout} disabled={selectedItems.length === 0}>
        Checkout
      </button>
    </div>
  );
};

export default Cart;
