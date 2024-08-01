import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/home";
import Login from "./components/login/Login";
import Rectangle from "./components/Rectangle/rectangle";
import Register from "./components/Register/Register";

function App() {
  
    return (      
        <BrowserRouter>
            <Routes>
                <Route path="home" element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="/" element={<Register />} />
                <Route path="rectangle" element={<Rectangle />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
