import React from 'react';
import './index.css';
import Header from './components/Header/Header';
import { Link } from 'react-router-dom';


function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
  

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-20 md:py-32">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 animate-fade-in-up leading-tight">
          Plan Smarter. <br /> Travel Better ✈️
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl mb-10 animate-fade-in-up delay-200">
          Let AI guide your journeys with personalized trip planning at your fingertips.
        </p>
        <Link to='/create-trip'>
        <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg rounded-full transition duration-300 transform hover:scale-105 shadow-lg animate-bounce">
          Get Started
        </button>
        </Link>
        
      </section>
    </div>
  );
}

export default App;
