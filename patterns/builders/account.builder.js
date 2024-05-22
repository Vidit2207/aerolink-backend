const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { AccountCollection } = require("../../models");
const { PrismLogger } = require("prism-logger");
class Account {
  first_name;
  middle_name;
  last_name;
  user_id;
  email;
  credit;
  phone;
  otp;
  password;
  tokens;
  createdAt;
  updatedAt;

  constructor() {
    this.first_name = "";
    this.middle_name = undefined;
    this.last_name = "";
    this.user_id = "";
    this.email = "";
    this.phone = "";
    this.credit = 1000;
    // TODO: Generate Random Password
    this.password = "";
    this.otp = "";
    this.tokens = [];
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  setFirstName(value) {
    //Validate Value
    //Capitalize Name
    this.first_name = value;
    return this;
  }
  setMiddleName(value) {
    //Validate Value
    //Capitalize Name
    this.middle_name = value;
    return this;
  }
  setLastName(value) {
    //Validate Value
    //Capitalize Name
    this.last_name = value;
    return this;
  }
  setUserID(value) {
    //Validate Value
    this.user_id = value;
    return this;
  }
  generateUserID() {
    // TODO: Generate Random User ID
    this.user_id = `${Math.floor(Math.random() * 9000 + 1000)}${Math.floor(
      Math.random() * 9000 + 1000
    )}${Math.floor(Math.random() * 9000 + 1000)}${Math.floor(
      Math.random() * 9000 + 1000
    )}`;
    return this;
  }
  setEmail(value) {
    //Validate Value
    this.email = value;
    return this;
  }
  setCredit(value) {
    //Validate Value
    this.credit = value;
    return this;
  }
  setPhone(value) {
    //Validate Value
    this.phone = value;
    return this;
  }
  setPassword(value) {
    //Validate Value
    this.password = value;
    return this;
  }
  generatePassword() {
    // TODO: Generate Random Password
    this.password = "Test@1234";
    return this;
  }
  setOTP(value) {
    //Validate Value
    this.otp = value;
    return this;
  }
  generateOTP() {
    // TODO: Generate Random OTP
    this.otp = "12345678";
    return this;
  }
  setTokens(value) {
    //Validate Value
    this.tokens = value;
    return this;
  }
  addNewAuthToken(email = undefined) {
    //Validate email
    const token = jwt.sign(
      { email: email || this.email },
      process.env.AUTH_SECRET_KEY
    );
    this.tokens.push({ token });
    return this;
  }

  setCreatedAt(value) {
    //Validate Value
    this.createdAt = new Date(value);
    return this;
  }
  setUpdatedAt(value) {
    //Validate Value
    this.updatedAt = new Date(value);
    return this;
  }
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
    return this;
  }
  async isValidPassword(password) {
    return await bcrypt.compare(password, this.password);
  }

  setAccountData(data) {
    const {
      first_name,
      middle_name,
      last_name,
      user_id,
      phone,
      credit,
      email,
      otp,
      tokens,
      password,
      createdAt,
      updatedAt,
    } = data;
    if (first_name) {
      this.setFirstName(first_name);
    }
    if (middle_name) {
      this.setMiddleName(middle_name);
    }
    if (last_name) {
      this.setLastName(last_name);
    }
    if (user_id) {
      this.setUserID(user_id);
    }
    if (phone) {
      this.setPhone(phone);
    }
    if (credit) {
      this.setCredit(credit);
    }
    if (email) {
      this.setEmail(email);
    }
    if (otp) {
      this.setOTP(otp);
    }
    if (tokens) {
      this.setTokens(tokens);
    }
    if (password) {
      this.setPassword(password);
    }
    if (createdAt) {
      this.setCreatedAt(createdAt);
    }
    if (updatedAt) {
      this.setUpdatedAt(updatedAt);
    }

    return this;
  }

