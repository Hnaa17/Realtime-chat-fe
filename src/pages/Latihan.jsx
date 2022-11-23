import { io } from "socket.io-client";

import React, {useEffect } from 'react'
import { useState } from "react";

const Latihan = () => {
    const [message, setMessage] = useState("");
    const [id, setId] = useState("");
    const [user,setUser] = useState('');
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
  
    useEffect(() => {
      const resultSocket = io("http://localhost:4000");
      setSocket(resultSocket);
      resultSocket.on("messageBE", (data) => {
        setMessages((current) => [...current, data]);
      });
    }, []);
  
    const handleSendMessagePrivate = () => {
      console.log(message);
      console.log(id);
      socket.emit('messagePrivate', {message,id,user})
      setMessage("");
    };
  
    const handleSendMessageAll = () => {
      console.log(message);
      console.log(id);
      socket.emit('messageAll', {message,user})
      setMessage("");
    };
    
  const handleSocketId =()=>{
    alert(socket.id);
  }
  const enabled = id.length > 0 ;
    return (
      <>
        <input
          value={user}
          type="text"
          placeholder="User Name"
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          value={message}
          type="text"
          placeholder="Input Message"
          onChange={(e) => setMessage(e.target.value)}
        />
        <input
          value={id}
          type="text"
          placeholder="Input ID"
          onChange={(e) => setId(e.target.value)}
        />
        <button onClick={handleSendMessageAll} disabled={enabled}>send message all</button>
        <button onClick={handleSendMessagePrivate} disabled={!enabled}>send message to</button>
        <button onClick={handleSocketId}>show id</button>
        <br />
        <ul>
          {messages.map((item, index) => (
            <li key={index}>
              {item.user} : {item.message} - {item.date}
            </li>
          ))}
        </ul>
      </>
    );
}

export default Latihan