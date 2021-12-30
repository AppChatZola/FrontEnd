import ForgotPassWord from "../components/Account/ForgotPassWord/ForgotPassWord"
import NewPassWord from "../components/Account/ForgotPassWord/NewPassWord";

import { Route } from "react-router-dom";
import { Fragment } from "react";
import { useState } from "react";
const SignUp = (props) => {
  const [valuePhone, setvaluePhone] = useState("");

  const receivePhoneHandler = (phone) => {
    setvaluePhone(phone);
  };

  return (
    <Fragment>
      <Route path="/forgotpassword" exact>
        <ForgotPassWord onSendPhoneToPage={receivePhoneHandler} />{" "}
        {/*Nhận phone từ signupform*/}
      </Route>
      <Route path="/forgotpassword/newpassword">
        <NewPassWord onSendPhoneToVerify={valuePhone} />{" "}
        {/*truyền phone xuống cho verifyform */}
      </Route>
      
    </Fragment>
  );
};

export default SignUp;
