import React from 'react';

const PDFViewer = () => {

  const url = window.localStorage.getItem('pdf')
  console.log(url)
  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <embed src="https://api-airs.hiringgo.com/media/attachments/JEGEDE%20ATS%20RESUME.pdf" type="application/pdf" width="100%" height='100%' />
    </div>
  )
};

export default PDFViewer;
