import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import axios from "axios";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { ResumeTable } from "../Components/Table/ResumeTable";

export const Candidates = () => {
  const [loader, setLoader] = useState(false);
  const [candiData, setCandiData] = useState([])
  const [candiResume, setCandiResume] = useState([])

  const [jdValue, setJdValue] = useState({
    jd: ''
  });

  const handleJdCandidates = async () => {
    setLoader(true)
    var options = {
      method: 'POST',
      url: `${process.env.REACT_APP_URL}/api/v1/filter-resumes/filter-resumes-from-jd-skillss`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: jdValue
    };

    axios.request(options).then(function (response) {
      setCandiData(response.data)
      setLoader(false)
      setCandiResume(response.data.resumes_with_match_score)
    }).catch(function (error) {
      console.error(error);
    });
  }

  return (
    <div className="m-4">
      <div className="top d-flex" style={{ justifyContent: 'space-between' }}>
        <div style={{ width: '80%' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '50px' }}> Find Best Resumes </h2>
        </div>
      </div>
      <div className="d-flex align-items-center w-100 gap-3 mb-3">
        <FloatingLabel controlId="floatingTextarea2" label="Job Description" style={{ width: '60%' }}>
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            value={jdValue.jd}
            style={{ height: '200px' }}
            onChange={(e) => setJdValue(prev => ({ ...prev, jd: e.target.value }))}
          />
        </FloatingLabel>
        <span style={{ color: '#000000', fontWeight: 'bold' }}> OR </span>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label style={{ fontWeight: '500' }}> Upload your Job Description </Form.Label>
          <Form.Control type="file" />
        </Form.Group>
        <Button variant="primary" onClick={() => handleJdCandidates()}>Find</Button>
      </div>
      <h3>Filtered Resumes</h3>
      <ResumeTable loader={loader} candiResume={candiData} resume={candiResume} />
    </div>
  );
};
