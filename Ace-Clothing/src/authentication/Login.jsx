import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Import the CSS file for styling
import http from '../utils/fetchFromApi';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await http.post('auth/token/login', {
                email,
                password
            });
            localStorage.setItem('token', response.data.auth_token);
            // Redirect to profile page or handle success as needed
            window.location.href = '/explore/all';
        } catch (error) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="rounded-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="rounded-input"
                />
                <button type="submit" className="rounded-button">Login</button>
            </form>
        </div>
    );
}
