import React, { useEffect, useState } from 'react';
import { FaRegUser } from "react-icons/fa";
import { getSecureData } from '../../../../Utils/Protect';
import { useParams, useHistory } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import Notification from '../../../../Components/Notification';
import '../../../../style/css/style.css';

import 'antd/dist/reset.css';

import { uploadBuktiService } from '../../../../Services/ServicesAPI';

const dropzoneStyle = {
  border: '2px dashed #ccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  backgroundColor: '#f9f9f9',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  position: 'relative',
  width: '100%',
  height: '200px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
};

const previewStyle = {
  maxHeight: '150px',
  width: 'auto',
  objectFit: 'contain',
  borderRadius: '4px',
};

function Upload(props) {
  const [loading, setLoading]       = useState(false)
  const [namaKonten, setNamaKonten] = useState('');
  const [periode, setPeriode] = useState('');
  const [files, setFiles] = useState([]);
  const [userData, setUserData] = useState({});
  const history = useHistory();

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: (acceptedFiles) => {
      // Replace old file with the new one
      setFiles((prevFiles) => {
        prevFiles.forEach((file) => URL.revokeObjectURL(file.preview)); // Cleanup old preview URLs
        return acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      });
    },
  });

  useEffect(() => {
    HandlingGetUserData();
    if (Array.isArray(files)) {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    }
  }, [files]);

  const HandlingGetUserData = () => {
    const data = getSecureData();
    if (data) setUserData(data);
    else setUserData({})
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await uploadBuktiService(userData.id, periode, files);
      if (response.data) {
        Notification.success('Berhasil, ', 'Upload Bukti Berhasil');
        setPeriode('')
        setFiles('')
        setLoading(false);
      } else {
        throw new Error('Failed to login');
      }
    } catch (err) {
      setLoading(false);
      console.error('Error:', err.message || err);
      Notification.success('Gagal, ', 'Upload Bukti Gagal');
      setPeriode('')
      setFiles('')
      Notification.warning('Upps, ', err.message);
    }
  };

  return (
    <>
      <form onSubmit={submitHandler} className="signin-form">
        <div className="form-group mb-3">
          <label className="label">Periode</label>
          <select
            className="form-select"
            value={periode}
            onChange={(e) => setPeriode(e.target.value)}
            required
          >
            <option value="" defaultValue></option>
            <option value="Januari">Januari</option>
            <option value="Februari">Februari</option>
            <option value="Maret">Maret</option>
            <option value="April">April</option>
            <option value="Mei">Mei</option>
            <option value="Juni">Juni</option>
            <option value="Juli">Juli</option>
            <option value="Agustus">Agustus</option>
            <option value="September">September</option>
            <option value="Oktober">Oktober</option>
            <option value="November">November</option>
            <option value="Desember">Desember</option>
          </select>
        </div>
        <div className="form-group mb-3">
          <div {...getRootProps({ className: 'dropzone', style: dropzoneStyle })}>
            <input {...getInputProps()} />
            {files.length > 0 ? (
              <img
                src={files[0].preview}
                alt="Preview"
                style={previewStyle}
                onLoad={() => URL.revokeObjectURL(files[0].preview)} // Cleanup preview URL
              />
            ) : (
              <p>Drag 'n' drop a file here, or click to select one</p>
            )}
          </div>
        </div>
        <div className="form-group">
          <button type="submit" disabled={loading} className="form-control btn btn-primary rounded submit px-3">
            {
              loading ? (
                <span>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Loading...
                </span>
              ) : 'Kirim'
            }
          </button>
        </div>
      </form>
    </>
  );
}

export default Upload;
