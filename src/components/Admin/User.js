import React, { useState, Fragment } from "react";
import FormDeleteUser from "./form-deleteUser/FormDeleteUser";

const User = (props) => {
  const [isOpenDeleteUser, setIsOpenDeleteUser] = useState(false)
  const [renderArrayUser, setRenderArrayUser] = useState(false);

  // console.log(props.user);
  // console.log(props.index);

  function pad2(n) {
    return (n < 10 ? "0" : "") + n;
  }
  var date = new Date(props.user.birthday);

  var month = pad2(date.getMonth() + 1); 
  var day = pad2(date.getDate());
  var year = date.getFullYear();

  var formattedDate = day + "-" + month + "-" + year;


  const OpenFormDeleteUserHandler = () => {
    setIsOpenDeleteUser(true)
  }
  const cancelFormDeleteUser = () => {
    setIsOpenDeleteUser(false)
  }
  const RenderArrayUser = (render) => {
    setRenderArrayUser(render)
    props.RenderArrayUser(renderArrayUser)
  }

  return (
    <Fragment>
          <tr>
            <td>{props.index + 1}</td>
            <td>{props.user._id}</td>
            <td>{props.user.name}</td>
            <td>{props.user.gender ? "Nam" : "Nữ"}</td>
            <td>{formattedDate}</td>
            <td>{props.user.phone}</td>
            <td>
            <button onClick={OpenFormDeleteUserHandler}>
                <i className="far fa-trash-alt"></i>Xóa
            </button>
            </td>
        </tr>

      {<FormDeleteUser
        isOpenDeleteUser={isOpenDeleteUser}
        onFormFalse={cancelFormDeleteUser}
        id={props.user._id}
        RenderArrayUser={RenderArrayUser}
      >
        
        </FormDeleteUser>}

    </Fragment>

  );
};

export default User;
