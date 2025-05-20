import React from 'react';
import '../styles/navbar.css'; 
function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/logo.png" alt="Logo" className="navbar-logo" />
        <h1 className="navbar-title">PokeTeam</h1>
      </div>
      <div className="navbar-right">
        <p>Made by Aswin</p>
      </div>
    </nav>
  );
}

export default Navbar;
