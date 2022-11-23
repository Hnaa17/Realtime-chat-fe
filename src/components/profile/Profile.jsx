import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Back from "../../assets/back.svg";
import "./profile.css";
import EditBio from "../modals/edit-bio/EditBio";
import EditName from "../modals/edit-name/EditName";
import EditNumber from "../modals/edit-number/EditNumber";
import EditPhoto from "../modals/edit-photo/EditPhoto";
import EditUsername from "../modals/edit-username/EditUsername";
import Swal from "sweetalert2";

const Profile = ({ Rectangle, onMenu, idUser, setEdit }) => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState([]);
    const [show, setShow] = useState(false);
    const getUserById = () => {
        axios
        .get(`${process.env.REACT_APP_API}/users/${idUser}`)
        .then((res) => {
            setProfile(res.data.data[0]);
        })
        .catch((err) => console.log(err));
    };
    useEffect(() => {
        getUserById();
        setShow(false)
        setShow(true)
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("grup");
        localStorage.removeItem("receiver");
        navigate("/login");
    };

    const deleteAccount = async (id) => {
      Swal.fire({
        title: "Are you sure want to delete your account?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#32C33B",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then(async(result) => {
        if (result.isConfirmed) {
          await axios
          .delete(`${process.env.REACT_APP_API}users/${id}`)
          .then(() => {
              Swal.fire("Deleted!", "Your account delete success", "success");
              setShow(false)
              window.location.reload(false);
              navigate("/login");
          })
          .catch(() => {
              Swal.fire("Deleted Failed!", "failed deleted account", "error");
              setShow(false)
          });
      }
      })
    }

    return (
        <>
        <div className="container">
        {/* username */}
        <div className="d-flex mt-3">
          <div onClick={onMenu}>
            <img
              src={Back}
              alt="back"
              style={{ cursor: "pointer" }}
              title="back"
            />
          </div>
          <div className="w-100 text-center">
            <h4 className="textcolor">
              {profile.shortname ? `@${profile.shortname}` : ``}
            </h4>
          </div>
        </div>
        {/* avatar */}
        <div className="d-flex justify-content-center mt-1">
          <div className="ms-3 align-self-end">
            <EditPhoto idUser={idUser} setEdit={setEdit}>
              <div>
                <img
                  src={profile.photo ? `@${profile.photo}` : Rectangle}
                  alt="avatar"
                  width="100px"
                  height="100px"
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                  title="edit photo"
                />
              </div>
            </EditPhoto>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-2">
          <div>
            <div className="d-flex align-items-center gap-2 fullname">
              <EditName name={profile.name} idUser={idUser} setEdit={setEdit}>
                <h4 style={{ cursor: "pointer" }} title="edit name">
                  {profile.name}
                </h4>
              </EditName>
            </div>
            <div className="d-flex justify-content-center">
              <strong className="text-secondary text-center">
                {profile.shortname ? `@${profile.shortname}` : ``}
              </strong>
            </div>
          </div>
        </div>
        {/* account */}
        <h3 className="textcolor">Account</h3>
        <div className="list-account">
          {/* phone */}
          <div className="mt-1">
            <h6 className="text-secondary">Phone Number</h6>
            <h5>{profile.phone}</h5>
            <EditNumber
              phone={profile.phone}
              idUser={idUser}
              setEdit={setEdit}
            >
              <h6
                className="textcolor"
                style={{ cursor: "pointer" }}
                title="edit phone number"
              >
                Change phone number
              </h6>
            </EditNumber>
            <hr />
          </div>
          {/* username */}
          <div className="mt-3">
            <h6 className="text-secondary">Username</h6>
            <h5>{profile.shortname ? `@${profile.shortname}` : ``}</h5>
            <EditUsername
              username={profile.shortname}
              idUser={idUser}
              setEdit={setEdit}
            >
              <h6
                className="textcolor"
                style={{ cursor: "pointer" }}
                title="edit username"
              >
                Change username
              </h6>
            </EditUsername>
            <hr />
          </div>
          {/* bio */}
          <div className="mt-3">
            <h6 className="text-secondary">Bio</h6>
            <h5>{profile.bio}</h5>
            <EditBio bio={profile.bio} idUser={idUser} setEdit={setEdit}>
              <h6
                className="textcolor"
                style={{ cursor: "pointer" }}
                title="edit bio"
              >
                Change bio
              </h6>
            </EditBio>
            <hr />
          </div>
          <div className="d-flex justify-content-center btncolor ">
            <button className="btn text-white" onClick={handleLogout}>
              Logout
            </button>
          </div>
          {/* {profile.map((item) => (
            <div className="d-flex justify-content-end mb-5" key={item.id}>
              <button className="btn btn-danger mt-1" onClick={() => deleteAccount(item.id)}>
                Delete Account
              </button>
            </div>
          ))} */}
        </div>
      </div>
        </>
    )
}

export default Profile;