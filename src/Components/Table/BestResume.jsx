import React from "react";
import { Spinner } from "react-bootstrap";
import Table from 'react-bootstrap/Table';

export const BestResume = ({ candiResume, loader }) => {

  console.log('best resume', loader)

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
                <td className="name"> {candiResume.best_matching_resume}</td>
                <td className="name"> {candiResume.matching_score}</td>
              </tr>
            </tbody>
            :
            <></>
      }
    </Table >
  );
};
