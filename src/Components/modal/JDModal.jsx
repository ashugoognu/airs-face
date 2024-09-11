import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FileViewer from "../pdfViewer/PdfViewer";
import { BASE_URL } from "../../config";

export const JDModal = (props) => {
  const { jdvalue } = props;

  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [url, setUrl] = useState();

  const handleResume = (fileUrl) => {
    const newUrl = `${BASE_URL}` + "/" + fileUrl;
    setUrl(newUrl);
    setFullscreen(true);
    setShow(true);
  };

  console.log(jdvalue);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Short Listed Candidates
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {jdvalue && jdvalue.length > 0 ? (
          jdvalue.map((item, i) => {
            return (
              <p key={i}>
                <span onClick={() => handleResume(item)} style={{ cursor: "pointer" }}>{item}</span>
              </p>
            );
          })
        ) : (
          <p>JD list is not available</p> 
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <FileViewer fileUrl={url} />
      </Modal>
    </Modal>
  );
};
