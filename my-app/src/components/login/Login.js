import React, { useState } from "react";
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [validationMessages, setValidationMessages] = useState({ username: '', password: '', loginError: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let messages = { username: '', password: '', loginError: '' };
    
        // Basic validation
        if (!username.trim()) messages.username = 'Username is required.';
        if (!password) messages.password = 'Password is required.';
    
        if (messages.username || messages.password) {
            setValidationMessages(messages);
            return; // Stop here if there are validation errors
        }
    
        try {
            const response = await axios.post('http://localhost:5000/login', {
                username,
                password,
            });
    
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                navigate('/home');
            } else {
                // Assuming the response has a specific message for incorrect credentials
                setValidationMessages({ ...validationMessages, loginError: 'Incorrect username or password.' });
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setValidationMessages({ ...validationMessages, loginError: 'Incorrect username or password.' });
            } else {
                console.error('Login error:', error);
                setValidationMessages({ ...validationMessages, loginError: 'Login failed. Please try again later.' });
            }
        }
    };

    return (
        <div className="loginDisplay">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="example@example.com"
                    />
                    {validationMessages.username && <div className="error">{validationMessages.username}</div>}
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Example@1234"
                    />
                    {validationMessages.password && <div className="error">{validationMessages.password}</div>}
                </div>
                {validationMessages.loginError && <div className="error">{validationMessages.loginError}</div>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;