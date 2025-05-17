import React from 'react';
import '../styles/hero.css';
import useTheme from '../context/useTheme';
import { useNavigate } from 'react-router-dom';


function Hero({ search, setSearch }) {
  const { theme, toggleTheme } = useTheme();
  const Themename = theme === 'Light' ? 'Dark' : 'Light';

  const navigate = useNavigate();
   const handleClick = () => {
     navigate('/teampage');
   };

 return (
    <div className="container">
      <h1>Build Your Own Pokemon Team</h1>
      <h2>Choose your favorite Pokemon and create a team to battle with!</h2>

      <input
        type="text"
        placeholder="Search Pokemon"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="button-container"> 
        <button onClick={handleClick}>View Team</button>
        <button onClick={toggleTheme}> Switch to {Themename} theme </button>
      </div>
      
    </div>
  );

}

export default Hero;
