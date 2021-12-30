import React, { Fragment } from "react";
import classes from "./formDeleteUser.module.scss";
import { useState, useEffect } from "react";
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import adminAPI from "../../../api/adminAPI"

toast.configure()
const FormDeleteUser = (props) => {
  const [isOpenForm, setIsOpenForm] = useState("");
  const [renderArrayUser, setRenderArrayUser] = useState(false);


  const cancelHandler = (e) => {
    e.preventDefault();
    setIsOpenForm("");
    props.onFormFalse(false);
  };


  useEffect(() => {
    if (props.isOpenDeleteUser) {
        setIsOpenForm(classes.active);
    } else {
        setIsOpenForm("");
    }
    }, [props.isOpenDeleteUser]);


    const deleteUserHandler = () => {
      const fetchDeleteUser = async () => {
        try {
          const deleteUser = await adminAPI.deleteUser({
            userId: props.id
          });
          if(deleteUser.status === 200){
            setRenderArrayUser(!renderArrayUser)
            props.RenderArrayUser(renderArrayUser)
            toast.success("Xóa người dùng thành công", {position: toast.POSITION.TOP_RIGHT, autoClose: 2000})
            props.onFormFalse(false);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchDeleteUser();
    }


  return (
      <div className={classes.modalFormLogOut}>
        <div className={` ${classes.backdrop} ${isOpenForm}`}></div>
        <div className={` ${classes.viewFormLogOut} ${isOpenForm}`}>
          <div className={classes.header}>
            <h2>Xác nhận</h2>
            <div className={classes.cancel} onClick={cancelHandler}>
              <div className={classes.blur}>
                <i className="bi bi-x"></i>
              </div>
            </div>
          </div>
          <div className={classes.body}>
              <p>Bạn có chắc chắn xóa người dùng này?</p>
          </div>
          <div className={classes.footer}>
              <div className={classes.button}>
                  <button className={classes.cancel} onClick={cancelHandler}>Hủy</button>
                  <button className={classes.confirm} onClick={deleteUserHandler}>Xác nhận</button>
              </div>
          </div>
        </div>
      </div>
  );
};

export default FormDeleteUser;
