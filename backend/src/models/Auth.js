const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    match: [
      /^[A-Za-z]{2,30}(?: [A-Za-z]{2,30})?$/,
      "First name must contain only letters and a single space (optional)",
    ],
  },

  lastName: {
    type: String,
    required: true,
    trim: true,
    match: [
      /^[A-Za-z]{2,30}(?: [A-Za-z]{2,30})?$/,
      "Last name must contain only letters and a single space (optional)",
    ],
  },

  Email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
      "Please enter a valid email address",
    ],
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
    
  },
},
  {
    timestamps: true,
  });

const authModel = mongoose.model("auth", AuthSchema);
module.exports = authModel;
