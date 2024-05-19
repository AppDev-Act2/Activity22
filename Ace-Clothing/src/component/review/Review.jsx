import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './AllReviews.css'; // Import CSS file for styling
import http from '../../utils/fetchFromApi';

export default function AllReviews() {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token !== null;
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login'); // Redirect to login page if not authenticated
      return;
    }

    const fetchReviews = async () => {
      try {
        const response = await http.get('reviews/');
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [navigate]);

  return (
    <div className="all-reviews-container"> {/* Centering container */}
      <h1>All Reviews</h1>
      <div className="reviews-wrapper"> {/* Flexbox wrapper for reviews */}
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}

function ReviewItem({ review }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await http.get(`products/${review.product}/`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [review.product]);

  return (
    <div className="review-item"> {/* Styled review box */}
      <h2>Review ID: {review.id}</h2>
      {product && (
        <>
          <p style={{ fontSize: '15px', marginTop: '10px' }}>Product Name:</p>
          <p style={{ fontSize: '20px', fontWeight: "bold" }}>{product.product_name}</p>
          <p style={{ fontSize: '15px' }}>Product Description:</p>
          <p style={{ fontSize: '20px', fontWeight: "bold" }}>{product.description}</p>
          <p style={{ fontSize: '15px' }}>Product Price:</p>
          <p style={{ fontSize: '20px', fontWeight: "bold" }}>{product.price}</p>
        </>
      )}
      <p style={{ fontSize: '20px', marginTop: 10 }}>Review:</p>
      <p style={{ fontSize: '25px', fontWeight: 'bold' }}>{review.review}</p>
    </div>
  );
}
