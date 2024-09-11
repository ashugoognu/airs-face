import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../config";
import { JDModal } from "../modal/JDModal";

export const JDCart = () => {
  const [cart, setCart] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [jdvalue, setJdvalue] = useState([]);

  const handleCart = async () => {
    try {
      const jd = await axios.get(
        `${BASE_URL}/api/v1/filter-resumes/get-uploaded-jd`
      );
      setCart(jd.data.jd_list);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleCart();
  }, []);

  const handleJDList = async(jd) => {
    console.log(jd);
    try {
      const res = await axios.get(
        `${BASE_URL}/api/v1/filter-resumes/shortlist-candidate?jd_path=${jd}`
      );
      setJdvalue(res.data.resumes[0]);
      setModalShow(true);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(jdvalue);

  return (
    <div className="cart">
      <div className="container">
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
      </div>
      <JDModal show={modalShow} onHide={() => setModalShow(false)} jdvalue={jdvalue} />
    </div>
  );
};
