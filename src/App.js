import React, { useEffect } from "react";
import './App.css';
import { Candidates } from "./Pages/Candidates";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PDFViewer from "./Components/pdfViewer/PdfViewer";
// import WebSocketService from "./websocketService";

function App() {

  // useEffect(() => {
  //   const wsService = new WebSocketService('wss://airs.hiringgo.com:3000/ws');
  //   console.log(wsService.socket)
  //   return () => {
  //     if (wsService.socket) {
  //       wsService.socket.close();
  //     }
  //   };
  // }, []);

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
