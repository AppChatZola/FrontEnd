import React from "react";
import classes from "./ForgotPassWord.module.scss";
import logo from "../../../assets/logoZoLa.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import signupAPI from "../../../api/signupAPI";


const ForgotPassWord = (props) => {
  const History = useHistory();
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState("");
  const [isError, setIsError] = useState("");

  const phoneNumberInputChangeHandler = (event) => {
    setEnteredPhoneNumber(event.target.value);
    const regex = /^(0|84)[0-9]{9}$/;
    if (regex.test(event.target.value)) {
      setEnteredPhoneNumber(event.target.value);
      setIsError("");
    } else if (event.target.value === "") {
      setIsError("Không được rỗng");
    } else {
      setIsError(
        "Số điện thoại phải bắt đầu bằng 0 hoặc 84 và bao gồm 9 chữ số phía sau!!"
      );
    }
  };
 
  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (enteredPhoneNumber === "") {
      setIsError("Không được rỗng");
      return;
    }
    const regex = /^(0|84)[0-9]{9}$/;
    if (regex.test(enteredPhoneNumber)) {
      setIsError("");
    } else {
      setIsError(
        "Số điện thoại phải bắt đầu bằng 0 hoặc 84 và bao gồm 9 chữ số phía sau!!"
      );
      return;
    }
    props.onSendPhoneToPage(enteredPhoneNumber); //Truyền dữ liệu lên cho sigup pages
    const fetchCheckPhone = async () => {
      try {
        const checkPhone = await signupAPI.checkPhoneAlready({
          phone: enteredPhoneNumber,
        });
        if (checkPhone.status === 201) {
          const fetchSendOTP = async () => {
            const sendOTP = await signupAPI.sendOTP({
              phone: enteredPhoneNumber,
            });
            if(sendOTP.status === 201){
              History.push("forgotpassword/newpassword");
            }
          };
          fetchSendOTP();
         
        }
      } catch (error) {
        setIsError(error);
      }
    };

    fetchCheckPhone();
  };


  return (
    <div className={classes.singup}>
      <header>
        <img src={logo} alt="" />
      </header>
      <form onSubmit={formSubmitHandler}>
        <div className={classes["content-form"]}>
          <div className={classes.inputPhone}>
            <span>
              <i className="fas fa-mobile-alt"></i>
            </span>
            <input
              type="phone"
              placeholder="Số điện thoại"
              onChange={phoneNumberInputChangeHandler}
            />
          </div>
          <span className={classes.error}>{isError}</span> <br />
          <button className={classes["btn-first"]}>Lấy lại mật khẩu</button>
        </div>
      </form>
      <footer>
        <p className={classes.signIn}>
         <Link to="/signin"> Quay lại</Link>
        </p>
      </footer>
    </div>
  );
};

export default ForgotPassWord;
