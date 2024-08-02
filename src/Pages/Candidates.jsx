import React, { useRef, useState } from "react";
import axios from "axios";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import upload from "../assets/uploadicon.png";
import search from "../assets/searchicon.png";
import docs from "../assets/document.png";
import Skeleton from "react-loading-skeleton";
import { ResumeCard } from "../Components/ResumeCards/ResumeCard";
import { BASE_URL } from "../config";

export const Candidates = () => {
  const [loader, setLoader] = useState(false);
  const [count, setCount] = useState(4);
  const [candiData, setCandiData] = useState([]);
  const lableRef = useRef();

  const [jdValue, setJdValue] = useState({
    jd: "",
  });

  const handleJdCandidates = async () => {
    setLoader(true);
    var options = {
      method: "POST",
      url: `${BASE_URL}/api/v1/filter-resumes/filter-resumes-from-jd-skillss`,
      headers: {
        "Content-Type": "application/json",
      },
      data: jdValue,
    };

    axios
      .request(options)
      .then(function (response) {
        setCandiData(response.data);
        setLoader(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      lableRef.current.innerText = file.name;
    }
  };

  return (
    <>
      <div className="m-5 mt-0 candidate-resume">
        <div className="top d-flex candidate-header">
          <h2> Find Best Resumes </h2>
        </div>
        <div className="jd-text-fields d-flex align-items-center w-100 gap-3 mb-3">
          <FloatingLabel
            controlId="floatingTextarea2"
            label="Enter Job description..."
          >
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              value={jdValue.jd}
              onChange={(e) =>
                setJdValue((prev) => ({ ...prev, jd: e.target.value }))
              }
            />
          </FloatingLabel>
          <span> OR </span>
          <Form.Group controlId="formFile" className="jd-upload-file">
            <img src={upload} alt="upload icon" />
            <Form.Label ref={lableRef}> Upload File</Form.Label>
            <Form.Control type="file" onChange={handleFile} />
          </Form.Group>
          <button className="find-btn btn" onClick={() => handleJdCandidates()}>
            <img src={search} alt="search icon" />
          </button>
        </div>
      </div>
      <div className="filtered-resume">
        {loader ? (
          <div className="card d-flex gap-2">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div style={{ flex: "0 0 50%" }}>
                <Skeleton width="100%" />
              </div>
              <div style={{ flex: "0 0 15%" }}>
                <Skeleton width="100%" />
              </div>
            </div>
            <Skeleton height={50} />
            <Skeleton count={2} />
          </div>
        ) : candiData.length > 0 ? (
          candiData.map((item, i) => {
            if (i < count) {
              return <ResumeCard item={item} key={i} />;
            }
          })
        ) : (
          <div className="card">
            <div className="empty-string">
              <img src={docs} alt="Empty Cart" />
              <h4>Your Search is Empty </h4>
              <p> Enter Job Description or upload file into above. </p>
            </div>
          </div>
        )}
        {candiData.length > 4 && (
          <div
            className={`${
              candiData.length === count ? "d-none" : ""
            } view-more`}
          >
            <button className="btn" onClick={() => setCount(candiData.length)}>
              {" "}
              Load more results...{" "}
            </button>
          </div>
        )}
      </div>
    </>
  );
};
