import React, { useEffect, useState } from "react";
import classes from "./formAddUser.module.scss";
import tung from "../../../assets/tung.jpg"
import axios from "axios";
import adminAPI from "../../../api/adminAPI";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
const AddUser = (props) => {

    const [isOpenForm, setIsOpenForm] = useState("");
    const [selectedAvatar, setSelectedAvatar] = useState({ new: "https://media.istockphoto.com/vectors/man-face-icon-in-medical-mask-male-person-in-surgical-mask-people-vector-id1222731059" });
    const [nameUser, setNameUser] = useState("");
    const [birthdayUser, setBirthdayUser] = useState("");
    const [genderUser, setGenderUser] = useState(true);
    const [phoneUser, setPhoneUser] = useState("");
    const [passwordUser, setPasswordUser] = useState("");
    const [renderArrayUser, setRenderArrayUser] = useState(false);


    const cancelHandler = (e) => {
        e.preventDefault();
        setIsOpenForm("");
        props.onFormFalse(false);
    };
    
    useEffect(() => {
    if (props.openFormAddUserFromAdmin) {
        setIsOpenForm(classes.active);
    } else {
        setIsOpenForm("");
    }
    }, [props.openFormAddUserFromAdmin]);


    const ChangeIMGAvatarHandler = (e) => {
      e.preventDefault();
      const fileSelected = e.target.files[0];
      const fd = new FormData();
      fd.append("uploadFile", fileSelected);
      axios
        .post("//localhost:5000/messages/addFile", fd)
        .then((res) => {
          setSelectedAvatar((pre) => {
            return { ...pre, new: res.data };
          });
        })
        .catch((aa) => {
          console.log("Khong Gui dc", aa);
        });
    };

    const nameNewUserHandler = (event) => {
      setNameUser(event.target.value)
    }
    const birthdayNewUserHandler = (event) => {
      setBirthdayUser(event.target.value)
    }
    const genderNewUserHandler = (event) => {
      setGenderUser(event.target.value === "true" ? true : false)
    }
    const phoneNewUserHandler = (event) => {
      setPhoneUser(event.target.value)
    }
    const passwordNewUserHandler = (event) => {
      setPasswordUser(event.target.value)
    }

    const addNewUserHandler = (event) => {
      event.preventDefault();
      const fetchAddUser = async () => {
        try {
          const addUser = await adminAPI.addNewUser({
            newUser:{
              name: nameUser,
              phone: phoneUser,
              password: passwordUser,
              avatar: selectedAvatar.new,
              role: "user",
              active: false,
              socketId: "",
              friends: [],
              birthday: birthdayUser,
              gender: genderUser,
            }
          });
          if (addUser.status === 200) {
            props.onFormFalse(false);
            toast.success("Thêm người dùng mới thành công", {position: toast.POSITION.TOP_RIGHT,autoClose: 2000});
            setRenderArrayUser(!renderArrayUser)
            props.RenderArrayUser(renderArrayUser)
            setNameUser("")
            setBirthdayUser("")
            setGenderUser("")
            setPhoneUser("")
            setPasswordUser("")
          }
        } catch (error) {
          //setIsError("mã Code không tồn tại");
          console.log(error);
          toast.error("Thêm người dùng mới không thành công!", {position: toast.POSITION.TOP_RIGHT,autoClose: false,});
        }
      };
      fetchAddUser();
    }

  return (
    <div className={classes.modalFormAddFriend}>
    <div className={` ${classes.backdrop} ${isOpenForm}`}></div>
    <div className={` ${classes.viewFormAddFriend} ${isOpenForm}`}>
      <div className={classes.header}>
        <h2>Thêm Người Dùng</h2>
        <div className={classes.cancel} onClick={cancelHandler}>
          <div className={classes.blur}>
            <i className="bi bi-x"></i>
          </div>
        </div>
      </div>
      <form action="" onSubmit={addNewUserHandler}>
        <div className={classes.body}>
          <div className={classes.left}>
              <div className={classes.image}>
                  <img src={selectedAvatar.new} alt="" />
                  <i className="fas fa-camera">
                      <input type="file" multiple onChange={ChangeIMGAvatarHandler}/>
                  </i>
              </div>
          </div>
          <div className={classes.right}>
              <div className={classes.name}>
                  <label htmlFor="">Tên</label>
                  <input type="text" name="" id="" value={nameUser} placeholder="Họ và tên" onChange={nameNewUserHandler} required/>
              </div>
              <div className={classes.birthday}>
                  <label htmlFor="">Ngày Sinh</label>
                  <input type="date" name="" id="" value={birthdayUser} onChange={birthdayNewUserHandler} required/>
              </div>
              <div className={classes.gender}>
                  <label htmlFor="">Giới Tính</label>
                  <div className={classes.type}>
                      <input type="radio" name="gender" id="Nam" value={true} onChange={genderNewUserHandler} required/>
                      <label htmlFor="Nam">Nam</label>
                      
                      <input type="radio" name="gender" id="Nu" value={false} onChange={genderNewUserHandler} required/>
                      <label htmlFor="Nu">Nữ</label>
                    </div>
              </div>
              <div className={classes.phone}>
                  <label htmlFor="">Số điện thoại</label>
                  <input type="text" name="" id="" value={phoneUser} placeholder="Số điện thoại" required onChange={phoneNewUserHandler}/>
              </div>
              <div className={classes.password}>
                  <label htmlFor="">Mật khẩu</label>
                  <input type="password" name="" id="" value={passwordUser} placeholder="Mật Khẩu" required onChange={passwordNewUserHandler}/>
              </div>
          </div>
        </div>

     
        <div className={classes.btn}>
          <div className={classes.btn_around}>
              <button className={classes.exit} onClick={cancelHandler}>
                  <i className="far fa-window-close"></i>
                  Hủy</button>
                <button className={classes.add}>
                  <i className="fas fa-user-plus"></i>
                  Thêm</button>
          </div>
        </div>
      </form>
      
    </div>
  </div>
  );
};

export default AddUser;
