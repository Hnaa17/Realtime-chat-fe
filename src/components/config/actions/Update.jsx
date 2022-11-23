import axios from "axios";
import Swal from "sweetalert2";

export const editName =
  (idUser, data, setEdit, handleClose, setLoading) => async (dispatch) => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_API}/users/edit-name/${idUser}`,
        data
      );
      const nameUpdate = result.data.data;
      dispatch({ type: "UPDATE_NAME_SUCCESS", payload: nameUpdate });
      setEdit(false);
      handleClose();
      Swal.fire({
        // position: "top-end",
        position: "center",
        icon: "success",
        title: result.data.message,
        text: "You can check profile again",
        showConfirmButton: true,
      });
      window.location.reload(false);
      setLoading(false);
    } catch (error) {
      Swal.fire({
        // position: "top-end",
        position: "center",
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: true,
      });
      setLoading(false);
    }
  };

export const editNumber =
  (idUser, number, setEdit, handleClose, setLoading) => async (dispatch) => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_API}/users/edit-phone/${idUser}`,
        number
      );
      const numberUpdate = result.data.data;
      dispatch({ type: "UPDATE_NUMBER_SUCCESS", payload: numberUpdate });
      setEdit(false);
      handleClose();
      Swal.fire({
        // position: "top-end",
        position: "center",
        icon: "success",
        title: result.data.message,
        text: "You can check profile again",
        showConfirmButton: true,
      });
      window.location.reload(false);
      setLoading(false);
    } catch (error) {
      Swal.fire({
        // position: "top-end",
        position: "center",
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: true,
      });
      setLoading(false);
    }
  };

export const editPhoto =
  (idUser, formData, setEdit, handleClose, setLoading) => async (dispatch) => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_API}/users/edit/${idUser}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const updatePhoto = result.data.data;
      dispatch({ type: "UPDATE_PHOTO_SUCCESS", payload: updatePhoto });
      handleClose();
      setEdit(false);
      Swal.fire({
        // position: "top-end",
        position: "center",
        icon: "success",
        title: result.data.message,
        text: "You can check profile again",
        showConfirmButton: true,
      });
      window.location.reload(false);
      setLoading(false);
    } catch (error) {
      Swal.fire({
        // position: "top-end",
        position: "center",
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: true,
      });
      setLoading(false);
    }
  };

export const editUserName =
  (idUser, data, setEdit, handleClose, setLoading) => async (dispatch) => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_API}/users/edit-shortname/${idUser}`,
        data
      );
      const updateUsername = result.data.data;
      dispatch({ type: "UPDATE_USERNAME_SUCCESS", payload: updateUsername });
      handleClose();
      setEdit(false);
      Swal.fire({
        // position: "top-end",
        position: "center",
        icon: "success",
        title: result.data.message,
        text: "You can check profile again",
        showConfirmButton: true,
      });
      window.location.reload(false);
      setLoading(false);
    } catch (error) {
      Swal.fire({
        // position: "top-end",
        position: "center",
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: true,
      });
      setLoading(false);
    }
  };

export const editBio =
  (idUser, data, setEdit, handleClose, setLoading) => async (dispatch) => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_API}/users/edit-bio/${idUser}`,
        data
      );
      const updateBio = result.data.data;
      dispatch({ type: "UPDATE_BIO_SUCCESS", payload: updateBio });
      handleClose();
      setEdit(false);
      Swal.fire({
        // position: "top-end",
        position: "center",
        icon: "success",
        title: result.data.message,
        text: "You can check profile again",
        showConfirmButton: true,
      });
      window.location.reload(false);
      setLoading(false);
    } catch (error) {
      Swal.fire({
        // position: "top-end",
        position: "center",
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: true,
      });
      setLoading(false);
    }
  };
