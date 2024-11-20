import React, { useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import "./Header.css"; // Import the CSS file for styles
import { Home, Building, MapPin, Phone, Search } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handlelogout = async() => {
    try{
      const res = await axios.get('/api/logout', {withCredentials: true});
      navigate('/login');
      console.log(res.data.success)
    }
    catch(err){
      console.log(err.message)
    }
  }

  return (
    <header className="header">
      <div className="logo"> 
        <Home size={24} />
        <span>RealEstatePro</span>
      </div>
      <nav className={`nav ${isMenuOpen ? "nav--open" : ""}`}>
          <a href="/">Home</a>
          <a href="#about">About Us</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        <button onClick={handlelogout}>Logout</button>
      </nav>
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
    </header>
  );
};

export default Header;
