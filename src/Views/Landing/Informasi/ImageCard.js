import React, { useEffect, useRef } from 'react';
import '../../../style/style.scss';
import '../../../style/cardModule.scss';
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function ImageCard({ image, name }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * -10;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    // Reset transformasi saat mouse keluar
    const card = cardRef.current;
    card.style.transform = `rotateX(0deg) rotateY(0deg)`;
  };
  gsap.registerPlugin(ScrollTrigger);
  
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', 
        scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
        }, 
      }
    );
  }, []);

  return (
    <>
      <div
        className="card-container trainer-card col-md-3 mx-2 my-2"
      >
        <div className="px-0 py-0 card" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} ref={cardRef}>
          <img src={image} alt={name} />
        </div>
      </div>
    </>
  );
}

export default ImageCard;