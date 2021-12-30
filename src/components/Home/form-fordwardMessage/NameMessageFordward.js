import classes from "./formFordWardMessage.module.scss";
import { useState } from "react";
import React, { Fragment, useEffect } from "react";
import addFriendAPI from "../../../api/addFriendAPI";
import messageAPI from "../../../api/messageAPI";

const NameMessageFordward = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (props.data.users.length > 2) {
      setUser(props.data);
      const fetchGetUser = async () => {
        try {
          setUser(props.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchGetUser();
    } else {
      const nameMessUserId = props.data.users.find((m) => m !== props.idLogin);
      const fetchGetUser = async () => {
        try {
          const requestGetUser = await addFriendAPI.getUser({
            userID: nameMessUserId,
          });
          setUser(requestGetUser.data.users);
        } catch (error) {
          console.log(error);
        }
      };
      fetchGetUser();
    }
  }, [props.data]);

  const SendMessageHandler = async (e) => {
    e.preventDefault();
    let newMessage;
    if (props.onSendTypeFromChat === "text") {
      newMessage = {
        sender: props.idLogin,
        type: "text",
        text: props.onSendTextFromFFWM,
        active: true,
        RoomId: props.data?._id,
      };
    } else if (props.onSendTypeFromChat === "img") {
      newMessage = {
        sender: props.idLogin,
        text: props.onSendTextFromFFWM,
        RoomId: props.data?._id,
        type: "img",
      };
    } else if (props.onSendTypeFromChat === "video") {
      newMessage = {
        sender: props.idLogin,
        text: props.onSendTextFromFFWM,
        RoomId: props.data?._id,
        type: "video",
      };
    } else {
      newMessage = {
        sender: props.idLogin,
        text: props.onSendTextFromFFWM,
        RoomId: props.data?._id,
        type: "file",
        nameFile: props.onSendNameFileFromChat,
      };
    }

    const fetchAddMessage = async () => {
      try {
        const res = await messageAPI.AddMessage({
          message: newMessage,
        });
        //setMessages([...messages, res.data]);
       
      } catch (error) {
        // console.log(error);
      }
    };
    fetchAddMessage();
  };
  return (
    <div className={classes.user}>
      <div className={classes.left}>
        <div className={classes.avatar}>
          <img src={user?.avatar} alt="" />
        </div>
        <p>{user?.name}</p>
      </div>
      <div className={classes.right}>
        <button onClick={SendMessageHandler}>Chia sẻ</button>
      </div>
    </div>
  );
};

export default NameMessageFordward;
