import React, { useEffect } from 'react';
import Navbar from '../../../Components/Navbar';
import Footer from '../../../Components/Footer';
import Card from './GalleryCard';
import '../../../style/style.scss';

function Gallery(props) {
  const dancers = [
    { image: 'assets/images/gallery/Frame 2.jpg', name: 'Tari Gelang Ro`om' },
    { image: 'assets/images/gallery/Frame 3.jpg', name: 'Tari Wonderfull Indonesia' },
    { image: 'assets/images/gallery/Frame 4.jpg', name: 'Tari Gitek Balen' },
    { image: 'assets/images/gallery/Frame 5.jpg', name: 'Tari Lembang Sari' },
    { image: 'assets/images/gallery/Frame 1.jpg', name: 'Tari Enggang' },
    { image: 'assets/images/gallery/Frame 6.jpg', name: 'Tari Sim Sim' },
  ];

  useEffect(()=>{
  },[])

  return (
    <>
      <Navbar/>

      <section className="content-section">
        <div className="container py-5">
          <h1 className="text-center mb-5">Gallery Sanggar</h1>
          <div className="row my-5 d-flex align-items-center justify-content-center">
            {dancers.map((dancer, index) => (
              <Card
                key={index}
                image={dancer.image}
                name={dancer.name}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer/>
    </>
  );
}

export default Gallery;