const mongoose = require('mongoose')


const airlineSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      max: 50,
    },
    shortForm: {
      type: String,
      required: true,
      max: 5,
    },
    logo: {
      type: String,
    },
    available: {
      type: Boolean,
    },
    featured: {
      type: Boolean,
    },
  });

  module.exports = airlineSchema