import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders for the current seller
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:8000/api/v1/seller/orders/', {
        headers: {
          Authorization: `Token ${token}`
        }
      })
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('Error fetching seller orders:', error);
      });
    }
  }, []);

  return (
    <div>
      <h2>Your Products Ordered by Customer</h2>
      <div className="order-list">
        {orders.map(order => (
          <div key={order.id} className="order-item">
            <p>Order ID: {order.id}</p>
            <p>Address: {order.address}</p>
            <p>Total Amount: ${order.total_amount}</p>
            {/* Add more order details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerOrders;
