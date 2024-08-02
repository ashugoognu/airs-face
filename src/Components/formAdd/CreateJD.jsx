import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import axios from 'axios';

export const CreateJD = ({ setCandiResume, setLoaders, ...props }) => {

  const [input, setInput] = useState({
    job_title: "",
    company_name_location: "",
    company_profile_intro: "",
    job_description: "",
    job_roles_responsibilities: "",
    job_requirements_skills: "",
    job_benefits_perks: "",
    job_apply_link: ""
  })

  const handleInput = (e) => {
    e.preventDefault();
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const createJD = async () => {
    props.onHide()
    try {
      await axios.post(`${process.env.REACT_APP_URL}/api/v1/upload-jd/get-job-details`, input).then((res) => {
        getBestResume()
      })
    } catch (error) {
      console.log(error)
    }
  }

  const getBestResume = () => {
    setLoaders(true)
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_URL}/api/v1/match-resumes/get-most-suitable-jd-matching-resume`,
      headers: {}
    };

    axios.request(config)
      .then((response) => {
        setLoaders(false)
        setCandiResume(response.data)
        window.localStorage.setItem('candiResume', JSON.stringify(response.data))
        return;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className='create-jd'
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Job Description
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-6">
            <Form.Label htmlFor="job_title">Job Title</Form.Label>
            <Form.Control type="text" placeholder="Job Title" name='job_title' onChange={handleInput} />
          </div>
          <div className="col-6">
            <Form.Label htmlFor="company_name_location">Company Name</Form.Label>
            <Form.Control type="text" placeholder="Company Name" name="company_name_location" onChange={handleInput} />
          </div>
          <div className="col-6">
            <Form.Label htmlFor="company_profile_intro">Company Intro</Form.Label>
            <Form.Control type="text" placeholder="Company Intro" name="company_profile_intro" onChange={handleInput} />
          </div>
          <div className="col-6">
            <Form.Label htmlFor="job_description">Job Description</Form.Label>
            <Form.Control type="text" placeholder="Job Description" name="job_description" onChange={handleInput} />
          </div>
          <div className="col-6">
            <Form.Label htmlFor="job_roles_responsibilities">Job Roles & Responsibilities</Form.Label>
            <Form.Control type="text" placeholder="Job Roles & Responsibilities" name="job_roles_responsibilities" onChange={handleInput} />
          </div>
          <div className="col-6">
            <Form.Label htmlFor="job_requirements_skills">Job Requirements & Skills</Form.Label>
            <Form.Control type="text" placeholder="Job Requirements & Skills" name="job_requirements_skills" onChange={handleInput} />
          </div>
          <div className="col-6">
            <Form.Label htmlFor="job_benefits_perks">Job Benefits</Form.Label>
            <Form.Control type="text" placeholder="Job Benefits" name="job_benefits_perks" onChange={handleInput} />
          </div>
          <div className="col-6">
            <Form.Label htmlFor="job_apply_link">Job Apply Link</Form.Label>
            <Form.Control type="text" placeholder="Job Apply Link" name="job_apply_link" onChange={handleInput} />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => createJD()}>Create & Find</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
