import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { WithContext as ReactTags } from "react-tag-input";
import { BASE_URL } from "../../config";

const skillArray = (item) =>
  item?.skills?.map((skill, index) => ({
    id: String(index),
    text: skill.trim(),
  })) || [];

export const EditJdDetails = ({ item, setShowEdit }) => {
  const [skills, setSkills] = useState(skillArray(item));
  const [success, setSuccess] = useState(null);

  // Use only one state to manage form input values
  const [inputValue, setInputValue] = useState({
    id: item._id,
    name: item.name,
    email: item.email,
    sender_name: item.sender_name,
    sender_email: item.sender_email,
    mobile: item.mobile,
    experience: item.experience,
    skills: skillArray(item).map((skill) => skill.text),
    job_titles: item.job_titles,
  });

  // Handle deletion of a skill
  const handleDelete = (i) => {
    const updatedSkills = skills.filter((_, index) => index !== i);
    setSkills(updatedSkills);
    setInputValue((prev) => ({
      ...prev,
      skills: updatedSkills.map((skill) => skill.text),
    }));
  };

  // Handle addition of a new skill
  const handleAddition = (skill) => {
    const updatedSkills = [
      ...skills,
      { id: String(skills.length), text: skill.text },
    ];
    setSkills(updatedSkills);
    setInputValue((prev) => ({
      ...prev,
      skills: updatedSkills.map((skill) => skill.text),
    }));
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/filter-resumes/get-candidate-resume-details`,
        inputValue
      );
      setSuccess(response?.data?.message);
      setTimeout(() => {
        setSuccess();
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title className="edit-title">Candidate Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form action="" className="resume-edit-form">
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={inputValue.name}
                placeholder="Enter Name"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="sender_name">Sender Name</label>
              <input
                type="text"
                className="form-control"
                id="sender_name"
                name="sender_name"
                value={inputValue.sender_name}
                placeholder="Enter Sender Name"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={inputValue.email}
                placeholder="Enter Email"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="sender_email">Sender Email</label>
              <input
                type="email"
                className="form-control"
                id="sender_email"
                name="sender_email"
                value={inputValue.sender_email}
                placeholder="Enter Sender Email"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="mobile">Mobile</label>
              <input
                type="number"
                className="form-control"
                id="mobile"
                name="mobile"
                value={inputValue.mobile}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="experience">Experience</label>
              <input
                type="number"
                className="form-control"
                id="experience"
                name="experience"
                value={inputValue.experience}
                placeholder="Enter Experience"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="job-profile">Job Profile</label>
              <input
                type="text"
                className="form-control"
                id="job-profile"
                name="job_titles"
                value={inputValue.job_titles}
                placeholder="Enter job profile"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group col-md-12">
              <label htmlFor="skills">Skills</label>
              <ReactTags
                tags={skills}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                inputFieldPosition="top"
                placeholder="Add skills (e.g., JavaScript, React)"
              />
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <span style={{ color: "green" }}> {success} </span>
        <div style={{ display: "flex", gap: "20px" }}>
          <Button variant="secondary" onClick={() => setShowEdit(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </div>
      </Modal.Footer>
    </>
  );
};

// "["devops","travis","api","chef","reporting","continuous integration","restful apis","yaml","database administration","scripting","scrum","automation","monitoring and logging","aws","saas","sql","orchestration","containerization technologies","docker","kibana","analytics and reporting","web development","aws services","collaboration","confluence","data management","groovy","seo","security","compliance","content","apis","maven","infrastructure automation","python","bash","css3","agile development","monitoring and alerting","software development","ci/cd","agile","storage","mongodb","grafana",""containerization"","github","resource management","container orchestration","gitlab","writing","debugging","paas","gitops","version control","nosql","sonarqube","apache","formation","workflow automation","mysql","route","git","s3","gcp","azure","restful","unix","infrastructure as code","iac tools","jenkins","html5","data analysis","prometheus","rest","vmware","ubuntu","json","configuration management","analytics","elasticsearch","microsoft azure","puppet","terraform","operations","kubernetes","debugging skills","security and compliance","monitoring","project management","elk stack","lambda","ci/cd pipelines","subversion","jira","deployment","disaster recovery","nagios","machine learning","scripting languages","apache tomcat","communication","java","linux","documentation","network security","performance monitoring","data storage","js","testing","ansible","node","node.js","cloudformation","postgresql"]"
