import React, { useEffect } from 'react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';

function Home(props) {
  useEffect(()=>{
  },[])


  return (
    <>
      <Navbar/>
      <section className="hero">
        <img src="assets/images/pillar-banner.png" style={{width: "100%"}} alt="Sanggar Pilar Budaya" />
      </section>
      <Footer/>
    </>
  );
}

export default Home;