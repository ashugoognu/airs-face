import React, { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import Table from 'react-bootstrap/Table';

export const ResumeTable = ({ candiResume, loader }) => {

  const handleResume = (fileUrl) => {
    const path = fileUrl.replace(/\\/g, '/');
    const newUrl = `${process.env.REACT_APP_URL}` + '/' + path;
    window.open(newUrl, '_blank')
  }
  return (
    <>
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
                <td colSpan={2}>
                  <Spinner animation="border" role="status" style={{ margin: 'auto', display: 'flex' }}>
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </td>
              </tr>
            </tbody>
            :
            candiResume.length !== 0 ?
              <tbody>
                {
                  candiResume.filtered_resumes.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td className="name" onClick={() => handleResume(item)}>{item}</td>
                      </tr>
                    );
                  })
                }
              </tbody>
              :
              <></>
        }
      </Table>
    </>
  );
};
