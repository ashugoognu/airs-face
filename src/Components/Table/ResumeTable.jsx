import React, { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';

export const ResumeTable = ({ candiResume, loader }) => {

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleResume = (fileUrl) => {
    const path = fileUrl.replace(/\\/g, '/');
    const newUrl = `${process.env.REACT_APP_URL}` + '/' + path;
    setPdfUrl(newUrl);
    console.log(newUrl)
    handleShow();
  }

  return (
    <>
      <Table bordered className="candi-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Resumes</th>
          </tr>
        </thead>
        {
          loader ?
            <tbody>
              <tr>
                <td colSpan={2}>
                  <Spinner animation="border" role="status" style={{ margin: 'auto', display: 'flex' }}>
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </td>
              </tr>
            </tbody>
            :
            candiResume !== null ?
              <tbody>
                {
                  candiResume.map((item, i) => {
                    const path = item.replace(/\\/g, '/');
                    const resume = path.split('/').pop();
                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td className="name" onClick={() => handleResume(item)}>{resume}</td>
                      </tr>
                    );
                  })
                }
              </tbody>
              :
              <></>
        }
      </Table>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Resume</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <embed
            src={pdfUrl}
            type="application/pdf"
            width="100%"
            height="600px"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
