import React, { useEffect, useState } from 'react';
import { FaRegUser } from "react-icons/fa";
import { useParams, useHistory } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import '../../../../style/css/style.css';

import 'antd/dist/reset.css';

import { registerService } from '../../../../Services/ServicesAPI';

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
  const [namaKonten, setNamaKonten] = useState('');
  const [halaman, setHalaman] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [files, setFiles] = useState([]);
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
    // Cleanup preview URLs when component unmounts
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await registerService(namaKonten, halaman);
      if (response.data) {
        Notification.success('Daftar Berhasil, ', 'Silahkan Login');
        history.push('/login');
      } else {
        throw new Error('Failed to login');
      }
    } catch (err) {
      console.error('Error:', err.message || err);
      Notification.warning('Upps, ', err.message);
    }
  };

  return (
    <>
      <form onSubmit={submitHandler} className="signin-form">
        <div className="form-group mb-3">
          <label className="label">Halaman</label>
          <select
            className="form-select"
            value={halaman}
            onChange={(e) => setHalaman(e.target.value)}
            required
          >
            <option value="1">Januari</option>
            <option value="2">Februari</option>
            <option value="3">Maret</option>
            <option value="4">April</option>
            <option value="5">Mei</option>
            <option value="6">Juni</option>
            <option value="7">Juli</option>
            <option value="8">Agustus</option>
            <option value="9">September</option>
            <option value="10">Oktober</option>
            <option value="11">November</option>
            <option value="12">Desember</option>
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
          <button type="submit" className="form-control btn btn-primary rounded submit px-3">
            Kirim
          </button>
        </div>
      </form>
    </>
  );
}

export default Upload;
