import React, { useEffect, useState } from 'react';
import { FaRegUser } from "react-icons/fa";
import Biodata from './Biodata';
import Upload from './Upload';
import StatusPembayaran from './StatusPembayaran';

import 'antd/dist/reset.css';

import Admin from '../../Index';

function Profile(props) {
  const [mode, setMode]     = useState('Biodata');

  // handle mode
  const handleModeChange = (val) => {
    setMode(val)
  };

  // fetch data on pagination change, sort change, or filter change
  useEffect(() => {
  }, [
  ]);

  return (
    <>
      <Admin>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <div className="h4 d-flex align-items-center">
            <FaRegUser size={20} className="mx-2" />Profile Akun
          </div>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2">
              <button type="button" className={`btn btn-sm btn-outline-secondary px-1 py-0 ${mode === "Biodata" ? "active" : ""}`} onClick={() =>  handleModeChange("Biodata")}>Biodata</button>
              <button type="button" className={`btn btn-sm btn-outline-secondary px-1 py-0 ${mode === "Upload" ? "active" : ""}`} onClick={()  =>  handleModeChange("Upload")}>Upload Bukti</button>
              <button type="button" className={`btn btn-sm btn-outline-secondary px-1 py-0 ${mode === "Statuspembayaran" ? "active" : ""}`} onClick={()  =>  handleModeChange("Statuspembayaran")}>Status Pembayaran</button>
            </div>
          </div>
        </div>

        {mode === 'Biodata' && <Biodata/>}
        {mode === 'Upload' && <Upload/>}
        {mode === 'Statuspembayaran' && <StatusPembayaran/>}
      </Admin>
    </>
  );
}

export default Profile;