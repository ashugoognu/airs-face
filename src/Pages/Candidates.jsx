import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import axios from "axios";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { ResumeTable } from "../Components/Table/ResumeTable";
import { BestResume } from "../Components/Table/BestResume";
import { CreateJD } from "../Components/formAdd/CreateJD";

export const Candidates = () => {
  // window.localStorage.clear()
  const [loader, setLoader] = useState(false);
  const [loaders, setLoaders] = useState(false);
  const [candiDataa, setCandiDataa] = useState(JSON.parse(window.localStorage.getItem('candidates')) || [])
  const [candiResume, setCandiResume] = useState(JSON.parse(window.localStorage.getItem('candiResume')) || [])
  const [modalShow, setModalShow] = useState(false);

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
      console.log(response.data)
      setCandiDataa(response.data)
      findBestResume()
      setLoader(false)
      window.localStorage.setItem('candidates', JSON.stringify(response.data))
    }).catch(function (error) {
      console.error(error);
    });
  }

  const findBestResume = async () => {
    setLoaders(true)
    var options2 = {
      method: 'GET',
      url: `${process.env.REACT_APP_URL}/api/v1/match-resumes/get-most-suitable-jd-matching-resume`,
      headers: {
        'Content-Type': 'application/json'
      },
    };

    await axios.request(options2).then(function (res) {
      setCandiResume(res.data)
      setLoaders(false)
      window.localStorage.setItem('candiResume', JSON.stringify(res.data))
      return;
    }).catch(function (error) {
      console.log(error)
    })
  }

  useEffect(() => {
    setCandiDataa(JSON.parse(window.localStorage.getItem('candidates')))
    setCandiResume(JSON.parse(window.localStorage.getItem('candiResume')))
  }, [])

  return (
    <div className="m-4">
      <div className="top d-flex" style={{ justifyContent: 'space-between' }}>
        <div style={{ width: '80%' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '50px' }}> Find Best Resumes </h2>
        </div>
        <button className="btn btn-primary" onClick={() => setModalShow(true)} style={{ height: 'fit-content' }} > Create JD </button>
        <CreateJD
          show={modalShow}
          setLoaders={setLoaders}
          setCandiResume={setCandiResume}
          onHide={() => setModalShow(false)}
        />
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
      <ResumeTable loader={loader} candiResume={candiDataa} />
      <br />
      <h3> Best Resume </h3>
      <BestResume loader={loaders} candiResume={candiResume} />
    </div>
  );
};
