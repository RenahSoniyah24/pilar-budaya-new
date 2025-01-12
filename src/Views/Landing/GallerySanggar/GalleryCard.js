import React, { useEffect, useRef } from 'react';
import '../../../style/style.scss';
import '../../../style/cardModule.scss';
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function GalleryCard({ image, name }) {
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
        className="card-container col-md-4 col-sm-12 mx-1 my-1"
      >
        <div className="px-0 py-0 card-gallery justify-content-center" ref={cardRef}>
          <img onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} src={image} alt={name} />
          <div>
            {name}
          </div>
        </div>
      </div>
    </>
  );
}

export default GalleryCard;