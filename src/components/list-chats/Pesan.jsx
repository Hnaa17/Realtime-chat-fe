import React from "react";
import moment from "moment";
import MessageReceived from "../messages/MessageReceived";
import MessageSender from "../messages/MessageSender";
import "../../pages/ChatRoom.module.css"

const Pesan = ({
    Rectangle,
    friend,
    onSubmitMessage,
    setMessage,
    listChat,
    user,
    message,
}) => {
    return (
    <>
      {/* firend */}
      <div className="friend-chat p-2">
        <div className="d-flex gap-3">

          <div>
            <img
              src={friend.photo ? friend.photo : Rectangle}
              width="70px"
              height="70px"
              style={{ borderRadius: "10px" }}
              alt="avatar"
            />
          </div>

          <div className="mt-2">
            <strong>{friend.name}</strong>
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
                    message={item.message}
                    img={friend.photo ? friend.photo : Rectangle}
                  />
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={onSubmitMessage}>
        <div className="d-flex mb-4 input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Type message here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            Send
          </button>
        </div>
      </form>
        </>
    );
};

export default Pesan;