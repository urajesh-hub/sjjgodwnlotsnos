// src/FileList.jsx
import React, { useEffect, useState } from 'react';
import { BlobServiceClient } from '@azure/storage-blob';
import './FileList.css';

const FileList = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [generatedUrls, setGeneratedUrls] = useState({});

  const accountName = import.meta.env.VITE_API_ACC_NAME;
  const containerName = import.meta.env.VITE_API_CONTAINER;
  const sasToken = import.meta.env.VITE_SAS_TOKEN;

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const blobServiceClient = new BlobServiceClient(
          `https://${accountName}.blob.core.windows.net?${sasToken}`
        );
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const fileList = [];

        for await (const blob of containerClient.listBlobsFlat()) {
          fileList.push(blob.name);
        }

        setFiles(fileList);
      } catch (error) {
        setMessage(`Error fetching files: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  const handleGetLinkClick = (fileName) => {
    const fileUrl = `https://${accountName}.blob.core.windows.net/${containerName}/${fileName}?${sasToken}`;
    setGeneratedUrls((prevUrls) => ({ ...prevUrls, [fileName]: fileUrl }));
  };

  const isImage = (fileName) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
    return imageExtensions.some((ext) => fileName.toLowerCase().endsWith(ext));
  };

  const isPDF = (fileName) => {
    return fileName.toLowerCase().endsWith('.pdf');
  };

  if (loading) {
    return <p>Loading files...</p>;
  }

  return (
    <div className="container mt-4">
      {message && <div className="alert alert-danger">{message}</div>}
      {files.length === 0 ? (
        <div className="alert alert-info text-center">No files uploaded yet.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th className="serial-no">S.NO</th>
                <th className="godown-lot">GODOWN LOT NO</th>
                <th className="get-link">GET LINK</th>
                <th className="generated-url">GENERATED URL</th>
              </tr>
            </thead>
            <tbody>
              {files.map((fileName, index) => (
                <tr key={fileName}>
                  <td className="text-center">{index + 1}</td>
                  <td>{fileName}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleGetLinkClick(fileName)}
                    >
                      Get Link
                    </button>
                  </td>
                  <td>
                    {generatedUrls[fileName] && (
                      <div className="d-flex align-items-center">
                        {isImage(fileName) ? (
                          <img
                            src={generatedUrls[fileName]}
                            alt={fileName}
                            style={{ width: '100px', height: 'auto', objectFit: 'cover' }}
                          />
                        ) : isPDF(fileName) ? (
                          <div className="pdf-viewer-container" style={{ width: '100%', height: '400px' }}>
                            <iframe
                              src={generatedUrls[fileName]}
                              width="100%"
                              height="100%"
                              frameBorder="0"
                              title={fileName}
                            ></iframe>
                          </div>
                        ) : (
                          <a
                            href={generatedUrls[fileName]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary me-2"
                          >
                            {fileName}
                          </a>
                        )}
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => {
                            navigator.clipboard.writeText(generatedUrls[fileName]);
                          }}
                        >
                          <i className="bi bi-clipboard"></i> Copy
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FileList;
