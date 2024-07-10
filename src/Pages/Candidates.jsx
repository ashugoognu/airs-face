import React, { useEffect, useState } from "react";
import { JDTextArea } from "../Components/TextArea/JDTextArea";
import { CandidateTable } from "../Components/Table/CandidateTable";
import Button from 'react-bootstrap/Button';
import axios from "axios";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

export const Candidates = () => {
  // window.localStorage.clear()

  const [candiDataa, setCandiDataa] = useState(JSON.parse(window.localStorage.getItem('candidates')) || [])

  const [jdValue, setJdValue] = useState({
    jd: ''
  });

  const handleJdCandidates = async () => {
    var options = {
      method: 'POST',
      url: 'http://127.0.0.1:8000/',
      headers: {
        'Content-Type': 'application/json'
      },
      data: jdValue
    };

    axios.request(options).then(function (response) {
      setCandiDataa(response?.data)
      console.log(response.data)
      window.localStorage.setItem('candidates', JSON.stringify(response.data))
    }).catch(function (error) {
      console.error(error);
    });
  }

  useEffect(() => {
    setCandiDataa(JSON.parse(window.localStorage.getItem('candidates')))
  }, [jdValue])

  return (
    <div className="m-4">
      <div className="d-flex align-items-center w-100 gap-3 mb-3">
      <FloatingLabel controlId="floatingTextarea2" label="Job Description" style={{width: '60%'}}>
      <Form.Control
        as="textarea"
        placeholder="Leave a comment here"
        value={jdValue.jd}
        style={{ height: '200px' }}
        onChange={(e) => setJdValue(prev => ({...prev, jd: e.target.value})) }
      />
    </FloatingLabel>
        <Button variant="primary" onClick={() => handleJdCandidates()}>Find</Button>
      </div>
      <CandidateTable candiData={candiDataa} />
    </div>
  );
};
