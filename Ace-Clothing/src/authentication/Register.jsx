import React, { useState } from 'react';
import axios from 'axios';
import http from '../utils/fetchFromApi';
import './Register.css'

export default function Register() {
    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        birthdate: '',
        email: '',
        password: '',
        confirm_password: ''
    });
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await http.post('http://127.0.0.1:8000/api/v1/auth/users/', userData);
            console.log('User created successfully:', response.data);
            setUserData({
                first_name: '',
                last_name: '',
                username: '',
                birthdate: '',
                email: '',
                password: '',
                confirm_password: ''
            });
        } catch (error) {
            console.error('Error creating user:', error.response.data);
            setError('Error creating user. Please check your input and try again.');
        }
    };

    return (
        <div className="register-form">
            <h1>Welcome! Let's Get You Started</h1>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="first_name">First Name</label>
                <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={userData.first_name}
                    onChange={handleInputChange}
                    required
                />
                <label htmlFor="last_name">Last Name</label>
                <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={userData.last_name}
                    onChange={handleInputChange}
                    required
                />
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={userData.username}
                    onChange={handleInputChange}
                    required
                />
                <label htmlFor="birthdate">Birthdate</label>
                <input
                    type="date"
                    id="birthdate"
                    name="birthdate"
                    value={userData.birthdate}
                    onChange={handleInputChange}
                    required
                />
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    required
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={userData.password}
                    onChange={handleInputChange}
                    required
                />
                <label htmlFor="confirm_password">Confirm Password</label>
                <input
                    type="password"
                    id="confirm_password"
                    name="confirm_password"
                    value={userData.confirm_password}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit" className="register-button">Register</button>
            </form>
        </div>
    );
}
