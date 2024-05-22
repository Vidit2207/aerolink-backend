const mongoose = require("mongoose");

const accountSchema = mongoose.Schema(
  {
    //yellow-u// Define the Schema Here
    first_name: {
      type: String,
      trim: true,
    },
    middle_name: {
      type: String,
    },
    last_name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    user_id: {
      type: String,
      trim: true,
      unique: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    credit: {
      type: Number,
    },
    password: {
      type: String,
    },
    otp: {
      type: String,
    },
    tokens: [
      {
        token: {
          type: String,
          unique: true,
        },
      },
    ],
  },
  {
    //yellow-u// Options like Timestamps Ho Here
    timestamps: true,
  }
);

const AccountCollection = mongoose.model("account-data", accountSchema);

module.exports = AccountCollection;
