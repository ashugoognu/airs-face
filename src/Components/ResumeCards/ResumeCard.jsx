import React from "react";
import email from "../../assets/email.png";
import call from "../../assets/call.png";
import next from "../../assets/next-icon.png";

export const ResumeCard = () => {
  return (
    <div className="card">
      <div className="top-details">
        <div className="left">
          <h3>Rakesh </h3>
        </div>
        <div className="right">
          <div>
            <span className="email">
              <img src={email} alt="email" />
              rekesh@hiringgo.com
            </span>
            <span className="email">
              <img src={call} alt="call" />
              9876543212
            </span>
          </div>
          <button className="btn">
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
            <span>Linux</span>
            <span>Devops</span>
            <span>Ubuntu</span>
            <span>Linux</span>
            <span>Devops</span>
            <span>Ubuntu</span>
            <span>Linux</span>
            <span>Devops</span>
            <span>Ubuntu</span>
            <span>Linux</span>
            <span>Devops</span>
            <span>Ubuntu</span>
            <span>Linux</span>
            <span>Devops</span>
            <span>Ubuntu</span>
          </div>
        </div>
        <div className="skill">
          <div className="left-title">
            <span>EXPERIENCE</span>
          </div>
          <div>
            <span>5 years</span>
          </div>
        </div>
        <div className="skill">
          <div className="left-title">
            <span>MATCHING SCOPE</span>
          </div>
          <div>
            <span>50%-100%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
