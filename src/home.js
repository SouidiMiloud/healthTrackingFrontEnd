import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import './home.css';

const Home = () => {
  const text = "Discover a world of health and wellness";
  const letters = text.split('');
  const [displayedLetters, setDisplayedLetters] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (letters.length > displayedLetters.length) {
        setDisplayedLetters((prevLetters) => [...prevLetters, letters[prevLetters.length]]);
      } else {
        clearInterval(interval);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [displayedLetters, letters]);

  const jwt = localStorage.getItem('jwt');

  return (
    <>
      <Navbar />
      <div className="home_wrapper">
        <h1>
          {displayedLetters.map((letter, index) => (
            <span key={index} className="letter">{letter}</span>
          ))}
        </h1>
        {!jwt && (
          <div>
            <button onClick={() => window.location.href = '/login'}>login</button>
            <button onClick={() => window.location.href = '/register'}>register</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
