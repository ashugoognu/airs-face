import React from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

export const JDTextArea = ({ setJdValue, jdValue }) => {

  return (
    <FloatingLabel controlId="floatingTextarea2" label="Job Description" style={{width: '60%'}}>
      <Form.Control
        as="textarea"
        placeholder="Leave a comment here"
        value={jdValue.jd}
        style={{ height: '200px' }}
        onChange={(e) => { setJdValue(prev => ({...prev, jd: e.target.value})) }}
      />
    </FloatingLabel>
  );
};
