import React, { useEffect, useState } from 'react';

import NavBarAdmin from './Particals/NavbarAdmin';
import SideBarAdmin from './Particals/SidebarAdmin';

// import '../../style/css/dashboard.css';

import '../../style/css/bootstrap.min.css';
import '../../style/css/style-min.css';

function Admin({children, props}) {  
  const [showSpinner, setShowSpinner] = useState(true);
  const [sidebar, setSidebar]     = useState(false);  

  useEffect(() => {
    const isFirstVisit = localStorage.getItem("visited");

    if (!isFirstVisit) {
      const timeoutId = setTimeout(() => {
        setShowSpinner(false);
        localStorage.setItem("visited", "true");
      }, 1000);

      return () => clearTimeout(timeoutId);
    } else {
      setShowSpinner(false);
    }
  }, []);

  return (
    <>
      {/* Google Web Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      {/* Icon Font Stylesheet */}
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css"
        rel="stylesheet"
      />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css"
        rel="stylesheet"
      />
      {/* Libraries Stylesheet */}
      <link href="../../lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet" />
      <link
        href="../../lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css"
        rel="stylesheet"
      />

      {/* Customized Bootstrap Stylesheet */}
      <link href="../../css/bootstrap.min.css" rel="stylesheet" />
      {/* Template Stylesheet */}
      <link href="../../css/style-min.css" rel="stylesheet" />

      <div className="container-xxl position-relative bg-white d-flex p-0">

        {showSpinner && (
          <div id="spinner" className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
            <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}

        <SideBarAdmin sidebar={sidebar}/>
        
        {/* Content Start */}
        <div className={`content d-flex flex-column min-vh-100 ${sidebar ? 'open' : ''}`}>
          <NavBarAdmin 
            sidebar={sidebar}
            onEmit={(value) => setSidebar(value) } 
          />

          <div className="flex-grow-1 px-3">
            {children}
          </div>

          {/* Footer Start */}
          <div className="container-fluid pt-4 px-4">
            <div className="bg-light rounded-top p-4">
              <div className="row">
                <div className="col-12 col-sm-6 text-center text-sm-start">
                  © <a href="#">Pilar Budaya</a>, All Right Reserved.
                </div>
                <div className="col-12 col-sm-6 text-center text-sm-end">
                  Distributed By{" "}
                  <a
                    className="border-bottom"
                    href="https://pilarbudaya.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    PILAR BUDAYA
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* Footer End */}
        </div>
        {/* Content End */}
        {/* Back to Top */}
        <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
          <i className="bi bi-arrow-up" />
        </a>
      </div>
      {/* JavaScript Libraries */}
      {/* Template Javascript */}
    </>
  );
}

export default Admin;