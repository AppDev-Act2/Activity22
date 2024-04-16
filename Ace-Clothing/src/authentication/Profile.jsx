import React, { useState, useEffect } from 'react';
import axios from 'axios';
import http from '../utils/fetchFromApi';


export default function Profile() {
    const token = localStorage.getItem('token');
    console.log(token); // Log the token here

    const [userData, setUserData] = useState(null);
    const [newUsername, setNewUsername] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (token) {
            // Fetch user data using the token
            http.get('auth/users/me', {
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

    const handleChangeUsername = () => {
        http.patch('change-username', {
            username: newUsername
        }, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
            .then(response => {
                // Update user data with the new username
                setUserData({ ...userData, username: newUsername });
                setNewUsername('');
            })
            .catch(error => {
                console.error('Error changing username:', error.response.data);
                setError(error.response.data.username[0]); // Assuming the backend returns error messages in the format: { "username": ["Error message"] }
            });
    };

    const handleLogout = () => {
        // Remove token from local storage on logout
        localStorage.removeItem('token');
        // Redirect to login page after logout
        window.location.href = '/login';
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
            {token ? (
                userData ? (
                    <div style={{ height: '300px', width: '300px', border: '2px solid #ccc', borderRadius: '5px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <h1>Profile</h1>
                        <div>
                            <p style={{ fontSize: 15, marginTop: 10, fontWeight: 'bold' }}>First Name:</p>
                            <p style={{ fontSize: 25 }}>{userData.first_name}</p>
                            <p style={{ fontSize: 15, marginTop: 10, fontWeight: 'bold' }}>Last Name:</p>
                            <p style={{ fontSize: 25 }}>{userData.last_name}</p>
                            <p style={{ fontSize: 15, marginTop: 10, fontWeight: 'bold' }}>Username:</p>
                            <p style={{ fontSize: 25, }}>{userData.username}</p>

                            {/* <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
                            <button onClick={handleChangeUsername}>Change Username</button>
                            {error && <p style={{ color: 'red' }}>{error}</p>} */}
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )
            ) : (
                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '40px' }}>Please log in to see your profile.</p>
                </div>
            )}
            {token && <button onClick={handleLogout} style={{
                width: '200px', height: '35px', marginTop: 15,
                background: 'red', borderRadius: 13, color: 'white'
            }}>Logout</button>}
        </div>
    );
}
