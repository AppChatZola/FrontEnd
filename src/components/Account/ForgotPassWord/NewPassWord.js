import React from "react";
import classes from "./NewPassWord.module.scss";
import logo from "../../../assets/logoZoLa.png";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import signupAPI from "../../../api/signupAPI";
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

toast.configure()
const NewPassWord = (props) => {


  const History = useHistory();
  const [enteredCode, setEnteredCode] = useState("");
  const [enteredNewPass, setEnteredNewPass] = useState("");
  const [enteredReNewPass, setEnteredReNewPass] = useState("");

  const CodeInputChangeHandler = (event) => {
    setEnteredCode(event.target.value);
  };

  const NewPassWordHandler = (event) => {
    setEnteredNewPass(event.target.value)
  }

  const ReNewPassWordHandler = (event) => {
    setEnteredReNewPass(event.target.value)
  }
  // console.log(props.onSendPhoneToVerify);


  const formSubmitHandler = (event) => {
    event.preventDefault();
    const forgotPassWord = async () => {
      try {
        const newPassWord = await signupAPI.forgotPassword({
          phone: props.onSendPhoneToVerify,
          code: enteredCode,
          Password: enteredNewPass,
          reEnterPassword: enteredReNewPass
        });
        if (newPassWord.status === 200) {
          toast.success("Đổi mật khẩu thành công!", {position: toast.POSITION.TOP_RIGHT, autoClose: 2000})
          History.push("/signin");
        }
      } catch (error) {
        //setIsError("mã Code không tồn tại");
        console.log(error);
      }
    };
    forgotPassWord();
  };

  const SendOTPAgainHandler = () => {
    const fetchSendOTP = async () => {
      const sendOTP = await signupAPI.sendOTP({
        phone: props.onSendPhoneToVerify,
      });
      if(sendOTP.status === 201){
        toast.success("Đã gửi lại OTP thành công!", {position: toast.POSITION.TOP_RIGHT, autoClose: 2000})
      }
    };
    fetchSendOTP();
  }


  return (
    <div className={classes.verify}>
      <header>
        <img src={logo} alt="" />
      </header>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.container}>
            <div className={classes["title-form"]}>
              <p>
                Bạn sẽ nhận được tin nhắn có mã kích hoạt từ Zalo
              </p>
              <h2>{props.onSendPhoneToVerify}</h2>
            </div>
            <div className={classes.inputCode}>
                  <input
                    type="text"
                    placeholder="Mã kích hoạt"
                    onChange={CodeInputChangeHandler}
                  />
            </div>
            <p className={classes.reSendOTP} onClick={SendOTPAgainHandler}>Gửi lại mã kích hoạt</p>
        </div>

        <div className={classes.inputPassword}>
          <div className={classes.newPass}>
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Vui lòng nhập mật khẩu mới" onChange={NewPassWordHandler}/>
          </div>
          <div className={classes.reNewPass}>
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Nhập lại mật khẩu mới" onChange={ReNewPassWordHandler}/>
          </div>
        </div>

        <button className={classes["btn-first"]}>Xác nhận</button>
        
        
      </form>


      <footer>
        <Link to="/forgotpassword">Quay lại</Link>
      </footer>
    </div>
  );
};

export default NewPassWord;
