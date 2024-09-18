import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FileViewer from "../pdfViewer/PdfViewer";
import { BASE_URL } from "../../config";
import remove from "../../assets/dustbin.png";
import axios from "axios";

export const JDModal = (props) => {
  const { jdvalue, setjdvalue, jdurl } = props;

  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [url, setUrl] = useState();

  const handleResume = (fileUrl) => {
    const newUrl = `${BASE_URL}` + "/" + fileUrl;
    setUrl(newUrl);
    setFullscreen(true);
    setShow(true);
  };

  const handleDelete = async (resumepath) => {
    try {
      const onDelete = window.confirm("Are you sure you want to delete?");

      if (onDelete) {
        const formDataa = new FormData();
        formDataa.append("resume_path", resumepath);
        formDataa.append("jd_path", jdurl);

        const response = await axios.post(
          `${BASE_URL}/api/v1/filter-resumes/remove-shortlisted-candidate`,
          formDataa
        );
        if (response) {
          const res = await axios.get(
            `${BASE_URL}/api/v1/filter-resumes/shortlist-candidate?jd_path=${jdurl}`
          );
          setjdvalue(res.data.resumes[0]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="jd-modal-list"
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
                <span
                  onClick={() => handleResume(item)}
                  style={{ cursor: "pointer" }}
                >
                  {item}
                </span>
                <span onClick={() => handleDelete(item)}>
                  {" "}
                  <img
                    src={remove}
                    alt="delete icon"
                    width={"20px"}
                    height={"20px"}
                  />{" "}
                </span>
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
