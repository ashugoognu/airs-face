import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import upload from "../assets/uploadicon.png";
import search from "../assets/searchicon.png";
import next from "../assets/nexticon.png";
import docs from "../assets/document.png";
import Skeleton from "react-loading-skeleton";
import { ResumeCard } from "../Components/ResumeCards/ResumeCard";
import { BASE_URL } from "../config";
import "../assets/scss/heart.scss";

export const Candidates = () => {
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState();
  const [candiData, setCandiData] = useState([]);
  const [checkedState, setCheckedState] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const lableRef = useRef();
  const [jdValue, setJdValue] = useState({
    jd: "",
    filepath: "",
  });

  const sortedCandiData = candiData.sort(
    (a, b) => b.match_score - a.match_score
  );

  const handleJdCandidates = async (pageNo) => {
    setPage(pageNo);
    setLoader(true);
    const formData = new FormData();
    formData.append("filepath", jdValue.filepath);
    formData.append("jd", jdValue.jd);
    formData.append("page", pageNo);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/filter-resumes/filter-resumes-from-jd-skillss`,
        formData
      );
      setCandiData(response.data.results);
      setPagination(response.data.pagination);
      window.localStorage.setItem("candiData", JSON.stringify(response.data));
      setLoader(false);
      const res = await axios.get(
        `${BASE_URL}/api/v1/filter-resumes/shortlist-candidate?jd_path=${jdValue.filepath.name}`
      );
      setWishlist(res.data.resumes[0]);
      window.localStorage.setItem("wishlist", JSON.stringify(res.data.resumes));
    } catch (error) {
      console.error(error);
      setLoader(false);
    }
  };

  //handle jd file input
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      lableRef.current.innerText = file.name;
    }
    setJdValue((prev) => ({ ...prev, filepath: file }));
  };

  //handle wishlist add and remove from the database
  const handleWishList = async (id) => {
    try {
      const data = candiData.find((candi, i) => i === id);
      const formDataa = new FormData();
      formDataa.append("jd_path", jdValue.filepath.name);
      formDataa.append("resume_path", data.filepath);
      let jd = formDataa.get("jd_path");

      if (jd !== "undefined") {
        if (checkedState[id]) {
          const response = await axios.post(
            `${BASE_URL}/api/v1/filter-resumes/shortlist-candidate`,
            formDataa
          );
          
        } else {
          const response = await axios.post(
            `${BASE_URL}/api/v1/filter-resumes/remove-shortlisted-candidate`,
            formDataa
          );
          
        }
      } else {
        console.log("JD is not available");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedId !== null) {
      handleWishList(selectedId);
    }
  }, [checkedState, selectedId]);

  const toggleHeart = (id) => {
    setCheckedState((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));

    setSelectedId(id);
  };

  useEffect(() => {
    let updatedCheckedState = {};
    for (let i = 0; i < candiData.length; i++) {
      updatedCheckedState[i] = false;
    }

    wishlist && wishlist.forEach((elem) => {
      const matchedElement = candiData.find(
        (element) => elem === element.filepath
      );

      if (matchedElement) {
        const index = candiData.indexOf(matchedElement);
        updatedCheckedState[index] = true;
      }
    });

    setCheckedState(updatedCheckedState);
  }, [wishlist, candiData, jdValue]);

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
          <button
            className="find-btn btn"
            onClick={() => handleJdCandidates(page)}
          >
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
          sortedCandiData.map((item, i) => {
            const isChecked = checkedState[i];
            return (
              <ResumeCard
                key={i}
                id={i}
                item={item}
                isChecked={isChecked}
                onToggleHeart={() => toggleHeart(i)}
              />
            );
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
        {/* {candiData.length > 4 && (
          <div
            className={`${candiData.length <= count ? "d-none" : ""} view-more`}
          >
            <button className="btn" onClick={() => setCount(count + 4)}>
              Load more results...
            </button>
          </div>
        )} */}
        {pagination && candiData.length > 1 && (
          <div className="pagination">
            <div className="container">
              <div className="prev">
                <button
                  className={`btn ${page > 1 ? "" : "disabled"}`}
                  onClick={() => {
                    handleJdCandidates(page - 1);
                  }}
                >
                  <img src={next} alt="next icon" />
                  <img src={next} alt="next icon" />
                  Prev
                </button>
              </div>
              <span>
                {page} / {pagination.total_pages}
              </span>
              <div className="next">
                <button
                  className={`btn ${
                    page === pagination.total_pages ? "disabled" : ""
                  }`}
                  onClick={() => {
                    handleJdCandidates(page + 1);
                  }}
                >
                  Next
                  <img src={next} alt="next icon" />
                  <img src={next} alt="next icon" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
