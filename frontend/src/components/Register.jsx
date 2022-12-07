import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { userRegister } from "../store/actions/authAction";
import {useDispatch,useSelector} from "react-redux"

const Register = () => {

  const dispatch = useDispatch(); // dispatch takes our information and send it to the authAction in action in store in Redux.
  // in line 57, dispatch send the data from formData to backend.


  const [state, setState] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const [loadImage, setLoadImage] = useState("");

  const fileHandle = (e) => {
    if (e.target.files.length !== 0) {
      setState({
        ...state,
        [e.target.name]: e.target.files[0],
      });
    }
    const reader = new FileReader();
    reader.onload = () => {
      setLoadImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const register = (e) => {
    e.preventDefault();
    // console.log(state); // show all our information available in Register form in devTools area.

    // To send the Data from frontend(our register  form to backend(our DataBank)): from Register.jsx to authAction.js in 
    //action in store in Redux
    const { userName, email, password, confirmPassword, image } = state;
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("image", image);

    dispatch(userRegister(formData));
  };

  return (
    <div className="register">
      <div className="card">
        <div className="card-header">
          <h3>Register</h3>
        </div>

        <div className="card-body">
          <form onSubmit={register}>
            <div className="form-group">
              <label htmlFor="username">User Name</label>
              <input
                type="text"
                onChange={inputHandle}
                name="userName"
                value={state.userName}
                className="form-control"
                placeholder="User Name"
                id="username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                onChange={inputHandle}
                name="email"
                value={state.email}
                className="form-control"
                placeholder="Email"
                id="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                onChange={inputHandle}
                name="password"
                value={state.password}
                className="form-control"
                placeholder="Password"
                id="password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                onChange={inputHandle}
                name="confirmPassword"
                value={state.confirmPassword}
                className="form-control"
                placeholder="Confirm Password"
                id="confirmPassword"
              />
            </div>

            <div className="form-group">
              <div className="file-image">
                <div className="image">
                  {loadImage ? <img src={loadImage} /> : ""}
                </div>
                <div className="file">
                  <label htmlFor="image">Select Image</label>
                  <input
                    type="file"
                    onChange={fileHandle}
                    name="image"
                    // value={state.image}
                    className="form-control"
                    id="image"
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <input type="submit" value="register" className="btn" />
            </div>

            <div className="form-group">
              <span>
                <Link to="/messenger/login"> Login Your Account </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
