import React, { useEffect, useRef, useState } from 'react';
import '../../../style/style.scss';
import '../../../style/cardModule.scss';
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getFileIdFromDriveUrl } from '../../../../src/Formatter/Text';

function GalleryCard({ image, name }) {
  const [isLoading, setIsLoading] = useState(true); // keep isLoading true initially
  const [imageParse, setImageParse] = useState('');
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

    if (image) {
      const parsedImage = getFileIdFromDriveUrl(image);
      setImageParse(parsedImage); // Set parsed image id
    }
  }, [image]); // This will only run when `image` changes

  const handleImageLoad = () => {
    console.log('Image loaded');
    setIsLoading(false); // Set loading to false when image is loaded
  };

  const handleImageError = (e) => {
    console.log('Image error', e);
    e.target.onerror = null;
    e.target.src = 'assets/images/default-image-payment.webp'; // Fallback image
    setIsLoading(false); // Set loading to false on error
  };

  return (
    <div className="card-container col-md-4 col-sm-12 mx-1 my-1">
      <div className="px-0 py-0 card-gallery justify-content-center" ref={cardRef}>
        <div>
          <img
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              width: '300px',
              height: '400px',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
            src={imageParse ? `https://drive.google.com/thumbnail?id=${imageParse}` : 'assets/images/default-image-payment.webp'}
            alt={name}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
          <div>{name}</div>
        </div>
      </div>
    </div>
  );
}

export default GalleryCard;
