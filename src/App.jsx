import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FileUpload from './FileUpload';
import FileList from './FileList';

import './App.css'; // Import custom styles
import QrCode from './QrCode';


const App = () => {
  return (
    <Router>
      <div className="app-container">
        <div className="card">
          <div className="card-header bg-primary text-white">
            GODOWN BALES LOT DETAILS
          </div>
          <div className="card-body">

            
            {/* Navigation Links */}
            <nav className="mb-4 fw-bold">
              <ul className="nav nav-pills">
                <li className="nav-item ">
                  <Link className="nav-link" to="/upload">
                    FILE UPLOAD
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/list">
                    GODOWN LOT LIST
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/QrCode">
                    QR GENERATOR
                  </Link>
                </li>
              </ul>
            </nav>
            {/* Routes */}
            <Routes>
              <Route path="/upload" element={<FileUpload />} />
              <Route path="/list" element={<FileList />} />
              <Route path="/QrCode" element={<QrCode />} />
             
             
             
              <Route
                path="/"
                element={<div>Welcome to Godown Bales Lot Details App!</div>}
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
