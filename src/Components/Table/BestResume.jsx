import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { useNavigate } from "react-router-dom";

export const BestResume = ({ candiResume, loader }) => {

  const handleResume = (fileUrl) => {
    const path = fileUrl.replace(/\\/g, '/');
    const newUrl = `${process.env.REACT_APP_URL}` + '/media/attachments/' + path;
    window.open(newUrl, '_blank')
  }

  const resume = JSON.parse(window.localStorage.getItem('resume'))

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
          <tbody>
            <tr>
              <td> 1 </td>
              <td className="name" onClick={() => handleResume(`${candiResume.best_matching_resume}`)}> {candiResume.best_matching_resume}</td>
              <td> {candiResume.matching_score}</td>
            </tr>
          </tbody>
      }
    </Table >
  );
};