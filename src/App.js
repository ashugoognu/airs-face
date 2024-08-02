import React from "react";
import './App.css';
import 'react-loading-skeleton/dist/skeleton.css'
import { Candidates } from "./Pages/Candidates";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PDFViewer from "./Components/pdfViewer/PdfViewer";
import { Header } from "./Components/header/Header";

function App() {
  const pdfUrl = 'https://api-airs.hiringgo.com/media/attachments/CA%20Deepak%20Resume.pdf';

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Candidates />} />
        {/* <Route path="/testing" element={<PDFViewer fileUrl={pdfUrl} />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
