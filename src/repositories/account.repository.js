const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Validator, Formatter, Generator } = require("../helpers");
const { AccountModel } = require("../models");

class AccountRepository {
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

  constructor(data = undefined) {
    if (data && typeof data == "object") {
      this.first_name = data.first_name;
      this.middle_name = data.middle_name;
      this.last_name = data.last_name;
      this.user_id = data.user_id;
      this.phone = data.phone;
      this.email = data.email;
      this.password = data.password;
      this.credit = data.credit;
      this.tokens = data.tokens;
      this.otp = data.otp;
    }
  }

  setCreatedAt(date) {
    this.createdAt = new Date(date);
  }
  setUpdatedAt(date) {
    this.updatedAt = new Date(date);
  }

  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
    return this;
  }

  async verifyPassword(password) {
    try {
      if (!(await bcrypt.compare(password, this.password))) {
        throw new Error("Incorrect Credentials");
      }
    } catch (error) {
      console.log("Error - AccountRepository - VerifyPassword");
      throw error;
    }
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
      this.first_name = first_name;
    }
    if (middle_name) {
      this.middle_name = middle_name;
    }
    if (last_name) {
      this.last_name = last_name;
    }
    if (user_id) {
      this.user_id = user_id;
    }
    if (phone) {
      this.phone = phone;
    }
    if (credit) {
      this.credit = credit;
    }
    if (email) {
      this.email = email;
    }
    if (otp) {
      this.otp = otp;
    }
    if (tokens) {
      this.tokens = tokens;
    }
    if (password) {
      this.password = password;
    }
    if (createdAt) {
      this.createdAt = createdAt;
    }
    if (updatedAt) {
      this.updatedAt = updatedAt;
    }

    return this;
  }

  getPublicData() {
    // return this;
    // TODO: Uncomment Later
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

  // CRUD
  async create() {
    try {
      await this.hashPassword();
      const data = new AccountModel(this);
      const account = await data.save();
      this.setAccountData(account);
      console.log("New Account Created: " + this.email);
      return this;
    } catch (error) {
      console.log("Error - Account Repository - Create");
      throw error;
    }
  }

  async read(query = {}) {
    const test = {
      $or: [{ email: query || this.email }, { user_id: query || this.user_id }],
    };
    try {
      const account = await AccountModel.findOne(query);
      if (!account) return false;
      this.setAccountData(account);
      console.log("Account Read: " + this.email);
      return this;
    } catch (error) {
      console.log("Error - Account Builder - Read");
      throw error;
    }
  }

  async mustExist(query = {}) {
    try {
      const account = await AccountModel.findOne(query);
      if (!account) throw new Error("Account does not exist");
      this.setAccountData(account);
      //   console.log("Account Read: " + this.email);
      return this;
    } catch (error) {
      console.log("Error - Account Repository - Must Exist");
      throw error;
    }
  }
  async mustNotExist(query = {}) {
    try {
      const account = await AccountModel.findOne(query);
      if (account) throw new Error("Account already exists");
    } catch (error) {
      console.log("Error - Account Builder - Must Not Exist");
      throw error;
    }
  }

  async update(query) {
    try {
      const account = await AccountModel.findOneAndUpdate(query, this, {
        new: true,
      });
      this.setAccountData(account);
      console.log("Account Updated: " + this.email);
      return this;
    } catch (error) {
      console.log("Error - Account Builder - Update");
      throw error;
    }
  }

  async delete() {
    try {
      const account = await AccountModel.findOneAndDelete(this);
      if (!account) return false;
      this.setAccountData(account);
      console.log("Account Deleted: " + this.email);
      return this;
    } catch (error) {
      console.log("Error - Account Builder - Delete");
      throw error;
    }
  }

  static Builder = class {
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

    constructor(data = undefined) {
      if (data && typeof data == "object") {
        this.setAccountData(data);
      }
    }

    setDefault() {
      this.setUserID(Generator.generateUserID())
        .setCredit(1000)
        .setOTP(Generator.generateOTP())
        .setPassword(Generator.generatePassword())
        .setTokens([]);
      return this;
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

      return this;
    }

    // Setters
    setFirstName(value) {
      Validator.cannotBeEmpty(value);
      value = Formatter.capitalizeWord(value);
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
      Validator.cannotBeEmpty(value);
      value = Formatter.capitalizeWord(value);
      this.last_name = value;
      return this;
    }

    setUserID(value) {
      //Validate Value
      Validator.isValidUserID(value);
      this.user_id = value;
      return this;
    }

    setEmail(email) {
      Validator.isEmail(email);
      this.email = email;
      return this;
    }
    setCredit(value) {
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
    setOTP(value) {
      //Validate Value
      this.otp = value;
      return this;
    }
    setTokens(value) {
      //Validate Value
      this.tokens = value;
      return this;
    }

    // Getters
    getFirstName() {
      return this.first_name;
    }
    getMiddleName() {
      return this.middle_name;
    }
    getLastName() {
      return this.last_name;
    }
    getUserID() {
      return this.user_id;
    }
    getPhone() {
      return this.phone;
    }
    getCredit() {
      return this.credit;
    }

    getEmail() {
      return this.email;
    }

    getOTP() {
      return this.otp;
    }

    getTokens() {
      return this.tokens;
    }

    getPassword() {
      return this.password;
    }

    // Generators and Verifiers
    addNewAuthToken(email = undefined) {
      //Validate email
      const token = jwt.sign(
        { email: email || this.email },
        process.env.AUTH_SECRET_KEY
      );
      this.tokens.push({ token });
      return this;
    }

    removeAuthToken(token) {
      this.tokens = this.tokens.filter((element) => element.token !== token);
      return this;
    }

    async verifyPassword(password) {
      return await bcrypt.compare(password, this.password);
    }

    build() {
      return new AccountRepository(this);
    }
  };
}
module.exports = AccountRepository;
