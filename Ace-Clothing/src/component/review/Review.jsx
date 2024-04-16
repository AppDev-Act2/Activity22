import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AllReviews.css'; // Import CSS file for styling

export default function AllReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/get_reviews/');
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

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
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/products/${review.product}/`);
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
      <p style={{ fontSize: '20px', marginTop: 10 }}>Review:</p>
      <p style={{ fontSize: '25px', fontWeight: 'bold' }}>{review.review}</p>
      {/* <p>Product ID: {review.product}</p> */}
      {product && (
        <>
          <p style={{ fontSize: '15px', marginTop: '10px' }}>Product Name:</p>
          <p style={{ fontSize: '20px', fontWeight: "bold" }}>{product.product_name}</p>
          <p style={{ fontSize: '15px' }}>Product Description:</p>
          <p style={{ fontSize: '20px', fontWeight: "bold" }}>{product.description}</p>
          <p style={{ fontSize: '15px' }}>Product Category:</p>
          <p style={{ fontSize: '20px', fontWeight: "bold" }}>{product.category}</p>
          <p style={{ fontSize: '15px' }}>Product Price:</p>
          <p style={{ fontSize: '20px', fontWeight: "bold" }}>{product.price}</p>
        </>
      )}
    </div>
  );
}
