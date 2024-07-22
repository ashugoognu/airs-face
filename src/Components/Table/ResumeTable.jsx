import React from "react";
import { Spinner } from "react-bootstrap";
import Table from 'react-bootstrap/Table';

export const ResumeTable = ({ candiResume, loader, resume }) => {

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
            <th>score</th>
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
            candiResume.length !== 0 ?
              <tbody>
                {
                  candiResume.filtered_resumes.map((item, i) => {
                    let name = item.split('/');
                    name = name.pop();
                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td className="name" onClick={() => handleResume(item)}>{name}</td>
                        <td> {candiResume.resumes_with_match_score[name].toFixed(2)} </td>
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
