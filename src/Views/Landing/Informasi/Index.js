import React, { useEffect, useState } from 'react';
import Navbar from '../../../Components/Navbar';
import Footer from '../../../Components/Footer';
import Card from './ImageCard';
import '../../../style/style.scss';
import '../../../style/cardModule.scss';
import { getGalleryService } from '../../../Services/ServicesAPI';

function Informasi(props) {
  const [loading, setLoading]   = useState(false);
  const [dancers, setDancers]   = useState([]);

  // fetch server side
  const fetchData = async () => {
    setLoading(true);
    
    let response = await getGalleryService();

    if (response) {
      setDancers(response.content);
      setLoading(false);
    } else {
      setDancers([]);
      setLoading(false);
    }
  };

  useEffect(async()=>{
    await fetchData();
  },[])

  return (
    <>
      <Navbar/>

      <section className="content-section py-5">
        <h1 className="text-center mb-5">Pelatih Pilar Budaya</h1>
        <div className="row my-5 d-flex align-items-center justify-content-center">
          {loading ? 
            (
              <>
                <div className="card-container col-md-4 col-sm-12 mx-1 my-1">
                  <div className="px-0 py-0 card-gallery justify-content-center">
                    <div className="skeleton-wrapper">
                      <div className="skeleton skeleton-image"></div>
                      <div className="skeleton skeleton-text"></div>
                    </div>
                  </div>
                </div>
                <div className="card-container col-md-4 col-sm-12 mx-1 my-1">
                  <div className="px-0 py-0 card-gallery justify-content-center">
                    <div className="skeleton-wrapper">
                      <div className="skeleton skeleton-image"></div>
                      <div className="skeleton skeleton-text"></div>
                    </div>
                  </div>
                </div>
                <div className="card-container col-md-4 col-sm-12 mx-1 my-1">
                  <div className="px-0 py-0 card-gallery justify-content-center">
                    <div className="skeleton-wrapper">
                      <div className="skeleton skeleton-image"></div>
                      <div className="skeleton skeleton-text"></div>
                    </div>
                  </div>
                </div>
                <div className="card-container col-md-4 col-sm-12 mx-1 my-1">
                  <div className="px-0 py-0 card-gallery justify-content-center">
                    <div className="skeleton-wrapper">
                      <div className="skeleton skeleton-image"></div>
                      <div className="skeleton skeleton-text"></div>
                    </div>
                  </div>
                </div>
                <div className="card-container col-md-4 col-sm-12 mx-1 my-1">
                  <div className="px-0 py-0 card-gallery justify-content-center">
                    <div className="skeleton-wrapper">
                      <div className="skeleton skeleton-image"></div>
                      <div className="skeleton skeleton-text"></div>
                    </div>
                  </div>
                </div>
                <div className="card-container col-md-4 col-sm-12 mx-1 my-1">
                  <div className="px-0 py-0 card-gallery justify-content-center">
                    <div className="skeleton-wrapper">
                      <div className="skeleton skeleton-image"></div>
                      <div className="skeleton skeleton-text"></div>
                    </div>
                  </div>
                </div>
              </>
            ) :
              dancers.map((dancer, index) => (
                <Card
                  key={index}
                  image={dancer.imageUrl}
                  name={dancer.contentName}
                />
              ))
          }
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