import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import AddGroup from "../modals/add-grup/AddGroup";
import Chat from "./Chat";
import "./chat.css";

const Friends = ({
  Logo,
  Menu,
  Plus,
  Rectangle,
  editProfile,
  idUser,
  onChat,
  listChat,
  onSubmitMessage,
  user,
  message,
  setMessage,
  handleGroupMessage,
  onGrup,
  chatGroup,
  grup,
}) => {
  const friend = JSON.parse(localStorage.getItem("receiver"));
  const [chat, setChat] = useState(false);
  const [groups, setGroups] = useState(false);
  const [listFriends, setListFriend] = useState([]);
  const [searchFriend, setSearchFriend] = useState("");
  const [searchGroup, setSearchGroup] = useState("");
  const [group, setGroup] = useState([]);
  const getUser = () => {
    axios
      .get(`${process.env.REACT_APP_API}users?search=${searchFriend}`)
      .then((res) => setListFriend(res.data.data))
      .catch((err) => console.log(err));
  };

  const getGroup = () => {
    axios
      .get(`${process.env.REACT_APP_API}group?key=${searchGroup}`)
      .then((res) => setGroup(res.data.data))
      .catch((err) => console.log(err));
  };

  const onSetChat = (item) => {
    if (groups) {
      onGrup(item);
      setChat(true);
    } else {
      onChat(item);
      setChat(true);
    }
  };

  const onSetFriend = () => {
    setChat(false);
  };

  const onSetGroup = () => {
    setGroups(true);
  };

  const onFriend = () => {
    setGroups(false);
  };

  useEffect(() => {
    getUser();
    getGroup();
  }, [searchFriend, searchGroup]);

  return (
    <>
    {chat ? (
      <Chat 
        chatGroup={chatGroup}
        grup={grup}
        listChat={listChat}
        user={user}
        friend={friend}
        onSubmitMessage={onSubmitMessage}
        message={message}
        setMessage={setMessage}
        onSetFriend={onSetFriend}
        handleGroupMessage={handleGroupMessage}
      />
    ) : (
      <>
      <div className="container fixed-top">
            <div className="d-flex justify-content-between my-3">
              <div className="d-flex gap-2">
                <div>
                  <img src={Logo} alt="logo" width="30px" height="30px" />
                </div>
                <h3 className="textcolor">Telegram</h3>
              </div>
              <div onClick={editProfile}>
                <img src={Menu} alt="menu" title="profile" />
              </div>
            </div>
            <div className="d-flex justify-content-between gap-5 mt-3">
              {groups ? (
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search groups"
                  value={searchGroup}
                  onChange={(e) => setSearchGroup(e.target.value)}
                />
              ) : (
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search friends"
                  value={searchFriend}
                  onChange={(e) => setSearchFriend(e.target.value)}
                />
              )}
              <div>
                <AddGroup>
                  <img src={Plus} alt="plus" title="add group" />
                </AddGroup>
              </div>
            </div>
            <div className="d-flex gap-3 my-3">
              <button className="btn btn-primary w-100" onClick={onSetGroup}>
                Group
              </button>
              <button className="btn btn-secondary w-100" onClick={onFriend}>
                Friends
              </button>
            </div>
          </div>

          {/* list friend */}
          <div className="container listfriends">
            {groups ? (
              <>
                {group.map((item, index) => (
                  <div key={index}>
                    <div
                      className="d-flex mt-3 gap-3"
                      onClick={() => onSetChat(item)}
                    >
                      <div className="mt-2">
                        <img
                          src={item.photo ? item.photo : Rectangle}
                          alt="avatar"
                          width="50px"
                          height="50px"
                          style={{ borderRadius: "10px" }}
                        />
                      </div>
                      <h4 className="mt-3">{item.name_grup}</h4>
                    </div>
                    <hr />
                  </div>
                ))}
              </>
            ) : (
              <>
                {listFriends.map((item, index) => {
                  if (idUser !== item.id)
                    return (
                      <div key={index}>
                        <div
                          className="d-flex mt-3 gap-3"
                          onClick={() => onSetChat(item)}
                        >
                          <div className="mt-2">
                            <img
                              src={item.photo ? item.photo : Rectangle}
                              alt="avatar"
                              width="50px"
                              height="50px"
                              style={{ borderRadius: "10px" }}
                            />
                          </div>
                          <h4 className="mt-3">{item.name}</h4>
                        </div>
                        <hr />
                      </div>
                    );
                })}
              </>
            )}
          </div>
      </>
    )}
    </>
  );
};

export default Friends;