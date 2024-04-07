import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Profile() {
  const token = localStorage.getItem('token');
  console.log(token); // Log the token here

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (token) {
      // Fetch user data using the token
      axios.get('http://127.0.0.1:8000/api/v1/auth/users/me', {
        headers: {
          Authorization: `Token ${token}`
        }
      })
      .then(response => {
        // Set user data in state
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
    }
  }, [token]);

  const handleLogout = () => {
    // Remove token from local storage on logout
    localStorage.removeItem('token');
    // Redirect to login page after logout
    window.location.href = '/login';
  };

  return (
    <div>
      <h1>Profile</h1>
      {userData && (
        <div>
          <p>First Name: {userData.first_name}</p>
          <p>Last Name: {userData.last_name}</p>
          <p>Username: {userData.username}</p>
          <p>Id: {userData.id}</p>
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
