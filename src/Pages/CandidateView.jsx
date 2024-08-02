import React, { useEffect, useState } from "react";
import user from "../assets/usericon.png";


export const CandidateView = () => {

  const candidate = JSON.parse(window.localStorage.getItem('candidate'))

  return (
    <div className="candi-view">
      <div className="container">
        <div className="row">
          <div className="col-6">
            <div className="card">
              <div className="candi-pic">
                <img src={user} alt="candidate picture" />
              </div>
              <hr />
              <div className="candi-details">
                <div className="name">
                  <span>Name:</span>
                  <span> {candidate.name} </span>
                </div>
                <hr />
                <div className="mobile">
                  <span>Mobile:</span>
                  <span> +91 {candidate.mobile ? candidate.name : '00000 00000'} </span>
                </div>
                <hr />
                <div className="email">
                  <span>Email:</span>
                  <span> {candidate.email ? candidate.email : 'null'} </span>
                </div>
                <hr />
                <div className="role">
                  <span> Job Role: </span>
                  <span> {candidate.job_titles ? candidate.job_titles : 'null'} </span>
                </div>
                <hr />
                <div className="skill">
                  <span> Skills: </span>
                  {
                    candidate.skills ?
                      <div>
                        {
                          candidate.skills.map((skill, i) => {
                            return (
                              <span key={i}> {skill}, </span>
                            )
                          })
                        }
                      </div>
                      :
                      <span> null </span>
                  }
                </div>
                <hr/>
                <div className="Resume">
                  <span> Resume: </span>
                  <span> {candidate.filepath ? candidate.filepath : 'null'} </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6">

          </div>
        </div>
      </div>
    </div>
  );
};
