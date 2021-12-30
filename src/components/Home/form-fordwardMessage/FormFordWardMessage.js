import React, { Fragment } from "react";
import classes from "./formFordWardMessage.module.scss";
import { useState, useEffect } from "react";
import tung from "../../../assets/tung.jpg";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FileIcon, defaultStyles } from "react-file-icon";
import roomAPI from "../../../api/roomAPI";
import NameMessageFordward from "./NameMessageFordward";

toast.configure();
const FormFordWardMessage = (props) => {
  const dispatch = useDispatch();
  const [isOpenForm, setIsOpenForm] = useState("");
  const [isAddFocus, setIsAddFocus] = useState(false);
  const loggedInUser = useSelector((state) => state.user.current);
  const idLogin = loggedInUser._id;
  const [arrayMess, setArrayMess] = useState([]);
  useEffect(() => {
    if (props.onSendIsFormFordWardMess) {
      setIsOpenForm(classes.active);
    } else {
      setIsOpenForm("");
    }
  }, [props.onSendIsFormFordWardMess]);
  const onCancelHandler = (e) => {
    e.preventDefault();
    props.onFormFalse(false);
  };
  const onFocusAddHandler = () => {
    setIsAddFocus(true);
  };

  const findNameRoomHandler = (event) => {
    event.preventDefault();
    var array = [];
    const fetchRoomByNameFriend = async () => {
      try {
        const roomByNameFriend = await roomAPI.getRoomByNameFriend({
          name: event.target.value,
        });

        if (roomByNameFriend.status === 200) {
          array.push(...roomByNameFriend.data);
          const fetchRoomByName = async () => {
            try {
              const getRoombyName = await roomAPI.getRoomByNameRoom({
                name: event.target.value,
              });

              if (getRoombyName.status === 200) {
                array.push(...getRoombyName.data);
                setArrayMess(array);
              }
            } catch (error) {
              console.log(error);
            }
          };
          fetchRoomByName();
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRoomByNameFriend();
  };
  const uploadFile = props.onSendTextFromChat?.split(".");
  const filesTypes = uploadFile[uploadFile?.length - 1];
  return (
    <div className={classes.modalFormAddGroup}>
      <div className={`${classes.backdrop} ${isOpenForm}`}></div>
      <div className={`${classes.viewFormAddGroup} ${isOpenForm}`}>
        <div className={classes.header}>
          <h2>Chia sẻ</h2>
          <div className={classes.cancel} onClick={onCancelHandler}>
            <div className={classes.blur}>
              <i className="bi bi-x"></i>
            </div>
          </div>
        </div>
        <div className={classes.body}>
          <div className={classes.form}>
            <div className={classes.addFriend}>
              <div className={classes.search}>
                <i
                  className={`${"fas fa-search"} ${
                    isAddFocus ? classes.active : ""
                  }`}
                ></i>
                <input
                  className={`${isAddFocus ? classes.active : ""}`}
                  type="text"
                  placeholder="Tìm kiếm hội thoại cần chia sẻ"
                  onClick={onFocusAddHandler}
                  onChange={findNameRoomHandler}
                />
              </div>
            </div>
            <div className={classes.result}>
              <div className={`${classes.friends}`}>
                <h4>Bạn bè</h4>
                {/* {resultUser && ( */}
                {arrayMess.map((data) => {
                  return (
                    <NameMessageFordward
                      data={data}
                      idLogin={idLogin}
                      onSendTextFromFFWM={props.onSendTextFromChat}
                      onSendTypeFromChat={props.onSendTypeFromChat}
                      onSendNameFileFromChat={props.onSendNameFileFromChat}
                    />
                  );
                })}
              </div>
            </div>
            <div className={classes.contentFordWard}>
              <p className={classes.titleContent}>Nội dung chia sẻ</p>
              <div className={classes.content}>
                {props.onSendTypeFromChat === "img" ? (
                  <Fragment>
                    <img
                      className={classes.messageImage}
                      alt=""
                      src={props.onSendTextFromChat}
                    ></img>{" "}
                    <span>Hình ảnh</span>
                  </Fragment>
                ) : props.onSendTypeFromChat === "text" ? (
                  <p>{props.onSendTextFromChat}</p>
                ) : props.onSendTypeFromChat === "video" ? (
                  <Fragment>
                    <video
                      controls
                      className={classes.messageVideo}
                      alt=""
                      src={props.onSendTextFromChat}
                    >
                      <source src={props.onSendTextFromChat} />
                    </video>
                    <span>Video</span>
                  </Fragment>
                ) : props.onSendTypeFromChat === "file" ? (
                  <div className={classes.file}>
                    <div className={classes.imageFile}>
                      <a
                        className={classes.messageFile}
                        href={props.onSendTextFromChat}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className={classes.fileicon}>
                          <FileIcon
                            type="document"
                            extension={filesTypes}
                            {...defaultStyles[filesTypes]}
                            size="5"
                          />
                        </div>
                      </a>
                    </div>
                    <div className={classes.nameFile}>
                      <a
                        href={props.onSendTextFromChat}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {props.onSendNameFileFromChat}
                      </a>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className={classes.button}>
              <button className={classes.cancel} onClick={onCancelHandler}>
                Hủy
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormFordWardMessage;