  getPublicData() {
    return {
      first_name: this.first_name,
      middle_name: this.middle_name,
      last_name: this.last_name,
      user_id: this.user_id,
      credit: this.credit,
      email: this.email,
      phone: this.phone,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  async create() {
    try {
      const data = new AccountCollection({
        first_name: this.first_name,
        middle_name: this.middle_name,
        last_name: this.last_name,
        email: this.email,
        user_id: this.user_id,
        credit: this.credit,
        phone: this.phone,
        password: this.password,
        tokens: this.tokens,
      });

      const savedData = await data.save();
      //   this.first_name = savedData.first_name;
      //   this.middle_name = savedData.middle_name;
      //   this.last_name = savedData.last_name;
      //   this.email = savedData.email;
      //   this.phone = savedData.phone;
      //   this.password = savedData.password;
      //   this.tokens = savedData.tokens;
      //   this.createdAt = savedData.createdAt;
      //   this.updatedAt = savedData.updatedAt;

      this.setAccountData(savedData);

      PrismLogger.success("New Account Created: " + this.email);
      return this;
    } catch (error) {
      PrismLogger.error(error);
      throw new Error("Error in Create New Account");
    }
  }
  async read(query = undefined) {
    try {
      const data = await AccountCollection.findOne({
        email: query || this.email,
      });
      if (!data) {
        throw new Error("Account not found");
      }
      //   this.first_name = data.first_name;
      //   this.middle_name = data.middle_name;
      //   this.last_name = data.last_name;
      //   this.email = data.email;
      //   this.phone = data.phone;
      //   this.password = data.password;
      //   this.tokens = data.tokens;
      //   this.createdAt = data.createdAt;
      //   this.updatedAt = data.updatedAt;
      this.setAccountData(data);
      return this;
    } catch (error) {
      PrismLogger.error(error);
      throw new Error("Error in Read Account");
    }
  }
  async update() {
    try {
      const data = {
        first_name: this.first_name,
        middle_name: this.middle_name,
        last_name: this.last_name,
        email: this.email,
        user_id: this.user_id,
        credit: this.credit,
        phone: this.phone,
        otp: this.otp,
        password: this.password,
        tokens: this.tokens,
      };

      const updatedData = await AccountCollection.findOneAndUpdate(
        { email: this.email },
        data,
        { new: true }
      );
      //   this.first_name = updatedData.first_name;
      //   this.middle_name = updatedData.middle_name;
      //   this.last_name = updatedData.last_name;
      //   this.email = updatedData.email;
      //   this.phone = updatedData.phone;
      //   this.password = updatedData.password;
      //   this.tokens = updatedData.tokens;
      //   this.createdAt = updatedData.createdAt;
      //   this.updatedAt = updatedData.updatedAt;

      this.setAccountData(updatedData);

      PrismLogger.success("Account Updated: " + this.email);
      return this;
    } catch (error) {
      PrismLogger.error(error);
      throw new Error("Error in Update Account");
    }
  }
  async delete(query = undefined) {
    try {
      const deletedData = await AccountCollection.findOneAndDelete({
        email: query || this.email,
      });
      //   this.first_name = deletedData.first_name;
      //   this.middle_name = deletedData.middle_name;
      //   this.last_name = deletedData.last_name;
      //   this.email = deletedData.email;
      //   this.phone = deletedData.phone;
      //   this.password = deletedData.password;
      //   this.tokens = deletedData.tokens;
      //   this.createdAt = deletedData.createdAt;
      //   this.updatedAt = deletedData.updatedAt;
      this.setAccountData(deletedData);

      PrismLogger.success("Account Deleted: " + this.email);
      return this;
    } catch (error) {
      PrismLogger.error(error);
      throw new Error("Error in Delete Account");
    }
  }

  //   static async deleteMultiple() {
  //     try {
  //       const data = await AccountCollection.deleteMany({})
  //       if (!data || data.length < 1) {
  //         throw new Error("No Account found");
  //       }
  //       return data;
  //     } catch (error) {
  //       PrismLogger.error(error);
  //       throw new Error("Error in Read All Accounts");
  //     }
  //   }
  static async readMultiple() {
    try {
      const data = await AccountCollection.find({});
      if (!data || data.length < 1) {
        throw new Error("No Account found");
      }
      return data;
    } catch (error) {
      PrismLogger.error(error);
      throw new Error("Error in Read All Accounts");
    }
  }
}
module.exports = Account;
