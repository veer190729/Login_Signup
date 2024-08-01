import React from "react";
import './home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login'); 
    };

    return (
        <div className="homeDisplay">
            <h1>Welcome to the Home Page!</h1>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    );
}

export default Home;