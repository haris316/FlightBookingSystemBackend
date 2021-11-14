const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      max: 50,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    airlines: {
      type: Array,
      required: false,
    },
  });

  module.exports = companySchema