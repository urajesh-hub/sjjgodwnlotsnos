import React, { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";

const QrCodeNumber = () => {
  const [url, setUrl] = useState(""); // URL entered by the user
  const [generatedUrl, setGeneratedUrl] = useState(""); // URL for the QR code
  const [qrSize, setQrSize] = useState(400); // QR code size
  const [qrNumber, setQrNumber] = useState(""); // Number input
  const qrRef = useRef(null);

  // Function to generate the QR code
  const handleGenerate = () => {
    if (!url.trim()) {
      alert("Please enter a valid URL.");
      return;
    }
    setGeneratedUrl(url.trim()); // Save the entered URL to be used in the QR code
  };

  // Function to download the QR code as an image
  const handleDownload = () => {
    const qrElement = qrRef.current;
    if (!qrElement) return;

    html2canvas(qrElement).then((canvas) => {
      const link = document.createElement("a");
      link.download = "qrcode.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      
      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ padding: "10px", width: "80%", maxWidth: "400px", marginBottom: "10px" }}
      />
      <div>
        <input
          type="number"
          placeholder="Enter number (optional)"
          value={qrNumber}
          onChange={(e) => setQrNumber(e.target.value)}
          style={{ padding: "10px", width: "80%", maxWidth: "400px", marginBottom: "20px" }}
        />
      </div>
      <div>
        <button
          onClick={handleGenerate}
          style={{ padding: "10px 20px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", marginRight: "10px" }}
        >
          Generate QR Code
        </button>
        <button
          onClick={handleDownload}
          style={{ padding: "10px 20px", backgroundColor: "#007BFF", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
          disabled={!generatedUrl} // Disable if no QR code is generated
        >
          Download QR Code
        </button>
      </div>
      <div style={{ margin: "20px" }}>
        <label htmlFor="qrSize" style={{ fontSize: "16px", marginRight: "10px" }}>
          QR Code Size:
        </label>
        <input
          type="number"
          id="qrSize"
          value={qrSize}
          onChange={(e) => setQrSize(Number(e.target.value))}
          min="100"
          max="1000"
          style={{ padding: "10px", width: "100px", marginLeft: "10px", fontSize: "16px" }}
        />
      </div>
      {generatedUrl && (
        <div
          ref={qrRef}
          style={{ position: "relative", width: `${qrSize}px`, height: `${qrSize}px`, margin: "20px auto" }}
        >
          <QRCodeCanvas
            value={generatedUrl} // QR code generated using this URL
            size={qrSize}
            includeMargin={true}
            style={{ position: "absolute", top: 0, left: 0 }}
          />
          {qrNumber && (
            <div
            style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "black",
                fontSize: "40px",
                fontWeight: "bold",
                textAlign: "center",
                color: "#ff33de",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {qrNumber}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QrCodeNumber;
