import classes from "./home.module.scss";
import logo from "../../assets/logoZoLa.png";
import { Scrollbars } from "react-custom-scrollbars";
import { useState } from "react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import roomAPI from "../../api/roomAPI";
import Mess from "./Mess";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { roomAfterLogin } from "../Home/roomSlice";
import messageAPI from "../../api/messageAPI";
import userAPI from "../../api/userAPI";

const ListMess = (props) => {
  const roomAfterLoginRedux = useSelector((state) => state.room.current); //Redux từ roomSlice
  const [arrayMess, setArrayMess] = useState([]);
  const loggedInUser = useSelector((state) => state.user.current);

  const idLogin = loggedInUser._id;
  const dispatch = useDispatch();

  //Lấy thông tin từ redux
  const [activeToggleMess, setActiveToggleMess] = useState({
    activeObject: null,
    objects: arrayMess,
  });

  useEffect(() => {
    const fetchGetRoomAfterLogin = async () => {
      try {
        const requestGetRoomAfterLogin = await messageAPI.getNewMessage({});
        setArrayMess(requestGetRoomAfterLogin.data);
        setActiveToggleMess((pre) => {
          return { ...pre, objects: requestGetRoomAfterLogin.data };
        });
        //redux cho room
        const action = roomAfterLogin();
        const resultAction = await dispatch(action);
        const room = unwrapResult(resultAction);
        //setArrayMess(room)
      } catch (error) {
        console.log(error);
      }
    };
    // console.log(arrayMess);
    fetchGetRoomAfterLogin();
  }, [idLogin]);

  useEffect(() => {
    setTimeout(() => {
      props.onSendSocketToListMess.current.on(
        "friend-request-accept-status",
        async (data) => {
          try {
            const requestGetRoomAfterLogin = await roomAPI.getRoomAfterLogin(
              {}
            );
            setArrayMess(requestGetRoomAfterLogin.data);
            setActiveToggleMess((pre) => {
              return { ...pre, objects: requestGetRoomAfterLogin.data };
            });
          } catch (error) {
            console.log(error);
          }
        }
      );
    }, 100);
  }, []);

  //socket cho sau khi tạo nhóm thì có cục nhóm ở bên list mess
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setTimeout(() => {
        props.onSendSocketToListMess.current.on(
          "join-room-group",
          async (data) => {
            try {
              const requestGetRoomAfterLogin = await roomAPI.getRoomAfterLogin(
                {}
              );
              setArrayMess(requestGetRoomAfterLogin.data);
              props.onSendSocketToListMess.current.emit(
                "join-room-socket",
                data
              );
              setActiveToggleMess((pre) => {
                return { ...pre, objects: requestGetRoomAfterLogin.data };
              });
            } catch (error) {
              console.log(error);
            }
          }
        );
      }, 100);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  //socket xóa bạn thì nó mất cục mess
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setTimeout(() => {
        props.onSendSocketToListMess.current.on(
          "delete-friend",
          async (data) => {
            try {
              const requestGetRoomAfterLogin = await roomAPI.getRoomAfterLogin(
                {}
              );
              setArrayMess(requestGetRoomAfterLogin.data);
              setActiveToggleMess((pre) => {
                return { ...pre, objects: requestGetRoomAfterLogin.data };
              });
            } catch (error) {
              console.log(error);
            }
          }
        );
      }, 100);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const onReceiveFromMess = ({ user, room }) => {
    props.onOpenChat({
      user,
      room,
    });
    // console.log(user);
  };

  //socket xóa nhóm thì nó mất cục mess
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setTimeout(() => {
        props.onSendSocketToListMess.current.on(
          "delete-group-by-me",
          async (data) => {
            try {
              const requestGetRoomAfterLogin = await roomAPI.getRoomAfterLogin(
                {}
              );
              setArrayMess(requestGetRoomAfterLogin.data);
              setActiveToggleMess((pre) => {
                return { ...pre, objects: requestGetRoomAfterLogin.data };
              });
            } catch (error) {
              console.log(error);
            }
          }
        );
      }, 100);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  //socket khi ngta xóa nhóm thì mình mất cục mess
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setTimeout(() => {
        props.onSendSocketToListMess.current.on(
          "delete-group",
          async (data) => {
            try {
              const requestGetRoomAfterLogin = await roomAPI.getRoomAfterLogin(
                {}
              );
              setArrayMess(requestGetRoomAfterLogin.data);
              setActiveToggleMess((pre) => {
                return { ...pre, objects: requestGetRoomAfterLogin.data };
              });
            } catch (error) {
              console.log(error);
            }
          }
        );
      }, 100);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  //socket cho bản thân khi tự rời nhóm
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setTimeout(() => {
        props.onSendSocketToListMess.current.on(
          "exit-group-by-me",
          async (data) => {
            try {
              const requestGetRoomAfterLogin = await roomAPI.getRoomAfterLogin(
                {}
              );
              setArrayMess(requestGetRoomAfterLogin.data);
              setActiveToggleMess((pre) => {
                return { ...pre, objects: requestGetRoomAfterLogin.data };
              });
            } catch (error) {
              console.log(error);
            }
          }
        );
      }, 100);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  //socket cho mọi người khi có 1 người tự rời nhóm và nhóm dưới 3 người nên bị xóa
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setTimeout(() => {
        props.onSendSocketToListMess.current.on("exit-group", async (data) => {
          try {
            const requestGetRoomAfterLogin = await roomAPI.getRoomAfterLogin(
              {}
            );
            setArrayMess(requestGetRoomAfterLogin.data);
            setActiveToggleMess((pre) => {
              return { ...pre, objects: requestGetRoomAfterLogin.data };
            });
          } catch (error) {
            console.log(error);
          }
        });
      }, 100);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  //socket của người khác khi được ai đó thêm vào group và hiện cục mess
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setTimeout(() => {
        props.onSendSocketToListMess.current.on("add-member", async (data) => {
          try {
            const requestGetRoomAfterLogin = await roomAPI.getRoomAfterLogin(
              {}
            );
            setArrayMess(requestGetRoomAfterLogin.data);
            setActiveToggleMess((pre) => {
              return { ...pre, objects: requestGetRoomAfterLogin.data };
            });
          } catch (error) {
            console.log(error);
          }
        });
      }, 100);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  //socket của người khác khi bị ai đó xóa khỏi nhóm và mất cục mess
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setTimeout(() => {
        props.onSendSocketToListMess.current.on(
          "removed-by-other-person",
          async (data) => {
            try {
              const requestGetRoomAfterLogin = await roomAPI.getRoomAfterLogin(
                {}
              );
              setArrayMess(requestGetRoomAfterLogin.data);
              setActiveToggleMess((pre) => {
                return { ...pre, objects: requestGetRoomAfterLogin.data };
              });
            } catch (error) {
              console.log(error);
            }
          }
        );
      }, 100);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  //socket khi mình xóa bạn trong formUserInformation thì nó mất cục mess
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setTimeout(() => {
        props.onSendSocketToListMess.current.on(
          "delete-friend-by-me",
          async (data) => {
            try {
              const requestGetRoomAfterLogin = await roomAPI.getRoomAfterLogin(
                {}
              );
              setArrayMess(requestGetRoomAfterLogin.data);
              setActiveToggleMess((pre) => {
                return { ...pre, objects: requestGetRoomAfterLogin.data };
              });
            } catch (error) {
              console.log(error);
            }
          }
        );
      }, 100);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  //socket khi mình tự cập nhật room mess tự cập nhật
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setTimeout(() => {
        props.onSendSocketToListMess.current.on("updateRooom", async (data) => {
          try {
            const requestGetRoomAfterLogin = await roomAPI.getRoomAfterLogin(
              {}
            );
            setArrayMess(requestGetRoomAfterLogin.data);
            setActiveToggleMess((pre) => {
              return { ...pre, objects: requestGetRoomAfterLogin.data };
            });
          } catch (error) {
            console.log(error);
          }
        });
      }, 100);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const findRoomByNameHandler = (event) => {
    if (event.target.value === "") {
      const fetchGetRoomAfterLogin = async () => {
        try {
          const requestGetRoomAfterLogin = await roomAPI.getRoomAfterLogin({});
          setArrayMess(requestGetRoomAfterLogin.data);
          setActiveToggleMess((pre) => {
            return { ...pre, objects: requestGetRoomAfterLogin.data };
          });
          //redux cho room
          const action = roomAfterLogin();
          const resultAction = await dispatch(action);
          const room = unwrapResult(resultAction);
          //setArrayMess(room)
        } catch (error) {
          console.log(error);
        }
      };

      fetchGetRoomAfterLogin();
    } else {
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
    }
  };


  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setTimeout(() => {
        props.onSendSocketToListMess.current.on(
          "send-message",
          async (data) => {
            try {
              const requestGetRoomAfterLogin = await messageAPI.getNewMessage({});
              setArrayMess(requestGetRoomAfterLogin.data);
              setActiveToggleMess((pre) => {
                return { ...pre, objects: requestGetRoomAfterLogin.data };
              });
            } catch (error) {
              console.log(error);
            }
          }
        );
      }, 100);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className={classes["center-mess"]}>
      <div className={classes.title}>
        <img src={logo} alt="" />
        <h2> WELCOME TO ZOLA</h2>
      </div>
      <div className={classes.search}>
        <div className={classes["input-group"]}>
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Tìm Kiếm"
            onChange={findRoomByNameHandler}
          />
        </div>
        <i className="fas fa-user-plus"></i>
        <i className="fas fa-users"></i>
      </div>
      <Scrollbars
        style={{ height: "610px" }}
        className={classes["list-mess"]}
        id="style-2"
      >
        {arrayMess.map((data, index) => {
          //console.log(Math.floor(Math.random() * 10000) + 100);
          const toggleActive = (index) => {
            setActiveToggleMess({
              ...activeToggleMess,
              activeObject: activeToggleMess.objects[index],
            });
          };
          const toggleActiveStyle = (index) => {
            if (
              activeToggleMess.objects[index] === activeToggleMess.activeObject
            ) {
              return classes.activeToggleMess;
            } else {
              return classes.inactiveToggleMess;
            }
          };
          const inActiveMess = (e) => {
            toggleActive(index);
          };

          return (
            <div
              className={`${classes.messParent} ${toggleActiveStyle(index)}`}
              onClick={inActiveMess}
              key={data._id}
            >
              <Mess
                socket={props.onSendSocketToListMess}
                data={data}
                idLogin={idLogin}
                index={index}
                onSendListMess={onReceiveFromMess}
                onNameMess={props.onNameMess}
              />
            </div>
          );
        })}
      </Scrollbars>
    </div>
  );
};

export default ListMess;

//=================================================================================================================