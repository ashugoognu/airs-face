import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../config";
import { JDModal } from "../modal/JDModal";
import Skeleton from "react-loading-skeleton";
import docs from "../../assets/document.png";
import { Link } from "react-router-dom";

export const JDCart = () => {
  const [cart, setCart] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [jdvalue, setJdvalue] = useState([]);
  const [loader, setLoader] = useState(false);
  const [jdurl, setJdurl] = useState(null);

  const handleCart = async () => {
    setLoader(true);
    try {
      const jd = await axios.get(
        `${BASE_URL}/api/v1/filter-resumes/get-uploaded-jd`
      );
      setCart(jd.data.jd_list);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  useEffect(() => {
    handleCart();
  }, []);

  const handleJDList = async (jd) => {
    try {
      setJdurl(jd);
      const res = await axios.get(
        `${BASE_URL}/api/v1/filter-resumes/shortlist-candidate?jd_path=${jd}`
      );
      setJdvalue(res.data.resumes[0]);
      setModalShow(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="cart">
      <div className="container">
        {!loader ? (
          cart.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">JD File Name</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <th scope="row"> {index + 1} </th>
                    <td>
                      <span onClick={(e) => handleJDList(item)}>{item}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="card">
              <div className="empty-string">
                <img src={docs} alt="Empty Cart" />
                <h4>Your Cart is Empty </h4>
                <p> Go To <Link to="/">Home</Link> Enter Job Description or upload file. </p>
              </div>
            </div>
          )
        ) : (
          <div className="card d-flex gap-2">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                padding: "1rem",
              }}
            >
              <div style={{ flex: "0 0 15%" }}>
                <Skeleton width="100%" count={3} height={25} />
              </div>
              <div style={{ flex: "0 0 80%" }}>
                <Skeleton width="100%" count={3} height={25} />
              </div>
            </div>
          </div>
        )}
      </div>
      <JDModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        jdvalue={jdvalue}
        setjdvalue={setJdvalue}
        jdurl={jdurl}
      />
    </div>
  );
};
