import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add state for authentication status
  const [reviewText, setReviewText] = useState(''); // State to store review text

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/products/${productId}/`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();

    // Check authentication status
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists
  }, [productId]);

  const handleSubmitReview = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('User not authenticated'); // Handle case where user is not authenticated
        return;
      }
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      };
  
      // Fetch authenticated user details from 'users/me' endpoint
      const response = await axios.get('http://127.0.0.1:8000/api/v1/auth/users/me', config);
      const userId = response.data.id; // Get the user ID from the response data
  
      const reviewData = {
        product: productId,
        user: userId, // Include the user ID
        review: reviewText
      };
  
      await axios.post('http://127.0.0.1:8000/api/v1/add_review/', reviewData, config);
      
      // Clear the review text after submission
      setReviewText('');
      
      // Optionally, you can fetch the updated product data to reflect the newly added review
      // For simplicity, I'm just logging a message here
      console.log('Review added successfully');
    } catch (error) {
      console.error('Error adding review:', error);
      // Handle error, e.g., display an error message to the user
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product.product_name}</h1>
      <p>Description: {product.description}</p>
      <p>Category: {product.category}</p>
      <p>Price: {product.price}</p>
      {isLoggedIn && (
        <>
          <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
          <button onClick={handleSubmitReview}>Submit Review</button>
        </>
      )}
    </div>
  );
}
