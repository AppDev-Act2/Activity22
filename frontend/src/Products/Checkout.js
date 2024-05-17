import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedProductDetails } = location.state || { selectedProductDetails: [] };
  const [address, setAddress] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://127.0.0.1:8000/api/v1/auth/users/me/', {
        headers: {
          Authorization: `Token ${token}`
        }
      })
      .then(response => {
        setUserId(response.data.id);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
    }
  }, []);

  const calculateTotalAmount = () => {
    const total = selectedProductDetails.reduce((total, product) => {
      return total + (parseFloat(product.price) || 0);
    }, 0);
    return total.toFixed(2);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleConfirmPurchase = async () => {
    const totalAmount = calculateTotalAmount();

    const checkoutData = {
      cart: selectedProductDetails.map(product => product.cartItemId),
      buyer: userId,
      address,
      total_amount: totalAmount,
    };

    const token = localStorage.getItem('token');

    try {
      await axios.post('http://localhost:8000/api/v1/orders/', checkoutData, {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      alert('Purchase confirmed!');
      navigate('/products');
    } catch (error) {
      console.error('Error confirming purchase:', error);
      if (error.response) {
        console.error('Error response:', error.response);
      }
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      {selectedProductDetails.length === 0 ? (
        <p>No products selected for checkout.</p>
      ) : (
        <div className="checkout-items">
          {selectedProductDetails.map(product => (
            <div key={product.id} className="checkout-item">
              <p>Product: {product.product_name}</p>
              <p>Description: {product.description}</p>
              <p>Price: ${product.price}</p>
            </div>
          ))}
          <h3>Total Amount: ${calculateTotalAmount()}</h3>
          <div>
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={handleAddressChange}
            />
          </div>
          <button onClick={handleConfirmPurchase}>Confirm Purchase</button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
