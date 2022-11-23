import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { editPhoto } from "../../config/actions/Update";

function EditPhoto({ children, idUser, setEdit }) {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [saveImage, setSaveImage] = useState(null);

    function handleUpload(e) {
      const uploader = e.target.files[0];
      setSaveImage(uploader);
    }
    
    const formData = new FormData();
    formData.append("photo", saveImage);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const handleSubmit = () => {
      setLoading(true);
      dispatch(editPhoto(idUser, formData, setEdit, handleClose, setLoading));
    };
  
    return (
      <>
        <h6 onClick={handleShow}>{children}</h6>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{children}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="file"
              className="form-control"
              name="photo"
              onChange={handleUpload}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {loading ? (
              <div className="w-25 text-center">
                <Button variant="primary w-100" onClick={handleSubmit}>
                  <span
                    className="spinner-border text-light spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  />
                </Button>
              </div>
            ) : (
              <div className="w-25 text-center">
                <Button variant="primary w-100" onClick={handleSubmit}>
                  Save
                </Button>
              </div>
            )}
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
  export default EditPhoto;