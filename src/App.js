import React from "react";
import './App.css';
import { Candidates } from "./Pages/Candidates";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CandidateView } from "./Pages/CandidateView";


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Candidates />} />
        <Route path="/candidate/:id" element={<CandidateView />} />
      </Routes>
    </Router>
  );
}

export default App;
