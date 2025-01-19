import React, { useEffect, useRef, useState } from 'react';
import '../../../style/style.scss';
import '../../../style/cardModule.scss';
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getFileIdFromDriveUrl } from '../../../../src/Formatter/Text';

function GalleryCard({ image, name }) {
  const [isLoading, setIsLoading] = useState(true);
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

    // Formatter image hanya jika `image` ada
    if (image) {
      const parsedImage = getFileIdFromDriveUrl(image);
      setImageParse(parsedImage);
    }
  }, [image]);

  return (
    <>
      <div
        className="card-container col-md-4 col-sm-12 mx-1 my-1"
      >
        <div className="px-0 py-0 card-gallery justify-content-center" ref={cardRef}>
          <div>
            <img 
              onMouseMove={handleMouseMove} 
              onMouseLeave={handleMouseLeave} 
              style={{
                width: '300px', // Lebar gambar
                height: '400px', // Tinggi gambar
                objectFit: 'cover', // Menjaga agar gambar tidak terdistorsi
                borderRadius: '8px', // Opsi sudut bulat
              }}
              src={imageParse ? `https://drive.google.com/thumbnail?id=${imageParse}` : 'assets/images/default-image-payment.webp'} 
              alt={name} 
              onLoad={() => setIsLoading(false)}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'assets/images/default-image-payment.webp';
                setIsLoading(false);
              }}
              />
            <div>
              {name}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GalleryCard;