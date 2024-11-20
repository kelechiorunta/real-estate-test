import React, { useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import "./Header.css"; // Import the CSS file for styles

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handlelogout = async() => {
    try{
      const res = await axios.get('/api/logout', {withCredentials: true});
      navigate('/signup');
      console.log(res.data.success)
    }
    catch(err){
      console.log(err.message)
    }
  }

  return (
    <header className="header">
      <div className="logo">MyLogo</div>
      <nav className={`nav ${isMenuOpen ? "nav--open" : ""}`}>
        <a href="/" className="nav__link">Home</a>
        <a href="/signup" className="nav__link">Sign Up</a>
        <a href="#about" className="nav__link">About</a>
        <a href="#contact" className="nav__link">Contact</a>
        <button onClick={handlelogout}>Logout</button>
      </nav>
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
    </header>
  );
};

export default Header;
