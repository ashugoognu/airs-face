import React from "react";
import { Spinner } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import { useNavigate } from "react-router-dom";

export const ResumeTable = ({ candiResume, loader }) => {

  const navigate = useNavigate()

  const handleResume = (item) => {
    window.localStorage.setItem('pdf', item)
    const name = getFileName(item)
    navigate(`/candidate/${name}`)
  }

  return (
    <Table bordered className="candi-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Resumes</th>
        </tr>
      </thead>
      {
        loader ?
          <tbody>
            <tr>
              <td colSpan={3}>
                <Spinner animation="border" role="status" style={{ margin: 'auto', display: 'flex' }}>
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </td>
            </tr>
          </tbody>
          :
          candiResume !== null ?
            <tbody>
              {
                candiResume.map((item, i) => {
                  const path = item.replace(/\\/g, '/')
                  const resume = path.split('/')[1]
                  const url = window.location.protocol + '//' + window.location.host + '/' + path
                  return (
                    <tr key={i}>
                      <td> {i + 1} </td>
                      <td className="name" onClick={() => handleResume(url)}> {resume}</td>
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


function getFileName(filePath) {
  const parts = filePath.split('/');
  return parts[parts.length - 1].split('.')[0];
}