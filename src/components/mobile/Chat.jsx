import React from "react";
import moment from "moment";
import Rectangle from "../../assets/default-photo.jpg";
import Back from "../../assets/back.svg";
import "./chat.css";
import MessageReceived from "../messages/MessageReceived";
import MessageSender from "../messages/MessageSender";

const Chat = ({
    chatGroup,
    grup,
    listChat,
    user,
    friend,
    onSubmitMessage,
    message,
    setMessage,
    onSetFriend,
    handleGroupMessage,
}) => {
    return (
        <>
        {chatGroup ? ( 
            <>
            <div>
            <div class="container header-friend fixed-top d-flex justify-content-between align-items-center">
              <div class="d-flex gap-3 py-2">
                <div>
                  <img
                    src={grup.photo ? grup.photo : Rectangle}
                    alt="avatar"
                    width="50px"
                    height="50px"
                    style={{ borderRadius: "50%" }}
                  />
                </div>
                <div>
                  <h5>{grup.name_grup}</h5>
                  <small>online</small>
                </div>
              </div>
              <div onClick={onSetFriend}>
                <img src={Back} alt="back" />
              </div>
            </div>

            <div class="container chat-content">
              <div class="chatlis">
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
            </div>
            <form onSubmit={handleGroupMessage}>
              <div class="container mb-3 input-group">
                <input
                  type="text"
                  placeholder="Type message here"
                  class="form-control"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button class="btn btn-primary">Send</button>
              </div>
            </form>
          </div>
            </>
        ) : (
            <>
            <div>
            <div class="container header-friend fixed-top d-flex justify-content-between align-items-center">
              <div class="d-flex gap-3 py-2">
                <div>
                  <img
                    src={friend.photo ? friend.photo : Rectangle}
                    alt="avatar"
                    width="50px"
                    height="50px"
                    style={{ borderRadius: "50%" }}
                  />
                </div>
                <div>
                  <h5>{friend.name}</h5>
                  <small>online</small>
                </div>
              </div>
              <div onClick={onSetFriend}>
                <img src={Back} alt="back" />
              </div>
            </div>

            <div class="container chat-content">
              <div class="chatlis">
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
                            message={item.message}
                            img={friend.photo ? friend.photo : Rectangle}
                          />
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <form onSubmit={onSubmitMessage}>
              <div class="container input-group mb-3">
                <input
                  type="text"
                  placeholder="Type message here"
                  class="form-control"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button class="btn btn-primary">Send</button>
              </div>
            </form>
          </div>
            </>
        )}
        </>
    );
};

export default Chat;