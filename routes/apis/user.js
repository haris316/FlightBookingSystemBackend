const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const jwt = require("jsonwebtoken");

const userSchema = require('../../models/userSchema')

const User = new mongoose.model("User", userSchema);

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email }, (err, user) => {
      if (err) {
        return res.status(200).json({
          success: false,
          message: "Please try again",
        });
      }
      if (user) {
        if (password === user.password) {
          console.log(user);
          const token = jwt.sign({ user_id: user._id, email }, "secret", {
            expiresIn: "1d",
          });
          return res.status(200).json({
            message: "Login Successful",
            token: token,
            success: true,
            user: user,
          });
        } else {
          return res.status(200).json({
            message: "Invalid Email or Password",
            success: false,
          });
        }
      } else {
        return res.status(200).json({
          message: "Invalid Email or Password",
          success: false,
        });
      }
    });
  });

  router.post("/getProfile", (req, res) => {
    const { token } = req.body;
    User.findOne({ token: token }, (err, user) => {
      if (err) {
        return res.status(200).json({
          success: false,
          message: "Please try again",
        });
      }
      if (user) {
        console.log(user);
        return res.status(200).json({
          message: "Get Profile Successful",
          success: true,
          user: user,
        });
      } else {
        return res.status(200).json({
          message: "No account found. Please login again",
          success: false,
        });
      }
    });
  });

  router.post("/getByEmail", (req, res) => {
    console.log(req.body)
    const { email } = req.body;
    User.findOne({ email: email }, (err, user) => {
      
      if (err) {
        return res.status(200).json({
          success: false,
          message: "Please try again",
        });
      }
      if (user) {
        console.log(user);
        return res.status(200).json({
          message: "Get Profile Successful",
          success: true,
          user: user,
        });
      } else {
        return res.status(200).json({
          message: "No account found. Please login again",
          success: false,
        });
      }
    });
  });

  router.get("/getAllUsers", (req, res) => {
    User.find({}, (err, data) => {
      if (err) {
        return res.status(200).json({
          success: false,
          message:
            "There was an error connecting to the database. Please try again",
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "Here you go good sir",
          data: data,
        });
      }
    });
  });

  router.post("/signup", (req, res) => {
    const { name, email, password, role, contactNumber } = req.body;
    User.findOne({ email: email }, (err, user) => {
      if (err) {
        return res.status(200).json({
          success: false,
          message:
            "There was an error connecting to the database. Please try again",
        });
      }
      if (user) {
        return res.status(200).json({
          success: false,
          message: "User already registered with these credentials",
        });
      }
      const profilePicture =
        "https://cdn2.iconfinder.com/data/icons/facebook-51/32/FACEBOOK_LINE-01-512.png";
      const newuser = new User({
        name,
        email,
        password,
        role,
        contactNumber,
        profilePicture,
      });
      newuser.save((err, data) => {
        if (err) {
          return res.status(200).json({
            success: false,
            err: err,
            message: "User cannot be created. Please try again",
          });
        }
        if (data) {
          return res.status(200).json({
            data,
            success: true,
            message: "Successfully Registered",
          });
        }
      });
    });
  });

  router.post("/editUser", (req, res) => {
    const { name, email, password, contactNumber } = req.body;
    User.findOneAndUpdate({ email : email },{name:name,password:password,contactNumber:contactNumber}, (err, user) => {
      if (err) {
        return res.status(200).json({
          success: false,
          message:
            "There was an error connecting to the database. Please try again",
        });
      }
      else if (user) {
        return res.status(200).json({
          success: true,
          message: "Changes made"
        });
      }
      else{
        return res.status(200).json({
          success: false,
          message: "Please try again later",
        });
      }
    });
  });


  router.post("/removeUser", (req, res) => {
    const { name, email, password, key } = req.body;
    //this key check is to be replaced with user role later
    if (key == "01135813") {
      User.findOneAndRemove(
        { name: name, email: email, password: password },
        (err, data) => {
          if (err) {
            return res.status(200).json({
              success: false,
              message:
                "There was an error connecting to the database. Please try again",
            });
          }
          if (data != null) {
            return res.status(200).json({
              success: true,
              message: "User Removed Successfully",
              data: data,
            });
          }
          if (data == null) {
            return res.status(200).json({
              success: false,
              message: "No user found with the given credentials",
            });
          }
        }
      );
    }
    else{
      return res.status(200).json({
        success: false,
        message: "Please provide Auth Key",
      });
    }
  });


module.exports = router