import React from "react";
import './App.css';
import { Candidates } from "./Pages/Candidates";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PDFViewer from "./Components/pdfViewer/PdfViewer";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Candidates />} />
        <Route path="/candidate/:name" element={<PDFViewer />} />
      </Routes>
    </Router>
  );
}

export default App;
