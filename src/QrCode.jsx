import { useState } from "react";
import { Link } from "react-router-dom";


const QrCode = () => {
    const [img, setImg] = useState("");
    const [loading, setLoading] = useState(false);
    const [qrData, setQrData] = useState("https://srijayajothi.com/index.html");
    const [qrSize, setQrSize] = useState("150");

    async function generateQR() {
        setLoading(true);
        try {
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
            setImg(url);
        } catch (error) {
            console.error("Error Generating QR Code", error);
        } finally {
            setLoading(false);
        }
    }

    function downloadQR() {
        fetch(img)
            .then((response) => response.blob())
            .then((blob) => {
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "QRCode.png";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
    }

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-body">
                    <h1 className="text-center mb-4">QR CODE GENERATOR</h1>
                    {loading && <p className="text-center text-secondary">Please Wait...</p>}
                    {img && (
                        <div className="text-center mb-4">
                            <img src={img} alt="Generated QR Code" />
                        </div>
                    )}
                    <div className="mb-3">
                        <label htmlFor="datainput" className="form-label">Data for QR Code:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="datainput"
                            placeholder="Enter QR Code Data"
                            value={qrData}
                            onChange={(e) => setQrData(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="sizeInput" className="form-label">Image size (e.g., 150):</label>
                        <input
                            type="text"
                            className="form-control"
                            id="sizeInput"
                            placeholder="Enter Image Size"
                            value={qrSize}
                            onChange={(e) => setQrSize(e.target.value)}
                        />
                    </div>
                    <div className="text-center">
                        <button
                            className="btn btn-primary me-2"
                            disabled={loading}
                            onClick={generateQR}
                        >
                            Generate QR
                        </button>
                        <button className="btn btn-success" onClick={downloadQR}>
                            Download QR
                        </button>
                    </div>
                    <div className="mt-4">
                        <p className="text-center">
                            Designed By <a href="https">R. RAVIKUMAR, INCHARGE - RAW MATERIAL</a>
                        </p>
                        <div className="text-center">
                            <Link to="/" className="btn btn-link">HOME</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QrCode;
