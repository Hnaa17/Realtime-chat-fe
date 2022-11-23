import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './Login.css';
import { useDispatch } from "react-redux";
import { login } from "../../components/config/actions/Users";

const Login = () => {
  const navigate = useNavigate();
  const dispacth = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispacth(login(data, navigate, setLoading));
  };

  return (
    <>
    <div className="container d-flex h-login justify-content-center align-items-center">
      <main className="p-lg-5 p-4">
        <h1 className="heading">Login</h1>
        <div className="line"></div>
      <p className="greeting">Hi, Welcome back!</p>
      <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email" className="mb-1">Email</label>
        <input
          type="text"
          className="custom-border w-100"
          id="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          required
        />
      </div>
      <div className="mt-3">
        <label htmlFor="password" className="mb-1">Password</label>
        <input
          type="password"
          className="custom-border w-100"
          id="psw"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          required
        />
      </div>
      <div className="posisi">
          <a className="forgotps" href='/forgot-password'>
              Forgot password?
          </a>
      </div>
      {loading ? ( 
        <>
          <button
            className="text-white loginButton p-2"
            type="submit"
          >
            <span
              className="spinner-border text-light spinner-border-sm"
              role="status"
              aria-hidden="true"
            />
          </button>
        </>
      ) : (
        <>
        <button
          className="text-white loginButton p-2"
          type="submit"
        >
          Login
        </button>
        </>
      )}
      <p className="text-center mt-4 text-black">
       Don't have an account?{" "}
       <Link to={`/register`} className="text-link">
       Sign Up
       </Link>
      </p>
      </form>
      </main>
    </div>
    </>
  );
};

export default Login;
