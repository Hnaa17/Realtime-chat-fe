import axios from "axios";
import Swal from "sweetalert2";

export const addGroup = (data, handleClose, setLoading) => async (dispatch) => {
  try {
    const result = await axios.post(
      `${process.env.REACT_APP_API}group/create`,
      data
    );
    const newGroup = result.data.data;
    dispatch({ type: "SUCCESS_ADD_GROUP", payload: newGroup });
    Swal.fire({
      // position: "top-end",
      position: "center",
      icon: "success",
      title: result.data.message,
      showConfirmButton: true,
    });
    window.location.reload(false);
    setLoading(false);
    handleClose();
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
