import React, { useEffect } from 'react';
import Navbar from '../../../Components/Navbar';
import Footer from '../../../Components/Footer';
import Card from './ImageCard';
import '../../../style/style.scss';

function Informasi(props) {
  const dancers = [
    { image: 'assets/images/tari/1.jpg', name: 'Diana Kartika Putri' },
    { image: 'assets/images/tari/2.jpg', name: 'Ndaru Dwi Rahayu' },
    { image: 'assets/images/tari/3.jpg', name: 'Meira Putri Nuraini' },
    { image: 'assets/images/tari/4.jpg', name: 'Mutiara Fadillah Haren' },
    { image: 'assets/images/tari/5.jpg', name: 'Fifteen Seputeri M.M' },
    { image: 'assets/images/tari/6.jpg', name: 'Arida Azkiah Anam' },
    { image: 'assets/images/tari/7.jpg', name: 'Elita Damayanti Putri' },
    { image: 'assets/images/tari/8.jpg', name: 'Nimatul Winanne M.' },
  ];

  useEffect(()=>{
  },[])

  return (
    <>
      <Navbar/>

      <section className="content-section py-5">
        <h1 className="text-center mb-5">Pelatih Pilar Budaya</h1>
        <div className="row my-5 d-flex align-items-center justify-content-center">
          {dancers.map((dancer, index) => (
            <Card
              key={index}
              image={dancer.image}
              name={dancer.name}
            />
          ))}
        </div>
        <div className="info-section">
          <div className='d-flex align-items-center justify-content-center'>
            <h2>Informasi Harga Kelas Pilar Budaya</h2>
          </div>
          <div className='d-flex align-items-center justify-content-center'>
            <div className='text-center'>
              <p><strong>Jadwal Kelas:</strong> Minggu 10.00 - 12.00 WIB</p>
              <p><strong>Tempat:</strong> Sport Center Puri Gading Lt 2, Bekasi 17425</p>
              <p><strong>Biaya Pendaftaran:</strong> Rp. 200.000</p>
              <p><strong>Biaya Bulanan:</strong> Rp. 150.000/bulan</p>
            </div>
          </div>
        </div>
      </section>

      <Footer/>
    </>
  );
}

export default Informasi;