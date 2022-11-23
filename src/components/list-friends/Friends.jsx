import axios from "axios";
import React, {useEffect, useState} from "react";
import Logo from "../../assets/logo.png"
import AddGroup from "../modals/add-grup/AddGroup";
import "../profile/profile.css";

const Friends = ({
    Menu,
    Plus,
    Rectangle,
    editProfile,
    onChat,
    idUser,
    onGrup,
}) => {
    const [grup, setGrup] = useState(false);
    const [listGroup, setListGroup] = useState([]);
    const [listFriends, setListFriend] = useState([]);
    const [searchFriend, setSearchFriend] = useState("");
    const [searchGroup, setSearchGroup] = useState("");
    const getUser = () => {
        axios
        .get(`${process.env.REACT_APP_API}/users?search=${searchFriend}`)
        .then((res) => setListFriend(res.data.data))
        .catch((err) => console.log(err));
    };

    const getGroup = () => {
        axios
        .get(`${process.env.REACT_APP_API}/group?key=${searchGroup}`)
        .then((res) => setListGroup(res.data.data))
        .catch((err) => console.log(err));
    };

    useEffect(() => {
        getUser();
        getGroup();
    }, [searchFriend, searchGroup]);

    return (
        <>
        <div className="container">
        <div className="d-flex justify-content-between mt-3 align-items-center">
          <div className="d-flex gap-2 align-items-center">
            <div>
              <img src={Logo} alt="logo" width="30px" height="30px" />
            </div>
            <h3 className="textcolor">Telegram</h3>
          </div>
          <div
            onClick={editProfile}
            style={{ cursor: "pointer" }}
            title="edit profile"
          >
            <img src={Menu} alt="menu" />
          </div>
        </div>

        {/* search */}
        <div className="mt-4 d-flex justify-content-between">
          {grup ? (
            <input
              type="text"
              placeholder="Search group"
              className="form-control w-75 align-items-center"
              onChange={(e) => setSearchGroup(e.target.value)}
            />
          ) : (
            <input
              type="text"
              placeholder="Search friends"
              className="form-control w-75 align-items-center"
              onChange={(e) => setSearchFriend(e.target.value)}
            />
          )}
          <div>
            <AddGroup>
              <img
                src={Plus}
                alt="plus"
                style={{ cursor: "pointer" }}
                title="add group"
              />
            </AddGroup>
          </div>
        </div>
        <div className="d-flex justify-content-evenly gap-3 mt-4">
          <button
            className="btn btn-primary w-100"
            onClick={() => setGrup(true)}
          >
            Grup
          </button>
          <button
            className="btn btn-secondary w-100"
            onClick={() => setGrup(false)}
          >
            friends
          </button>
        </div>
        {grup ? (
          <>
            {/* grup */}
            <h5 className="my-3 text-secondary">Group</h5>
            {listGroup.map((item, index) => (
              <>
                <div
                  className="d-flex justify-content-between align-items-center"
                  onClick={() => onGrup(item)}
                  key={index}
                >
                  <div>
                    <img
                      src={item.photo ? item.photo : Rectangle}
                      width="50px"
                      height="50px"
                      style={{ borderRadius: "10px" }}
                      alt="avatar"
                    />
                  </div>
                  <div className="d-flex align-items-center w-100">
                    <div className="ms-4">
                      <h4>{item.name_grup}</h4>
                    </div>
                  </div>
                </div>
                <hr />
              </>
            ))}
          </>
        ) : (
          <>
            {/* list friends */}
            <div className="list-friends mt-3">
              {listFriends.map((e, i) => {
                if (idUser !== e.id) {
                  return (
                    <>
                      <div
                        className="d-flex justify-content-between align-items-center mt-2"
                        onClick={() => onChat(e)}
                        key={i}
                      >
                        <div>
                          <img
                            src={e.photo ? e.photo : Rectangle}
                            width="50px"
                            height="50px"
                            style={{ borderRadius: "10px" }}
                            alt="avatar"
                          />
                        </div>
                        <div className="d-flex align-items-center w-100">
                          <div className="ms-4">
                            <h4>{e.name}</h4>
                          </div>
                        </div>
                      </div>
                      <hr />
                    </>
                  );
                }
              })}
            </div>
          </>
        )}
      </div>
        </>
    );
};

export default Friends;