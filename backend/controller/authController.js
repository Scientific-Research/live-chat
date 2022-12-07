import formidable from "formidable";
import validator from "validator";
import registerModel from "../models/authModel.js";

import fs from "fs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import console from "console";
import path from "path";

export const userRegister = (req, res) => {
  const form = formidable();
  form.parse(req, async (err, fields, files) => {
    const { userName, email, password, confirmPassword } = fields;
    // console.log("form funktioniert!");
    const { image } = files;
    const error = [];

    if (!userName) {
      error.push("Please enter your user name:");
    }
    if (!email) {
      error.push("Please enter your Email:");
    }
    if (email && !validator.isEmail(email)) {
      error.push("Please enter a valid Email:");
    }
    if (!password) {
      error.push("Please enter your Password:");
    }
    if (!confirmPassword) {
      error.push("Please enter your Password again:");
    }
    if (password && confirmPassword && password !== confirmPassword) {
      error.push("Your Password and Confirm Password are not the same:");
    }
    if (password && password.length < 6) {
      error.push("Your password length muss be at least 6 characters:");
    }
    if (Object.keys(files).length === 0) {
      error.push("Please select user image:");
    }
    if (error.length > 0) {
      res.status(400).json({
        error: {
          errorMessage: error,
        },
      });
    } else {
      const getImageName = files.image.originalFilename;
      // console.log(getImageName);
      const randNumber = Math.floor(Math.random() * 99999);
      const newImageName = randNumber + getImageName;
      // console.log(newImageName);
      files.image.originalFilename = newImageName;

      const newPath = path.join(
        `/home/user/assignments/live-chat/frontend/public/images/${files.image.originalFilename}`
      );

      console.log(newPath);

      try {
        const checkUser = await registerModel.findOne({
          email: email,
        });
        if (checkUser) {
          res.status(404).json({
            error: {
              errorMessage: ["Your email already exist."],
            },
          });
        } else {
          fs.copyFile(files.image.filepath, newPath, async (error) => {
            if (!error) {
              const userCreate = await registerModel.create({
                userName,
                email,
                password: await bcrypt.hash(password, 10),
                image: files.image.originalFilename,
              });
              console.log("Registration completed successfully in DataBank.");
              // const token = jwt.sign(
              //   {
              //     id: userCreate._id,
              //     email: userCreate.email,
              //     userName: userCreate.userName,
              //     image: userCreate.image,
              //     registerTime: userCreate.createdAt,
              //   },
              //   process.env.SECRET,
              //   {
              //     expiresIn: process.env.TOKEN_EXP,
              //   }
              // );

              // console.log("TOKEN : ", token);

              const options = {
                expires: new Date(
                  Date.now() + process.env.COOKIE_EXP * 24 * 60 * 60 * 1000
                ),
              };

              // res.status(201).cookie("authToken", token, options).json({
              //   successMessage: "Your Registration Successful.",
              //   token,
              // });
            } else {
              res.status(500).json({
                error: {
                  errorMessage: ["Internal Server Error"],
                },
              });
            }
          });
        }
      } catch (error) {
        res.status(500).json({
          error: {
            errorMessage: ["Internal Server Error"],
          },
        });
      }
    }
  }); // end Formidable
};

export const userLogin = async (req, res) => {
  console.log("This is from Login Page!");
  console.log(req.body);

  const error = [];
  const { email, password } = req.body;
  if (!email) {
    error.push("Please enter your Email");
  }
  if (!password) {
    error.push("Please enter your Password");
  }
  if (email && !validator.isEmail(email)) {
    error.push("Please enter a valid Email");
  }
  if (error.length > 0) {
    res.status(400).json({
      error: {
        errorMessage: error,
      },
    });
  } else {
    try {
      const checkUser = await registerModel
        .findOne({
          email: email,
        })
        // .select("+password"); ohne diesen Befehl : zeigt uns kein Passwort in Terminal
        .select("+password");
      console.log(checkUser);

      if (checkUser) {
        const matchPassword = await bcrypt.compare(
          password,
          checkUser.password
        );

        if (matchPassword) {
          const token = jwt.sign(
            {
              id: checkUser._id,
              email: checkUser.email,
              userName: checkUser.userName,
              image: checkUser.image,
              registerTime: checkUser.createdAt,
            },
            process.env.SECRET,
            {
              expiresIn: process.env.TOKEN_EXP,
            }
          );
          //}
          //}
          const options = {
            expires: new Date(
              Date.now() + process.env.COOKIE_EXP * 24 * 60 * 60 * 1000
            ),
          };

          res.status(200).cookie("authToken", token, options).json({
            successMessage: "Your Login Successful",
            token,
          });
        } else {
          res.status(400).json({
            error: {
              errorMessage: ["Your Password is not Valid"],
            },
          });
        }
      } else {
        res.status(400).json({
          error: {
            errorMessage: ["Your Email Not Found"],
          },
        });
      }
    } catch {
      res.status(404).json({
        error: {
          errorMessage: ["Internal Sever Error"],
        },
      });
    }
  }
};

export const userLogout = (req, res) => {
  res.status(200).cookie("authToken", "").json({
    success: true,
  });
};
