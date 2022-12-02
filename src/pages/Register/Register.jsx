import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './Register.css';
import Back from "../../assets/back.svg"
import { register } from "../../components/config/actions/Users";
import { useDispatch } from "react-redux";


const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(register(form, navigate, setLoading));
  };
  return (
    <>
    <div className="container d-flex h-regis justify-content-center align-items-center">
      <main class="p-lg-5 p-4">
        <Link to={`/login`}>
            <img src={Back} alt="" />
        </Link>
        <h1 className="heading">
          Register
        </h1>
        <div className="line"></div>
      <p className="greeting">
        Let's create your account!
      </p>
      <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name" className="mb-1">Name</label>
        <input
          type="text"
          class="custom-border w-100"
          id="nama"
          placeholder="Name"
          name="name"
          onChange={handleChange}
          required
        />
      </div>
      <div className="mt-3">
        <label htmlFor="email" className="mb-1">Email</label>
        <input
          type="text"
          class="custom-border w-100"
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
          class="custom-border w-100"
          id="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          required
        />
      </div>
      {loading ? (
        <>
        <button
          className="text-white loginButton py-2"
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
            className="text-white loginButton py-2"
            type="submit"
          >
            Register
          </button>
        </>

      )}
      </form>
      </main>
    </div>
    </>
  );
};

export default Register;
