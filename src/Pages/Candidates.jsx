import React, { useEffect, useState } from "react";
import { JDTextArea } from "../Components/TextArea/JDTextArea";
import { CandidateTable } from "../Components/Table/CandidateTable";
import Button from 'react-bootstrap/Button';
import axios from "axios";

export const Candidates = () => {

  const [candiData, setCandiData] = useState(JSON.parse(window.localStorage.getItem('candidates')) || [])

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
      setCandiData(response?.data)
      window.localStorage.setItem('candidates', JSON.stringify(response.data))
    }).catch(function (error) {
      console.error(error);
    });
  }

  useEffect(() => {
    setCandiData(JSON.parse(window.localStorage.getItem('candidates')))
  }, [jdValue])

  // window.localStorage.clear()

  return (
    <div className="m-4">
      <div className="d-flex align-items-center w-100 gap-3 mb-3">
        <JDTextArea setJdValue={setJdValue} jdValue={jdValue} />
        <Button variant="primary" onClick={() => handleJdCandidates()}>Find</Button>
      </div>
      <CandidateTable candiData={candiData} />
    </div>
  );
};
