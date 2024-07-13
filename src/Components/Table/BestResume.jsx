import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { useNavigate } from "react-router-dom";

export const BestResume = ({ candiResume, loader }) => {
  // const navigate = useNavigate()

  // const handleResume = (item) => {
  //   const url = window.location.protocol + '//' + window.location.host + '/attachments' + item
  //   window.localStorage.setItem('pdf', `${url}`)
  //   const name = getFileName(item)
  //   navigate(`/candidate/${name}`)
  // }

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleResume = (fileUrl) => {
    const path = fileUrl.replace(/\\/g, '/');
    const newUrl = `${process.env.REACT_APP_URL}` + '/attachments/' + path;
    setPdfUrl(newUrl);
    console.log(newUrl)
    handleShow();
  }

  return (
    <Table bordered className="candi-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Resumes</th>
          <th>Score</th>
        </tr>
      </thead>

      {
        loader ?
          <tbody>
            <tr>
              <td colSpan={3}>
                <Spinner animation="border" role="status" style={{ margin: 'auto', display: 'flex' }}>
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </td>
            </tr>
          </tbody>
          :
          candiResume !== null ?
            <tbody>
              <tr>
                <td> 1 </td>
                <td className="name" onClick={() => handleResume(`${candiResume.best_matching_resume}`)}> {candiResume.best_matching_resume}</td>
                <td> {candiResume.matching_score}</td>
              </tr>
              {/* <tr>
                <td> 2 </td>
                <td className="name" onClick={() => handleResume('../assets/mahima_agnihotri.pdf')}> resume </td>
              </tr> */}
            </tbody>
            :
            <></>
      }

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
    </Table >
  );
};