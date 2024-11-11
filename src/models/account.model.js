const mongoose = require("mongoose");

const accountSchema = mongoose.Schema(
  {
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
    timestamps: true,
  }
);

const AccountModel = mongoose.model("account-data", accountSchema);

module.exports = AccountModel;
