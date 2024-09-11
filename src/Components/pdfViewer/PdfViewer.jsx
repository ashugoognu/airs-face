// eslint-disable-next-line no-console
import React, { useEffect, useRef, useState } from "react";
import { renderAsync } from "docx-preview";
import download from "../../assets/download1.png";
import zoomin from "../../assets/zoomin.png";
import zoomout from "../../assets/zoomout.png";
import Modal from "react-bootstrap/Modal";
import PDFReader from "./PDFReader";

const FileViewer = ({ fileUrl }) => {
  const containerRef = useRef(null);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const renderDocx = async () => {
      if (fileUrl.endsWith(".docx")) {
        const response = await fetch(fileUrl);
        const blob = await response.blob();
        await renderAsync(blob, containerRef.current);
      }
    };

    renderDocx();
  }, [fileUrl]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.1, 3));
    const docx = document.querySelector(".docx-wrapper .docx")
    docx.style.transform = `scale(${Math.min(zoom + 0.1, 3)})`
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.5));
    const docx = document.querySelector(".docx-wrapper .docx")
    docx.style.transform = `scale(${Math.max(zoom - 0.1, 0.5)})`
  };

  return fileUrl.endsWith(".pdf") ? (
    <>
      <Modal.Header closeButton>
        <Modal.Title className="resume-title">
          Candidate Resume
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PDFReader pdf={fileUrl} />
      </Modal.Body>
    </>
  ) : (
    <>
      <Modal.Header closeButton>
        <Modal.Title className="resume-title">
          <span> Candidate Resume</span>
          <div>
            <img
              src={download}
              alt="download"
              title="Download Resume"
              onClick={handleDownload}
            />
            <span
              onClick={handleZoomIn}
              style={{ cursor: "pointer", marginLeft: "10px" }}
            >
              <img src={zoomin} alt="zoom in" />
            </span>
            <span
              onClick={handleZoomOut}
              style={{ cursor: "pointer", marginLeft: "10px" }}
            >
              <img src={zoomout} alt="zoom out" />
            </span>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          ref={containerRef}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </Modal.Body>
    </>
  );
};

export default FileViewer;
