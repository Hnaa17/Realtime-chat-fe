import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import jwtDecode from "jwt-decode";
import Rectangle from "../../assets/default-photo.jpg";
import Menu from "../../assets/Menu.svg";
import Plus from "../../assets/Plus.svg";
import "./Chat.css";
import Pesan from "../../components/list-chats/Pesan";
import Friends from "../../components/list-friends/Friends";
import Profile from "../../components/profile/Profile";
import Room from "../Room";
import SelectChat from "../../components/select-chat/SelectChat";

const ChatList = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const idUser = decoded.id;
  const [edit, setEdit] = useState(false);
  const [chat, setChat] = useState(false);
  const [friend, setFriend] = useState({});
  const [message, setMessage] = useState("");
  const [listChat, setListChat] = useState([]);
  const [socketio, setSocketIo] = useState(null);
  const [group, setGroup] = useState({});
  const [chatGroup, setChatGroup] = useState(false);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_API);
    socket.on("new-message", (data) => {
      setListChat((current) => [...current, data]);
    });
    setSocketIo(socket);
  }, []);

  useEffect(() => {
    if (socketio) {
      // socketio.off("newMessage");
      socketio.on("response-grup", (data) => {
        console.log(data);
        setListChat((current) => [...current, data]);
      });
      socketio.on("notifAdmin", (data) => {
        setListChat((current) => [...current, data]);
      });
    }
  }, [socketio]);

  const editProfile = () => {
    setEdit(true);
  };
  const onMenu = () => {
    setEdit(false);
  };
  const onChat = (e) => {
    const profil = JSON.parse(localStorage.getItem("user"));
    setListChat([]);
    setFriend(e);
    setChat(true);
    setChatGroup(false);
    localStorage.setItem("receiver", JSON.stringify(e));
    const data = {
      user: profil.id,
    };
    socketio.emit("join-room", data);
  };

  const onSubmitMessage = (e) => {
    e.preventDefault();
    const receiver = JSON.parse(localStorage.getItem("receiver"));
    let payload = {
      sender: user.id,
      senderName: user.name,
      receiver: receiver.id,
      receiverName: receiver.name,
      message,
    };
    setListChat([...listChat, payload]);
    if (message !== "") {
      const data = {
        sender: user.id,
        receiver: receiver.id,
        message,
      };
      socketio.emit("send-message", data);
    }
    setMessage("");
  };

  const onGrup = (item) => {
    const profil = JSON.parse(localStorage.getItem("user"));
    const group = JSON.parse(localStorage.getItem("grup"));
    setListChat([]);
    setChat(true);
    setChatGroup(true);
    setGroup(item);
    localStorage.setItem("grup", JSON.stringify(item));
    const data = {
      room: group.name_grup,
      username: profil.name,
    };
    socketio.emit("inisialRoom", data);
  };

  const handleGroupMessage = (e) => {
    e.preventDefault();
    const profil = JSON.parse(localStorage.getItem("user"));
    const group = JSON.parse(localStorage.getItem("grup"));
    let payload = {
      sender: user.id,
      senderName: user.name,
      message,
    };
    setListChat([...listChat, payload]);
    if (message) {
      let dataMessage = {
        sender: profil.name,
        photo: profil.photo,
        message: message,
        room: group,
      };
      socketio.emit("grup-message", dataMessage);
    }

    setMessage("");
  };

    return (
        <>
        <div className="content">
        <div className="row h-100">
          {/* person */}
          <div className="col-lg-4">
            {edit ? (
              <Profile
                Rectangle={Rectangle}
                onMenu={onMenu}
                idUser={idUser}
                setEdit={setEdit}
              />
             ) : (
              <Friends
                Menu={Menu}
                Plus={Plus}
                Rectangle={Rectangle}
                editProfile={editProfile}
                onChat={onChat}
                idUser={idUser}
                onGrup={onGrup}
              />
            )}
          </div>
          {/* chat */}
          <div className="col-lg-8 d-flex flex-column justify-content-between">
            {chat ? (
              chatGroup ? (
                < Room 
                group={group}
                Rectangle={Rectangle}
                setMessage={setMessage}
                listChat={listChat}
                user={user}
                message={message}
                handleGroupMessage={handleGroupMessage}
            />
              ) : (
                <Pesan
                  Rectangle={Rectangle}
                  friend={friend}
                  onSubmitMessage={onSubmitMessage}
                  setMessage={setMessage}
                  listChat={listChat}
                  user={user}
                  message={message}
                />
              )
            ) : (
              <SelectChat />
            )}
          </div>
        </div>
      </div>
        </>
    )
}

export default ChatList;