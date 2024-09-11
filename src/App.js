import React from "react";
import './App.css';
import 'react-loading-skeleton/dist/skeleton.css'
import { Candidates } from "./Pages/Candidates";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./Components/header/Header";
import PDFReader from "./Components/pdfViewer/PDFReader";
import { JDCart } from "./Components/jd/JDCart";

function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Candidates />} />
        <Route path="/cart" element={<JDCart />} />
      </Routes>
    </Router>
  );
}

export default App;
