import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Review({ productId }) {
  const [comment, setComment] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setLoggedIn(!!storedToken);
  }, []);

  const handleSubmitReview = async () => {
    try {
      const userData = await axios.get('http://127.0.0.1:8000/api/v1/auth/users/me', {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });
      const userId = userData.data.id;

      await axios.post('http://127.0.0.1:8000/api/v1/review', {
        product: productId,
        user: userId,
        review: comment,
      }, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });

      alert('Review submitted successfully!');
      setComment(''); // Clear the comment after submission
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Error submitting review');
    }
  };

  return (
    <div>
      <h2>Write a Review</h2>
      <label>Comment:</label>
      <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
      {loggedIn ? (
        <button onClick={handleSubmitReview}>Submit Review</button>
      ) : (
        <p>Please log in to submit a review</p>
      )}
    </div>
  );
}
