import React, { useState } from "react";
import axios from 'axios';
import './Register.css';
import { useNavigate } from 'react-router-dom'; // Ensure you have react-router-dom v6

function Register() {
    const [username, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validationMessages, setValidationMessages] = useState({ username: '', email: '', password: '' });
    const [flashMessage, setFlashMessage] = useState('');
    const [flashMessageType, setFlashMessageType] = useState(''); // New state for flash message type
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let messages = { username: '', email: '', password: '' };

        // Full name validation
        if (username.trim() === '') {
            messages.username = 'User name is required.';
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            messages.email = 'Please enter a valid email address.';
        }

        // Password strength validation
        const passwordStrengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordStrengthRegex.test(password)) {
            messages.password = 'Password must be at least 8 characters long and include uppercase, lowercase, numbers, and symbols.';
        }

        setValidationMessages(messages);

        // Check if there are any validation messages
        if (!messages.username && !messages.email && !messages.password) {
            try {
                const response = await axios.post('http://localhost:5000/register', {
                    username,
                    password,
                    email,
                });

                if (response.data.message === 'Signup Successful') {
                    setFlashMessage('Signup Successful');
                    setFlashMessageType('success');
                    navigate('/login');
                } else {
                    setFlashMessage(response.data.message);
                    setFlashMessageType('error');
                }
            } catch (error) {
                console.error(error);
                setFlashMessage('UserName Already Exists.');
                setFlashMessageType('error');
            }
        } else {
            console.log("Form is invalid. Please correct the errors and try again.");
        }
    };

    return (
        <div className="registerDisplay">
            <h1>Register</h1>
            {flashMessage && <div className={`flash-message ${flashMessageType}`}>{flashMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">User Name:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Doe" // Placeholder showing correct format
                    />
                    {validationMessages.username && <div className="error">{validationMessages.username}</div>}
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@example.com" // Placeholder showing correct format
                    />
                    {validationMessages.email && <div className="error">{validationMessages.email}</div>}
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Example@1234" // Placeholder showing correct format
                    />
                    {validationMessages.password && <div className="error">{validationMessages.password}</div>}
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;