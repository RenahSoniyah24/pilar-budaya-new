import React, { useEffect, useState } from 'react';
import { FaRegUser } from "react-icons/fa";
import { useParams, useHistory } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import '../../../../style/css/style.css';
import Notification from '../../../../Components/Notification';
import { uploadContentService } from '../../../../Services/ServicesAPI';

import 'antd/dist/reset.css';

import Admin from '../../Index';

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

function FormPost(props) {
  const { identifier } = useParams();
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
    if (Array.isArray(files)) {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    }
  }, [files]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await uploadContentService(namaKonten, halaman, keterangan, files);
      if (response.data) {
        Notification.success('Berhasil, ', 'Upload Content Berhasil');
        setNamaKonten('')
        setHalaman('')
        setKeterangan('')
        setFiles('')
      } else {
        throw new Error('Failed to login');
      }
    } catch (err) {
      console.error('Error:', err.message || err);
      setNamaKonten('')
      setHalaman('')
      setKeterangan('')
      setFiles('')
      Notification.warning('Upps, ', err.message);
    }
  };

  return (
    <Admin>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <div className="h4 d-flex align-items-center">
          <FaRegUser size={20} className="mx-2" />
          Post
        </div>
      </div>

      <h2>Form Post</h2>
      <form onSubmit={submitHandler} className="signin-form">
        <div className="form-group mb-3">
          <label className="label">Nama Konten</label>
          <input
            type="text"
            className="form-control"
            placeholder="Nama Konten"
            value={namaKonten}
            onChange={(e) => setNamaKonten(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label className="label">Halaman</label>
          <select
            className="form-select"
            value={halaman}
            onChange={(e) => setHalaman(e.target.value)}
            required
          >
            <option value="" defaultValue></option>
            <option value="1">Profil</option>
            <option value="2">Gallery</option>
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
        <div className="form-group mb-3">
          <label className="label">Keterangan</label>
          <input
            type="text"
            className="form-control"
            placeholder="Keterangan"
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="form-control btn btn-primary rounded submit px-3">
            Unggah
          </button>
        </div>
      </form>
    </Admin>
  );
}

export default FormPost;
