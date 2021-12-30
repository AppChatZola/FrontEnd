import React, { Fragment, useState, useEffect } from "react";
import classes from "./home.module.scss";
import addFriendAPI from "../../api/addFriendAPI";
import FormDeleteFriend from "./form-deleteFriend/FormDeleteFriend";
import FormUserInfomation from "./form-information/FormUserInfomation";

const Friend = (props) => {
  const [user, setUser] = useState(null);
  const [isFormDeleteFriend, setIsFormDeleteFriend] = useState(false);
  const [isOpenFormUserInfo, setIsOpenFormUserInfo] = useState(false);
  // const [isOpenBoxChat, setIsOpenBoxChat] = useState(false)

  useEffect(() => {
    const friendId = props.data?.find((m) => m !== props.idLogin);
    const fetchGetUser = async () => {
      try {
        const requestGetUser = await addFriendAPI.getUser({
          userID: friendId || props.data1._id,
        });
        setUser(requestGetUser.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetUser();
  }, []);

  const deleteFriendHandler = () => {
    setIsFormDeleteFriend(true);
  };
  const closeFormDeleteFriend = () => {
    setIsFormDeleteFriend(false);
  };

  const openFormUserInformation = () => {
    setIsOpenFormUserInfo(true);
  };

  const closeFormUserInformation = () => {
    setIsOpenFormUserInfo(false);
  };

  const isChatHandler = (e) => {
    props.onSendListMess({
      user: user.users,
      room: props.dataRoom,
    });
  };

  return (
    <Fragment>
      <div className={classes.friend} 
          onClick={isChatHandler}
      >
        <div
          className={classes.groupInfoFriend}
          onClick={openFormUserInformation}
        >
          <div className={classes["avatar-friend"]}>
            <img src={user?.users.avatar} alt="" />
          </div>
          <div className={classes["name-friend"]}>
            <p>{user?.users.name}</p>
          </div>
        </div>
        <div className={classes.delete_Friend} onClick={deleteFriendHandler}>
          <i className="fas fa-user-minus"></i>
        </div>
      </div>

      {
        <FormDeleteFriend
          isFormDeleteFriend={isFormDeleteFriend}
          onFormFalse={closeFormDeleteFriend}
          user={user}
        ></FormDeleteFriend>
      }

      {/* {<FormUserInfomation
        isFormInfomation = {isOpenFormUserInfo}
        SendFalseToBoxChat={closeFormUserInformation}
        user={user}
      ></FormUserInfomation>} */}
    </Fragment>
  );
};

export default Friend;
