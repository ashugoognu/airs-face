import React from "react";
import email from "../../assets/email.png";
import call from "../../assets/call.png";
import next from "../../assets/next-icon.png";
import { BASE_URL } from "../../config";

export const ResumeCard = ({ item }) => {
  const handleResume = (fileUrl) => {
    console.log(fileUrl.filepath);
    const newUrl = `${BASE_URL}` + "/" + fileUrl.filepath;
    window.open(newUrl, "_blank");
  };

  return (
    <div className="card">
      <div className="top-details">
        <div className="left">
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
                return <span key={i}> {skill} </span>;
              })
            ) : (
              <span> null </span>
            )}
          </div>
        </div>
        {/* <div className="skill">
          <div className="left-title">
            <span>EXPERIENCE</span>
          </div>
          <div>
            <span>5 years</span>
          </div>
        </div> */}
        <div className="skill">
          <div className="left-title">
            <span>MATCHING SCOPE</span>
          </div>
          <div>
            <span>{item.match_score ? item.match_score.toFixed(2) : 0}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
