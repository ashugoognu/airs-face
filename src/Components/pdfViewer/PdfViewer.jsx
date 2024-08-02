import React, { useEffect, useRef } from "react";
import { renderAsync } from "docx-preview";
import download from "../../assets/download1.png";

import Modal from "react-bootstrap/Modal";

const FileViewer = ({ fileUrl }) => {
  const containerRef = useRef(null);

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

  return fileUrl.endsWith(".pdf") ? (
    <>
      <Modal.Header closeButton>
        <Modal.Title className="resume-title">
          Candidate Resume
          <img
            src={download}
            alt="download"
            title="Download Resume"
            onClick={handleDownload}
          />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <iframe
          src={fileUrl}
          width="100%"
          height="100%"
          style={{ border: "none", minHeight: "100vh" }}
          title="File Viewer"
        />
      </Modal.Body>
    </>
  ) : (
    <>
      <Modal.Header closeButton>
        <Modal.Title className="resume-title">
          Candidate Resume
          <img
            src={download}
            alt="download"
            title="Download Resume"
            onClick={handleDownload}
          />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />
      </Modal.Body>
    </>
  );
};

export default FileViewer;
