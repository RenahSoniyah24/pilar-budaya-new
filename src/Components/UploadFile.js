import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

function UploadFile() {
  const [file, setFile] = useState(null);

  const onDrop = (acceptedFiles) => {
    // Take only the first file
    const uploadedFile = acceptedFiles[0];
    setFile({
      preview: URL.createObjectURL(uploadedFile),
      name: uploadedFile.name,
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1, // Limit to one file
    multiple: false, // Disable multiple file selection
  });

  return (
    <div>
      <div
        {...getRootProps()}
        style={{
          border: '2px dashed #ccc',
          padding: '20px',
          textAlign: 'center',
          cursor: 'pointer',
        }}
      >
        <input {...getInputProps()} />
        <p>Drag and drop a file here, or click to select one</p>
      </div>

      {file && (
        <div style={{ marginTop: '20px' }}>
          <p>{file.name}</p>
          <img
            src={file.preview}
            alt="Preview"
            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
          />
        </div>
      )}
    </div>
  );
}

export default UploadFile;