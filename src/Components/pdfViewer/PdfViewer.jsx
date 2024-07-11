import React from 'react';

const PDFViewer = () => {

  const url = window.localStorage.getItem('pdf')

  return (
    <div style={{height:'100vh', overflow:'hidden'}}>
      <embed src={url} type="application/pdf" width="100%" style={{ height: '100%' }} />
    </div>
  )
};

export default PDFViewer;
