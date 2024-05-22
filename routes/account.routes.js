const express = require("express");
const {
  createNewAccount,
  updateExistingAccount,
  deleteSingleAccount,
  readSingleAccount,
  readMultipleAccounts,
  generateOTPForAccount,
  verifyOTPForAccount,
  logInToAccount,
  logoutFromSingleAccount,
  changeAccountPassword,
  resetAccountPassword,
  changeAccountCredits,
} = require("../controllers/account.controllers");
const { isUser } = require("../middlewares/auth.middlewares");

const accountRouter = express.Router();

accountRouter.get("/test", (req, res) => {
  res.send("This Router is working");
});

//green-f// Create New Account - POST - /
accountRouter.post("/", createNewAccount);
//green-f// Update Account - PUT - /
accountRouter.put("/", updateExistingAccount);
//green-u// Delete Single Account - DELETE - /
accountRouter.delete("/", deleteSingleAccount);
//green-u// Read Single Account - GET - /
accountRouter.get("/", readSingleAccount);
//green-u// Read Multiple Accounts - GET - /multiple
accountRouter.get("/multiple", readMultipleAccounts);
//green-u// Generate OTP - PUT - /otp
accountRouter.put("/otp", generateOTPForAccount);
//green-u// Verify OTP - GET - /otp
accountRouter.get("/otp", verifyOTPForAccount);
//red-u// Change Password - PUT - /password
accountRouter.put("/password", changeAccountPassword);

//red-u// Forgot Password - GET - /password
accountRouter.get("/password", resetAccountPassword);

//green-f// Login - POST - /login
accountRouter.post("/login", logInToAccount);
//green-u// Logout from single account on single device - PUT - /logout
accountRouter.put("/logout", isUser, logoutFromSingleAccount);
//green-u// Change the credits on an account - PUT - /credit
accountRouter.put("/credit", isUser, changeAccountCredits);
//orange-u// Logout from multiple accounts on single device - PUT - /logout/all
//orange-u// Logout from single account on multiple devices - PUT - /logout/multiple
//orange-u// Delete Multiple Accounts - DELETE - /multiple

module.exports = accountRouter;
