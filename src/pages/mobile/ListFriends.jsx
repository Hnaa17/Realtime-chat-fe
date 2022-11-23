import React from "react";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { io } from "socket.io-client";
import Rectangle from "../../assets/default-photo.jpg";
import Logo from "../../assets/logo.png";
import Menu from "../../assets/Menu.svg";
import Plus from "../../assets/Plus.svg";
import "./mobile.css";
import Profile from "../../components/mobile/Profile";
import Friends from "../../components/mobile/Friends";

const ListFriends = () => {
    const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const idUser = decoded.id;
  const [edit, setEdit] = useState(false);
  const [socketio, setSocketIo] = useState(null);
  const [listChat, setListChat] = useState([]);
  const [friend, setFriend] = useState({});
  const [message, setMessage] = useState("");
  const [grup, setGrup] = useState({});
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
    localStorage.setItem("receiver", JSON.stringify(e));
    setListChat([]);
    setFriend(e);
    setChatGroup(false);
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
    setGrup(item);
    setChatGroup(true);
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
    {edit ? (
        <Profile 
            Rectangle={Rectangle}
            onMenu={onMenu}
            idUser={idUser}
            setEdit={setEdit}
        />
    ) : (
        <Friends 
            Logo={Logo}
            Plus={Plus}
            Rectangle={Rectangle}
            Menu={Menu}
            editProfile={editProfile}
            idUser={idUser}
            onChat={onChat}
            listChat={listChat}
            onSubmitMessage={onSubmitMessage}
            user={user}
            message={message}
            setMessage={setMessage}
            onGrup={onGrup}
            handleGroupMessage={handleGroupMessage}
            chatGroup={chatGroup}
            grup={grup}
        />
    )}
    </>
  );
};

export default ListFriends;