const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const companySchema = require('../../models/companySchema')

const Company = new mongoose.model("Company", companySchema);

router.post("/newCompany", (req, res) => {
    const { name, contactNumber, country } = req.body;
    Company.findOne({ name : name , contactNumber:contactNumber , country:country}, (err, user) => {
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
          message: "Company already registered",
        });
      }
      const newcompany = new Company({
        name,
        contactNumber,
        country,
      });
      newcompany.save((err, data) => {
        if (err) {
          return res.status(200).json({
            success: false,
            err: err,
            message: "Company cannot be registered. Please try again",
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

  router.post("/removeCompany", (req, res) => {
    const { name, contactNumber, country,key } = req.body;
    //this key check is to be replaced with user role later
    if (key == "01135813") {
      Company.findOneAndRemove(
        { name:name, contactNumber:contactNumber, country:country },
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
              message: "Company Removed Successfully",
              data: data,
            });
          }
          if (data == null) {
            return res.status(200).json({
              success: false,
              message: "No company found",
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

  router.get("/getAllCompanies", (req, res) => {
    Company.find({}, (err, data) => {
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

module.exports = router