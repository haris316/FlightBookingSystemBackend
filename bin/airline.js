const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const airlineSchema = require('../../models/airilneSchema')

const Airline = new mongoose.model("Airline", airlineSchema);

router.post("/newAirline", (req, res) => {
    const { name, featured, available, shortForm } = req.body;
    Airline.findOne({ name: name }, (err, data) => {
      if (err) {
        return res.status(200).json({
          success: false,
          message:
            "There was an error connecting to the database. Please try again",
        });
      }
      if (data) {
        return res.status(200).json({
          success: false,
          message: "Airline already exists",
        });
      }
      const logo =
        "https://cdn4.iconfinder.com/data/icons/ballicons-2-new-generation-of-flat-icons/100/airplane-512.png";
      const newairline = new Airline({
        name,
        featured,
        available,
        logo,
        shortForm,
      });
      newairline.save((err, data) => {
        if (err) {
          return res.status(200).json({
            success: false,
            err: err,
            message: "Airline cannot be created. Please try again",
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

  router.get("/getFeatured", (req, res) => {
    Airline.find({ featured: true }, (err, data) => {
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

  router.get("/getAvailable", (req, res) => {
    Airline.find({ available: true }, (err, data) => {
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

  router.get("/getAllAirlines", (req, res) => {
    Airline.find({}, (err, data) => {
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

  router.post("/removeAirline", (req, res) => {
    const { name, shortForm } = req.body;
    Airline.findOneAndRemove(
      { name: name, shortForm: shortForm },
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
            message: "Airline Removed Successfully",
            data: data,
          });
        }
        if (data == null) {
          return res.status(200).json({
            success: false,
            message: "No airline found",
          });
        }
      }
    );
  });

module.exports = router