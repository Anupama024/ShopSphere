import React, { useEffect, useState } from 'react';
import './LoginBgSlideshow.css';

const images = [
  require('../assets/login/l1.png'),
  require('../assets/login/l2.png'),
  require('../assets/login/l3.png'),
  require('../assets/login/l4.png'),
  require('../assets/login/l5.png'),
  require('../assets/login/l6.png'),
];

function LoginBgSlideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000); // 3 seconds per image
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="login-bg-slideshow">
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`login-bg-${idx}`}
          className={idx === current ? 'active' : ''}
        />
      ))}
    </div>
  );
}

export default LoginBgSlideshow;
