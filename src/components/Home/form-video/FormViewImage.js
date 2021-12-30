import React from "react";
import classes from "./FormViewImage.module.scss";
import { useState, useEffect } from "react";
import addFriendAPI from "../../../api/addFriendAPI";

const FormViewImage = (props) => {
  console.log(props.data?.createdAt);
  function pad2(n) {
    return (n < 10 ? "0" : "") + n;
  }
  var date1 = new Date(props.data?.createdAt);
  var month = pad2(date1.getMonth() + 1);
  var day = pad2(date1.getDate());
  // var year = date.getFullYear();
  var formattedDate = day + "/" + month;
  const [isOpenForm, setIsOpenForm] = useState("");
  const [image, setImage] = useState("");
  const [sender, setSender] = useState(props.data?.sender);
  const [mess, setMess] = useState([]);
  const [date, setDate] = useState(formattedDate);
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (props.isOpenFormViewImage) {
      setIsOpenForm(classes.active);
    } else {
      setIsOpenForm("");
    }
  }, [props.isOpenFormViewImage]);

  const cancelHandler = (e) => {
    e.preventDefault();
    setIsOpenForm("");
    props.onFormFalse(false);
  };

  useEffect(() => {
    setImage(props.data?.text);

    setSender(props.data?.sender);
  }, [props.data?.text]);

  useEffect(() => {
    setMess(props?.messages);
  }, [props?.messages]);

  const changeImageHandler = (event) => {
    setImage(event.currentTarget.attributes["data-id"].value);
    setSender(event.currentTarget.attributes["data-sender"].value);
    setDate(event.currentTarget.attributes["data-date"].value);
  };

  useEffect(() => {
    const fetchGetUser = async () => {
      try {
        const requestGetUser = await addFriendAPI.getUser({
          userID: sender,
        });
        setUser(requestGetUser.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetUser();
  }, [sender]);
  console.log(props.data?.createdAt);
  return (
    <div className={classes.modalFormAddFriend}>
      <div className={` ${classes.backdrop} ${isOpenForm}`}></div>
      <div className={` ${classes.viewFormAddFriend} ${isOpenForm}`}>
        <div className={classes.header}>
          <div className={classes.nameRoom}>
            <p>{props.nameRoom}</p>
          </div>
          <div className={classes.cancel} onClick={cancelHandler}>
            <div className={classes.blur}>
              <i className="bi bi-x"></i>
            </div>
          </div>
        </div>
        <div className={classes.body}>
          <div className={classes.left}>
            <div className={classes.image}>
              <img alt="" src={image} />
            </div>
          </div>
          <div className={classes.right}>
            {[...mess]?.reverse()?.map((data) => {
              function pad2(n) {
                return (n < 10 ? "0" : "") + n;
              }
              var date = new Date(data.createdAt);
              var month = pad2(date.getMonth() + 1);
              var day = pad2(date.getDate());
              var year = date.getFullYear();
              var formattedDate = day + "/" + month;

              return data.type === "img" ? (
                <div
                  className={classes.border_image}
                  data-id={data.text}
                  data-sender={data.sender}
                  data-date={formattedDate}
                  onClick={changeImageHandler}
                >
                  <div className={classes.dateImage}>{formattedDate}</div>
                  <div className={classes.image}>
                    <img src={data.text} alt="" />
                  </div>
                </div>
              ) : (
                ""
              );
            })}
          </div>
        </div>
        <div className={classes.footer}>
          <div className={classes.userSender}>
            <div className={classes.imgSender}>
              <img src={user?.avatar}></img>
            </div>
            <div className={classes.nameSender}>
              <p>{user?.name}</p>
              <span>{date}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormViewImage;
