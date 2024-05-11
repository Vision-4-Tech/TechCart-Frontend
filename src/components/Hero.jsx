import React, { useState, useEffect } from 'react';
import './Hero.css';
import cart_icon from '../components/assets/Assets/Images/cart1.jpeg';
import fruits_icon from '../components/assets/Assets/Images/fruits.jpeg';
import store_icon from '../components/assets/Assets/Images/store.jpeg';

const Hero = () => {
  const images = [
    { icon: cart_icon },
    { icon: fruits_icon },
    { icon: store_icon },
    // Add more image URLs as needed
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [images.length]);

  const handleCircleClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="hero-container">
      <div className="hero-slider">
        {images.map((image, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentIndex ? 'active' : ''}`}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            <img src={image.icon} alt={`Slide ${index + 1}`} className="imagee"  style={{ width: '70rem',height:'28rem', objectFit: 'cover' }}/>
          </div>
        ))}
      </div>
      <div className="circle-container">
        {images.map((_, index) => (
          <div
            key={index}
            className={`circle ${index === currentIndex ? 'active-circle' : ''}`}
            onClick={() => handleCircleClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
