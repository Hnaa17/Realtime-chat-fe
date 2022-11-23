import axios from "axios";
import Swal from "sweetalert2";

export const register = (data, navigate, setLoading) => async (dispatch) => {
  try {
    const result = await axios.post(
      process.env.REACT_APP_API + "/auth/register",
      data
    );
    const user = result.message;
    dispatch({ type: "REGISTER_SUCCESS", payload: user });
    Swal.fire({
      // position: "top-end",
      position: "center",
      icon: "success",
      title: result.data.message,
      showConfirmButton: true,
    });
    setLoading(false);
    navigate("/login");
  } catch (error) {
    Swal.fire({
      // position: "top-end",
      position: "center",
      icon: "error",
      title: error.response.data.message,
      showConfirmButton: true,
    });
  }
  setLoading(false);
};

export const login = (data, navigate, setLoading) => async (dispacth) => {
  try {
    const result = await axios.post(
      process.env.REACT_APP_API + "/auth/login",
      data
    );
    const user = result.data;
    Swal.fire({
      // position: "top-end",
      position: "center",
      icon: "success",
      title: result.data.message,
      showConfirmButton: true,
    });
    localStorage.setItem("token", result.data.token);
    localStorage.setItem("user", JSON.stringify(result.data.user));
    navigate("/chat");
    dispacth({ type: "LOGIN_SUCCESS", payload: user });
    setLoading(false);
  } catch (error) {
    Swal.fire({
      // position: "top-end",
      position: "center",
      icon: "error",
      title: error.response.data.message,
      showConfirmButton: true,
    });
  }
  setLoading(false);
};

export const getUserById = (idUser) => async (dispatch) => {
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_API}/users/${idUser}`
    );
    const userId = result.data.data[0];
    dispatch({ type: "GET_USER_BY_ID", payload: userId });
  } catch (error) {
    Swal.fire({
      // position: "top-end",
      position: "center",
      icon: "error",
      title: error.response.data.message,
      showConfirmButton: true,
    });
  }
};
