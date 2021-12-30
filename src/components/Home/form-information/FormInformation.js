import React, { Fragment } from "react";
import classes from "./formInformation.module.scss";
import tung from "../../../assets/tung.jpg";
import FormChangePass from "./FormChangePass";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import userAPI from "../../../api/userAPI";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
const FormInformation = (props) => {
  //Lấy thông tin từ redux
  const loggedInUser = useSelector((state) => state.user.current);
  const phone = loggedInUser.phone;
  const username = loggedInUser.name;
  const avatar = loggedInUser.avatar;
  const birthday = loggedInUser.birthday;
  const gender = loggedInUser.gender;


  const [isFormChangePass, setIsFormChangePass] = useState(false);
  const [isFocusInput, setIsFocusInput] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState("");
  const [enteredName, setIsEnterName] = useState({ username: username });
  const [birthdayUser, setBirthdayUser] = useState({ birthday: birthday });
  // const [genderUser, setGenderUser] = useState({ genderUser: `"${gender}"` });
  const [genderUser, setGenderUser] = useState({ genderUser: gender });
  const [isChangeName, setIsChangeName] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedAvatar, setSelectedAvatar] = useState({ new: avatar });
  // const [previewImage, setPreviewImage] = useState("")
  // const wrapperRef = useRef(null)


  const changePassHandler = (event) => {
    event.preventDefault();
    setIsFormChangePass(true);
  };
  const InputHandler = () => {
    setIsFocusInput(true);
  };
  const changeNameHandler = () => {
    setIsChangeName(!isChangeName);
  };

  const nameInputChangeHandler = (event) => {
    setIsEnterName({ username: event.target.value });
  };

  useEffect(() => {
    if (props.isForm) {
      setIsOpenForm(classes.active);
      setIsChangeName(false);
    } else {
      setIsOpenForm("");
    }
  }, [props.isForm]);

  //Truyền lên cho Home
  const cancelHandler = () => {
    setIsOpenForm("");
    props.onFormFalse(false);
  };
  //Nhận từ FormChangePass
  const cancelHandlerChangePass = (falseFromPass) => {
    setIsFormChangePass(falseFromPass);
  };

  function pad2(n) {
    return (n < 10 ? "0" : "") + n;
  }
  var date = new Date(birthdayUser.birthday);

  var month = pad2(date.getMonth() + 1); //months (0-11)
  var day = pad2(date.getDate()); //day (1-31)
  var year = date.getFullYear();

  var formattedDate = day + "-" + month + "-" + year;

  // const formattedDate = moment(new Date(birthdayUser.birthday), 'yyyy-MM-dd').format();

  const birthdayHandler = (value, e) => {
    setBirthdayUser({ birthday: value });
    // setSelectedDate(event)
    // console.log(value);
    // console.log(e);
  };

  const genderHandler = (event) => {
    // console.log(event.target.value);
    setGenderUser({ genderUser: event.target.value === "true" ? true : false });
  };

  // console.log(genderUser.genderUser);

  
  const formSubmitHandler = (event) => {
    event.preventDefault();
    // console.log(event.target.username.value);
    // const formattedDate = moment(new Date(birthdayUser.birthday), 'DD-MM-YYYY').format();

    const fetchReplaceUser = async () => {
      try {
        const verify = await userAPI.replaceUser({
          userID: loggedInUser._id,
          newUser: {
            ...loggedInUser,
            name: event.target.username.value,
            birthday: birthdayUser.birthday,
            gender: genderUser.genderUser,
            avatar: selectedAvatar.new,
          },
        });
        if (verify.status === 200) {
          console.log("Success");
          props.onFormFalse(false);
          toast.success("Cập nhập thành công", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
          props.onSendAvatarToHome(selectedAvatar.new);
        }
      } catch (error) {
        //setIsError("mã Code không tồn tại");
        console.log(error);
        toast.error("Cập nhập không thành công!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: false,
        });
      }
    };
    fetchReplaceUser();
  };

  // console.log(enteredName.username);
  const ChangeIMGAvatarHandler = (e) => {
    e.preventDefault();
    const fileSelected = e.target.files[0];
    const fd = new FormData();
    fd.append("uploadFile", fileSelected);
    axios
      .post("//localhost:5000/messages/addFile", fd)
      .then((res) => {
        // console.log(res.data);
        setSelectedAvatar((pre) => {
          return { ...pre, new: res.data };
        });
      })
      .catch((aa) => {
        console.log("Khong Gui dc", aa);
      });
  };


  return (
    <Fragment>
      <div className={classes.modalView}>
        <div
          className={`${classes.backdropViewInformation} ${isOpenForm}`}
        ></div>
        <div className={`${classes.viewInformation} ${isOpenForm}`}>
          <div className={classes.header}>
            <p>Cập nhật thông tin</p>

            <div onClick={cancelHandler}>
              <i className="fas fa-times"></i>
            </div>
          </div>
          <div className={classes.information}>
            <form onSubmit={formSubmitHandler}>
              <div className={classes.left}>
                <div className={classes.avatar}>
                  <div className={classes.image}>
                    <img src={selectedAvatar.new} alt="" />

                    <i className="fas fa-camera">
                      <input
                        type="file"
                        onChange={ChangeIMGAvatarHandler}
                        multiple
                        onFocus={InputHandler}
                      />
                    </i>
                  </div>
                  <input
                    className={`${classes.username} ${
                      isChangeName ? classes.activeChangeName : ""
                    }`}
                    type="text"
                    value={enteredName.username}
                    onChange={nameInputChangeHandler}
                    id="username"
                    name="username"
                    readOnly={!isChangeName && "readOnly"}
                    onFocus={InputHandler}
                  />

                  <label onClick={changeNameHandler} htmlFor="username">
                    <i className="fas fa-pencil-alt"></i>
                  </label>
                </div>
              </div>
              <div className={classes.right}>
                <div className={classes.phone}>
                  <label>
                    <i className="fas fa-phone-alt"></i>Số điện thoại
                  </label>
                  <input type="text" value={phone} readOnly />
                </div>
                <div className={classes.gender}>
                  <label>
                    <i className="fas fa-venus-mars"></i>Giới tính
                  </label>
                  <div className={classes.type}>
                    <input
                      onChange={genderHandler}
                      type="radio"
                      value={true}
                      onFocus={InputHandler}
                      name="gender"
                      checked={genderUser.genderUser === true}
                      id="Nam"
                    />
                    <label htmlFor="Nam">Nam</label>
                    <input
                      onChange={genderHandler}
                      type="radio"
                      value={false}
                      onFocus={InputHandler}
                      name="gender"
                      checked={genderUser.genderUser === false}
                      id="Nu"
                    />
                    <label htmlFor="Nu">Nữ</label>
                  </div>
                </div>
                <div className={classes.birthday}>
                  <label htmlFor="birthday">
                    <i className="fas fa-birthday-cake"></i>Ngày sinh
                  </label>
                  <DatePicker
                    value={formattedDate}
                    selected={selectedDate}
                    onChange={birthdayHandler}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="dd/mm/yyyy"
                    onFocus={InputHandler}
                    maxDate={new Date()}
                    id="birthday"
                  ></DatePicker>
                </div>
                <div className={classes.button}>
                  <button
                    className={`${classes.updateInfor} ${
                      isFocusInput ? classes.active : ""
                    }`}
                    disabled={!isFocusInput ? "true" : ""}
                  >
                    <i className="fas fa-pencil-alt"></i>Cập nhật thông tin
                  </button>
                  <button
                    className={classes.changePass}
                    onClick={changePassHandler}
                  >
                    <i className="fas fa-user-edit"></i>Đổi mật khẩu
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {isFormChangePass && (
        <FormChangePass
          onCancel={cancelHandlerChangePass}
          onFormFalse={cancelHandlerChangePass}
        />
      )}
    </Fragment>
  );
};

export default FormInformation;
