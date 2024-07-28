import React from "react";
import './App.css';
import 'react-loading-skeleton/dist/skeleton.css'
import { Candidates } from "./Pages/Candidates";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PDFViewer from "./Components/pdfViewer/PdfViewer";
import { Header } from "./Components/header/Header";

function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Candidates />} />
        <Route path="/candidate/:name" element={<PDFViewer />} />
      </Routes>
    </Router>
  );
}

export default App;
