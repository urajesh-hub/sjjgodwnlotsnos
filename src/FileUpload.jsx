import React, { useState } from "react";
import { BlobServiceClient } from "@azure/storage-blob";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    setUploading(true);
    setMessage("");

    const accountName = import.meta.env.VITE_API_ACC_NAME;
    const containerName = import.meta.env.VITE_API_CONTAINER;
    const sasToken = import.meta.env.VITE_SAS_TOKEN;

    const blobServiceClient = new BlobServiceClient(
      `https://${accountName}.blob.core.windows.net?${sasToken}`
    );

    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(file.name);

    try {
      // Upload the file using uploadData
      await blockBlobClient.uploadData(file, {
        blobHTTPHeaders: {
          blobContentType: file.type, // Sets the MIME type
          blobContentDisposition: `inline; filename="${file.name}"`, // Sets the content disposition
        },
      });
      setMessage("File uploaded successfully!");
    } catch (error) {
      setMessage(`Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow-sm">
        <h4 className="mb-3 text-center text-md-start">Upload File</h4>
        <div className="mb-3 row align-items-center">
          {/* File Input */}
          <div className="col-12 col-md-8 mb-2 mb-md-0 ">
            <input
              type="file"
              onChange={handleFileChange}
              className="form-control"
            />
          </div>
          {/* Buttons */}
          <div className="col-12 col-md-4 d-flex justify-content-md-end gap-2">
            <button
              onClick={uploadFile}
              disabled={uploading}
              className="btn btn-warning fw-bold"
            >
              {uploading ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                "UPLOAD"
              )}
            </button>
            <button className="btn btn-success fw-bold">QR GENERATOR</button>
          </div>
        </div>
        {/* Message Display */}
        {message && (
          <div
            className={`alert ${
              message.includes("Error") ? "alert-danger" : "alert-success"
            } mt-3`}
            role="alert"
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;