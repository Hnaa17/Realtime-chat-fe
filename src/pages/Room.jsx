import "./ChatRoom.module.css"
import React, { useEffect, useState } from "react";
import MessageReceived from "../components/messages/MessageReceived";
import MessageSender from "../components/messages/MessageSender";
import moment from "moment";

const Room = ({
  group,
  Rectangle,
  handleGroupMessage,
  setMessage,
  listChat,
  user,
  message,
}) => {
    return (
      <>
        <div className="friend-chat p-1">
        <div className="d-flex">
          <div>
            <img
              src={group.photo ? group.photo : Rectangle}
              width="70px"
              height="70px"
              style={{ borderRadius: "10px" }}
              alt="avatar"
            />
          </div>
          <div className="mt-2">
            <strong>{group.name_grup}</strong>
            <p>online</p>
          </div>

          </div>
        </div>

          {/* chats */}
      <div className="list-chats">
        {listChat.map((item, index) => (
          <div key={index}>
            <div>
              {item.sender === user.id ? (
                <MessageSender
                  date={moment(item.created_at).format("LT")}
                  message={item.message}
                />
              ) : (
                <>
                  <MessageReceived
                    date={moment(item.created_at).format("LT")}
                    sender={item.sender}
                    message={item.message}
                    img={item.photo ? item.photo : Rectangle}
                  />
                </>
              )}
            </div>
          </div>
        ))}
      </div>

          <form onSubmit={handleGroupMessage} className="d-flex mb-4 input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Type message here"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                className="btn btn-primary"
                type="submit"
              >
                Send
              </button>
          </form>
      </>
    );
  };
  
  export default Room;