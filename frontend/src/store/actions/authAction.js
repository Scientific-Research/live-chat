import axios from "axios";
// import {
//   REGISTER_FAIL,
//   REGISTER_SUCCESS,
//   USER_LOGIN_SUCCESS,
//   USER_LOGIN_FAIL,
// } from "../types/authType";

export const userRegister = (data) => {
  // Data(data) come here from register.jsx in frontend to send it at the end to the DataBank.
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        "/api/messenger/user-register",
        data,
        config
      );
      //   localStorage.setItem("authToken", response.data.token);

      //   dispatch({
      //     type: REGISTER_SUCCESS,
      //     payload: {
      //       successMessage: response.data.successMessage,
      //       token: response.data.token,
      //     },
      //   });
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
      //   dispatch({
      //     type: REGISTER_FAIL,
      //     payload: {
      //       error: error.response.data.error.errorMessage,
      //     },
      //   });
    }
  };
};

// export const userLogin = (data) => {
//   return async (dispath) => {
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     try {
//       const response = await axios.post(
//         "/api/messenger/user-login",
//         data,
//         config
//       );
//       localStorage.setItem("authToken", response.data.token);
//       dispath({
//         type: USER_LOGIN_SUCCESS,
//         payload: {
//           successMessage: response.data.successMessage,
//           token: response.data.token,
//         },
//       });
//     } catch (error) {
//       dispath({
//         type: USER_LOGIN_FAIL,
//         payload: {
//           error: error.response.data.error.errorMessage,
//         },
//       });
//     }
//   };
// };

// export const userLogout = () => async (dispatch) => {
//   try {
//     const response = await axios.post("/api/messenger/user-logout");
//     if (response.data.success) {
//       localStorage.removeItem("authToken");
//       dispatch({
//         type: "LOGOUT_SUCCESS",
//       });
//     }
//   } catch (error) {}
// };
