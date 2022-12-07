import express from "express";
const router = express.Router();

// import { userRegister, userLogin } from "../controller/authController.js";
import { userRegister } from "../controller/authController.js";

// const { authMiddleware } = require("../middleware/authMiddleware");

// router.post("/user-login", userLogin); // frontend => store => actions => authActions.js => userRegister => axios.post
router.post("/user-register", userRegister); // frontend => store => actions => authActions.js => userLogin=> axios.post
// router.post("/user-logout", authMiddleware, userLogout);

export default router;
