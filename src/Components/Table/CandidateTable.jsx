import axios from "axios";
import React from "react";
import Table from 'react-bootstrap/Table';
import { useNavigate } from "react-router-dom";

export const CandidateTable = ({ candiData }) => {

  const navigate = useNavigate();

  const handleCandi = async (id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/get-candidate-details/?id=${id}`)
      window.localStorage.setItem('candidate', JSON.stringify(response.data))
      navigate(`/candidate/${id}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Table bordered className="candi-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>Job Title</th>
          <th>Skills</th>
        </tr>
      </thead>

      {
        candiData !== null ?
          <tbody>
            {
              candiData.map((item, i) => {
                return (
                  <tr key={i}>
                    <td> {i + 1} </td>
                    <td onClick={() => handleCandi(item._id)} className="name"> {item.name}</td>
                    <td>{item.email ? item.email : 'null'}</td>
                    <td>+91 {item.mobile ? item.mobile : '00000 00000'}</td>
                    <td>{item.job_titles ? item.job_titles : 'null'}</td>
                    <td>
                      {
                        item.skills ?
                          <div>
                            {
                              item.skills.map((skill, ix) => {
                                return (
                                  <span key={ix}> {skill},  </span>
                                )
                              })
                            }
                          </div>
                          :
                          <></>
                      }
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
          :
          <></>
      }
    </Table >
  );
};
