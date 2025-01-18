import React, { useEffect, useState } from 'react';

import 'antd/dist/reset.css';


function Profile(props) {

  // fetch data on pagination change, sort change, or filter change
  useEffect(() => {
  }, [
  ]);

  return (
    <>
      <div className="bg-light rounded p-4">
        <h6 className="mb-4">Biodata Diri</h6>
        <div className="testimonial-item text-center mb-4">
          <img className="img-fluid rounded-circle mx-auto mb-4" src={`${process.env.PUBLIC_URL}/assets/icon/user.webp`} style={{width: '100px', height: '100px'}}/>
          <h5 className="mb-1">Arida Azkiah Anam</h5>
        </div>
        <div className="w-100 d-flex justify-content-center align-items-center">
          <div style={{ width: "50%" }}>
            <div className="row mb-3">
              <div className="col-md-2"></div>
              <div className="col-md-4 text-start fw-bold">Tanggal Lahir</div>
              <div className="col-md-6">27 Juni 2003</div>
            </div>
            <div className="row mb-3">
              <div className="col-md-2"></div>
              <div className="col-md-4 text-start fw-bold">Jenis Kelamin</div>
              <div className="col-md-6">Perempuan</div>
            </div>
            <div className="row mb-3">
              <div className="col-md-2"></div>
              <div className="col-md-4 text-start fw-bold">Email</div>
              <div className="col-md-6">aridaazkiah@gmail.com</div>
            </div>
            <div className="row mb-3">
              <div className="col-md-2"></div>
              <div className="col-md-4 text-start fw-bold">Nomor HP</div>
              <div className="col-md-6">0875472972202</div>
            </div>
            <div className="row mb-3">
              <div className="col-md-2"></div>
              <div className="col-md-4 text-start fw-bold">Kelas</div>
              <div className="col-md-6">3</div>
            </div>
            <div className="row mb-3">
              <div className="col-md-2"></div>
              <div className="col-md-4 text-start fw-bold">Sekolah</div>
              <div className="col-md-6">UI</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;