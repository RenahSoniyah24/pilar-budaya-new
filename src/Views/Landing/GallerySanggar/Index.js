import React, { useEffect, useState } from 'react';
import Navbar from '../../../Components/Navbar';
import Footer from '../../../Components/Footer';
import Card from './GalleryCard';
import '../../../style/style.scss';
import { getPelatihService } from '../../../Services/ServicesAPI';

function Gallery(props) {
const [loading, setLoading]   = useState(false);
const [dancers, setDancers]   = useState([]);

  // fetch server side
  const fetchData = async () => {
    setLoading(true);
    
    let response = await getPelatihService();

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

      <section className="content-section">
        <div className="container py-5">
          <h1 className="text-center mb-5">Gallery Sanggar</h1>
          <div className="row my-5 d-flex align-items-center justify-content-center">
            {loading ? 
              (
                <>
                  <div className="card-container col-md-4 col-sm-12 mx-1 my-1">
                    <div
                      className="px-0 py-0 card-gallery justify-content-center"
                    >
                      <div>
                        <div className="skeleton skeleton-image"></div>
                        <div className="skeleton skeleton-text"></div>
                      </div>
                    </div>
                  </div>
                  <div className="card-container col-md-4 col-sm-12 mx-1 my-1">
                    <div
                      className="px-0 py-0 card-gallery justify-content-center"
                    >
                      <div>
                        <div className="skeleton skeleton-image"></div>
                        <div className="skeleton skeleton-text"></div>
                      </div>
                    </div>
                  </div>
                  <div className="card-container col-md-4 col-sm-12 mx-1 my-1">
                    <div
                      className="px-0 py-0 card-gallery justify-content-center"
                    >
                      <div>
                        <div className="skeleton skeleton-image"></div>
                        <div className="skeleton skeleton-text"></div>
                      </div>
                    </div>
                  </div>
                  <div className="card-container col-md-4 col-sm-12 mx-1 my-1">
                    <div
                      className="px-0 py-0 card-gallery justify-content-center"
                    >
                      <div>
                        <div className="skeleton skeleton-image"></div>
                        <div className="skeleton skeleton-text"></div>
                      </div>
                    </div>
                  </div>
                  <div className="card-container col-md-4 col-sm-12 mx-1 my-1">
                    <div
                      className="px-0 py-0 card-gallery justify-content-center"
                    >
                      <div>
                        <div className="skeleton skeleton-image"></div>
                        <div className="skeleton skeleton-text"></div>
                      </div>
                    </div>
                  </div>
                  <div className="card-container col-md-4 col-sm-12 mx-1 my-1">
                    <div
                      className="px-0 py-0 card-gallery justify-content-center"
                    >
                      <div>
                        <div className="skeleton skeleton-image"></div>
                        <div className="skeleton skeleton-text"></div>
                      </div>
                    </div>
                  </div>
                  <div className="card-container col-md-4 col-sm-12 mx-1 my-1">
                    <div
                      className="px-0 py-0 card-gallery justify-content-center"
                    >
                      <div>
                        <div className="skeleton skeleton-image"></div>
                        <div className="skeleton skeleton-text"></div>
                      </div>
                    </div>
                  </div>
                  <div className="card-container col-md-4 col-sm-12 mx-1 my-1">
                    <div
                      className="px-0 py-0 card-gallery justify-content-center"
                    >
                      <div>
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
        </div>
      </section>

      <Footer/>
    </>
  );
}

export default Gallery;