import React, { useState } from "react";
import email from "../../assets/email.png";
import call from "../../assets/call.png";
import next from "../../assets/next-icon.png";
import { BASE_URL } from "../../config";

import Modal from "react-bootstrap/Modal";
import FileViewer from "../pdfViewer/PdfViewer";
import { EditJdDetails } from "../modal/EditJdDetails";
import axios from "axios";

export const ResumeCard = ({ item, id, isChecked, onToggleHeart }) => {
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [url, setUrl] = useState();
  const [editDetails, setEditDetails] = useState();

  const handleResume = (fileUrl) => {
    const newUrl = `${BASE_URL}` + "/" + fileUrl.filepath;
    setUrl(newUrl);
    setFullscreen(true);
    setShow(true);
  };

  const handleEditModal = async (id) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/filter-resumes/get-candidate-resume-details?id=${id}`
      );
      setEditDetails(response.data);
      setShowEdit(true);
    } catch (error) {
      console.log(error);
    }
  };
  // window.localStorage.setItem("skillList", JSON.stringify(item.skills));

  return (
    <div className="card">
      <div className="top-details">
        <div className="left" onClick={(e) => handleEditModal(item.id)}>
          <h3>{item.sender_name} </h3>
        </div>
        <div className="right">
          <div>
            {item.sender_email && (
              <span className="email">
                <img src={email} alt="email" />
                {item.sender_email}
              </span>
            )}
            {item.mobile && (
              <span className="email">
                <img src={call} alt="call" />
                {item.mobile}
              </span>
            )}
          </div>
          <button className="btn" onClick={() => handleResume(item)}>
            View Resume
            <img src={next} alt="next" />
          </button>
        </div>
      </div>
      <div className="bottom-details">
        <div className="skill">
          <div className="left-title">
            <span>Skills</span>
          </div>
          <div className="skills">
            {item.skills.length > 0 ? (
              item.skills.map((skill, i) => {
                if (item.matchedSkillsList.find((elem) => elem === skill)) {
                  return (
                    <span key={i} className="matched-skills">
                      {" "}
                      {skill}{" "}
                    </span>
                  );
                } else {
                  return <span key={i}> {skill} </span>;
                }
              })
            ) : (
              <span> null </span>
            )}
          </div>
        </div>
        <div className="skill">
          <div className="left-title">
            <span>Matched Skills</span>
          </div>
          <div>
            <span>{item.matchedSkillsCount ? item.matchedSkillsCount : 0}</span>
          </div>
        </div>
        <div className="skill">
          <div className="left-title">
            <span>Experience</span>
          </div>
          <div>
            <span>{item.experience ? item.experience : 0} years</span>
          </div>
        </div>
        <div className="skill">
          <div className="left-title">
            <span>Matching Score</span>
          </div>
          <div>
            <span>{item.match_score ? item.match_score.toFixed(2) : 0}%</span>
          </div>
        </div>
        <div className="heart-container">
          <div className="checkboxes-container">
            <div className="control-group">
              <input
                className="red-heart-checkbox"
                id={`red-check2-${id}`}
                type="checkbox"
                checked={isChecked || false}
                onChange={onToggleHeart}
              />
              <label htmlFor={`red-check2-${id}`}></label>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <FileViewer fileUrl={url} />
      </Modal>
      <Modal show={showEdit} size="lg" onHide={() => setShowEdit(false)}>
        <EditJdDetails item={editDetails} setShowEdit={setShowEdit} />
      </Modal>
    </div>
  );
};
