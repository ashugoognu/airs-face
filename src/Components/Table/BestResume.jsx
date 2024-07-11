import React from "react";
import { Spinner } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import { useNavigate } from "react-router-dom";

export const BestResume = ({ candiResume, loader }) => {
  const navigate = useNavigate()

  const handleResume = (item) => {
    window.localStorage.setItem('pdf', `${item}`)
    const name = getFileName(item)
    navigate(`/candidate/${name}`)
  }

  return (
    <Table bordered className="candi-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Resumes</th>
          <th>Score</th>
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
              <tr>
                <td> 1 </td>
                <td className="name" onClick={() => handleResume(candiResume.best_matching_resume)}> {candiResume.best_matching_resume}</td>
                <td className="name"> {candiResume.matching_score}</td>
              </tr>
              <tr>
                <td> 2 </td>
                <td className="name" onClick={() => handleResume('../assets/mahima_agnihotri.pdf')}> resume </td>
              </tr>
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