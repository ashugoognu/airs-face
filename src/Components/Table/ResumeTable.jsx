import React from "react";
import { Spinner } from "react-bootstrap";
import Table from 'react-bootstrap/Table';

export const ResumeTable = ({ candiResume, loader }) => {

  console.log('resume',loader)

  return (
    <Table bordered className="candi-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Resumes</th>
        </tr>
      </thead>

      {
        candiResume !== null ?
          <tbody>
            {
              candiResume.map((item, i) => {
                return (
                  <tr key={i}>
                    <td> {i + 1} </td>
                    <td className="name"> {item}</td>
                  </tr>
                )
              })
            }
          </tbody>
          :
          loader == true ?
            <tbody>
              <tr>
                <td colSpan={2}>
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </td>
              </tr>
            </tbody>
            :
            <></>
      }
    </Table >
  );
};
