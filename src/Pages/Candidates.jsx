import React, { useEffect, useState } from "react";
import { JDTextArea } from "../Components/TextArea/JDTextArea";
import { CandidateTable } from "../Components/Table/CandidateTable";
import Button from 'react-bootstrap/Button';
import axios from "axios";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { ResumeTable } from "../Components/Table/ResumeTable";
import { BestResume } from "../Components/Table/BestResume";
// import { Document, Page, pdfjs } from "react-pdf";
// import url from "/public/assets/resume.pdf";

export const Candidates = () => {
  // window.localStorage.clear()
  const [loader, setLoader] = useState(false);
  const [loaders, setLoaders] = useState(false);
  const [candiDataa, setCandiDataa] = useState(JSON.parse(window.localStorage.getItem('candidates')) || [])
  const [candiResume, setCandiResume] = useState(JSON.parse(window.localStorage.getItem('candiResume')) || [])
  // pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

  const [jdValue, setJdValue] = useState({
    jd: ''
  });

  const handleJdCandidates = async () => {
    setLoader(true)
    var options = {
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/v1/filter-resumes/filter-resumes-from-jd-skillss',
      headers: {
        'Content-Type': 'application/json'
      },
      data: jdValue
    };

    axios.request(options).then(function (response) {
      console.log(response.data)
      setCandiDataa(response.data)
      findBestResume()
      setLoader(false)
      window.localStorage.setItem('candidates', JSON.stringify(response.data))
    }).catch(function (error) {
      console.error(error);
    });
  }

  console.log(window.localStorage.getItem('candidates'))

  const findBestResume = async () => {
    setLoaders(true)
    var options2 = {
      method: 'GET',
      url: 'http://127.0.0.1:8000/api/v1/match-resumes/get-most-suitable-jd-matching-resume',
      headers: {
        'Content-Type': 'application/json'
      },
    };

    await axios.request(options2).then(function (res) {
      console.log(res.data)
      setCandiResume(res.data)
      setLoaders(false)
      window.localStorage.setItem('candiResume', JSON.stringify(res.data))
      return;
    }).catch(function (error) {
      console.log(error)
    })
  }

  // useEffect(() => {
  //   findBestResume();
  // },[])

  useEffect(() => {
    setCandiDataa(JSON.parse(window.localStorage.getItem('candidates')))
  }, [])

  return (
    <div className="m-4">
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
        <Button variant="primary" onClick={() => handleJdCandidates()}>Find</Button>
      </div>

      {/* <div style={{ width: '100%', height: '100vh' }}>
        <embed
          src={url}
          type="application/pdf"
          width="100%"
          height="100%"
        />
      </div> */}
      {/* <CandidateTable candiData={candiDataa} /> */}
      <ResumeTable loader={loader} candiResume={candiDataa} />
      <br />
      <h2> Best Resume </h2>
      <BestResume loader={loaders} candiResume={candiResume} />
    </div>
  );
};
