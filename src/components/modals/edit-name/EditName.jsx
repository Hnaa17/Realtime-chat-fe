import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { editName } from "../../config/actions/Update";

function EditName({ children, name, idUser, setEdit }) {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        name: "",
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        setData({
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = () => {
        setLoading(true);
        dispatch(editName(idUser, data, setEdit, handleClose, setLoading));
    };

    return (
        <>
        <h6 onClick={handleShow}>{children}</h6>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Name</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input
                type="text"
                className="form-control"
                name="name"
                defaultValue={name}
                onChange={handleChange}
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

export default EditName;