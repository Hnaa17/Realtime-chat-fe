import React from "react";
import Back from "../../assets/back.svg";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditBio from "../modals/edit-bio/EditBio";
import EditName from "../modals/edit-name/EditName";
import EditNumber from "../modals/edit-number/EditNumber";
import EditPhoto from "../modals/edit-photo/EditPhoto";
import EditUsername from "../modals/edit-username/EditUsername";
import "./chat.css";

const Profile = ({ 
    Rectangle, 
    onMenu, 
    idUser, 
    setEdit,
 }) => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState([]);
    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_API}/users/${idUser}`)
        .then((res) => {
            setProfile(res.data.data[0]);
        })
        .catch((err) => console.log(err));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("grup");
        localStorage.removeItem("receiver");
        navigate("/login");
    };

    return (
        <>
              <div class="container">
        <div class="d-flex mt-3">
          <div onClick={onMenu}>
            <img src={Back} alt="back" title="back" />
          </div>
          <div class="w-100 text-center">
            <h4 class="textcolor">
              {profile.shortname ? `@${profile.shortname}` : ``}
            </h4>
          </div>
        </div>
        <div class="text-center mt-3">
          <EditPhoto idUser={idUser} setEdit={setEdit}>
            <img
              src={profile.photo ? profile.photo : Rectangle}
              alt="avatar"
              width="100px"
              height="100px"
              style={{ borderRadius: "50%" }}
            />
          </EditPhoto>
        </div>
        <div class="mt-3 text-center">
          <EditName name={profile.name} idUser={idUser} setEdit={setEdit}>
            <h4>{profile.name}</h4>
          </EditName>
          <h6 class="text-secondary">
            {profile.shortname ? `@${profile.shortname}` : ``}
          </h6>
        </div>
        <h2 class="mt-4 textcolor">Account</h2>
      </div>

      <div class="container mt-3">
        <div>
          <h5>{profile.phone}</h5>
          <EditNumber phone={profile.phone} idUser={idUser} setEdit={setEdit}>
            <h6 class="textcolor">change Phone Number</h6>
          </EditNumber>
          <hr />
        </div>
        <div>
          <h5>{profile.shortname ? `@${profile.shortname}` : ``}</h5>
          <EditUsername
            idUser={idUser}
            username={profile.shortname}
            setEdit={setEdit}
          >
            <h6 class="textcolor">change username</h6>
          </EditUsername>
          <hr />
        </div>
        <div>
          <h5>{profile.bio}</h5>
          <EditBio bio={profile.bio} idUser={idUser} setEdit={setEdit}>
            <h6 class="textcolor">change bio</h6>
          </EditBio>
          <hr />
        </div>
        <div class="d-flex justify-content-center mb-3 btncolor">
          <button class="btn text-white" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
        </>
    );
};

export default Profile;