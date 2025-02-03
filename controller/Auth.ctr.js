const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const authSchema = require("../schema/auth.schema");
require("dotenv").config();
const {
  generatAccessToken,
  generateRefreshToken,
} = require("../utils/generate");
const BaseError = require("../utils/error");
const carSchema = require("../schema/car.schema");
const carsModelSchema = require("../schema/carsModel.schema");

const register = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    const foundUser = await authSchema.findOne({ email });

    if (foundUser) {
      throw BaseError.BadRequest("Bu foydalanuvchi avval ro`yxatdan o`tgan");
    }

    const transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL,
        pass: process.env.PASSKEY,
      },
    });

    const generateCode = await Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");

    const send = {
      from: process.env.GMAIL,
      to: email,
      subject: "test",
      html: `<p>${generateCode}</p>`,
    };

    await transporter.sendMail(send, (error, info) => {
      if (error) {
        return res.json({
          message: error.message,
        });
      } else {
        return res.json({
          message: info.response,
        });
      }
    });

    const hash = await bcrypt.hash(password, 12);

    const findUser = await authSchema.create({
      username,
      email,
      password: hash,
      verify_code: generateCode,
    });

    setTimeout(async () => {
      await authSchema.findByIdAndUpdate(findUser._id, { verify_code: "" });
    }, 60 * 1000);
    res.json({
      message: "Registered",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verify = async (req, res, next) => {
  try {
    const { email, verify_code } = req.body;

    const findUser = await authSchema.findOne({ email });

    if (!findUser) {
      throw BaseError.BadRequest("User not found");
    }

    if (findUser.verify_code === verify_code) {
      await authSchema.findByIdAndUpdate(findUser._id, {
        verify: true,
        verify_code: "",
      });

      return res.json({
        message: "Verified",
      });
    } else {
      throw BaseError.BadRequest("Your verify code is invalid");
    }
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const findUser = await authSchema.findOne({ email });

    if (!findUser) {
      throw BaseError.BadRequest("User not found");
    }

    const checkerPassword = await bcrypt.compare(password, findUser.password);

    if (!checkerPassword) {
      throw BaseError.BadRequest("invalid password");
    }

    if (findUser.verify == true) {
      const accesstoken = await generatAccessToken({
        email: findUser.email,
        id: findUser._id,
        role: findUser.role,
      });
      const refreshtoken = await generateRefreshToken({
        email: findUser.email,
        id: findUser._id,
        role: findUser.role,
      });

      res.cookie("accesstoken", accesstoken, {
        httpOnly: true,
        maxAge: process.env.COOKIE_ACCESS,
      });
      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        maxAge: process.env.COOKIE_REFRESH,
      });

      return res.json({
        message: "Successfully",
        token: {
          accesstoken,
        },
      });
    } else {
      throw BaseError.BadRequest("You were not verified ");
    }
  } catch (error) {
    next(error);
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("accesstoken");
    res.clearCookie("refreshtoken");

    res.json({
      message: "Successfully logged out",
    });
  } catch (error) {
    throw BaseError.BadRequest("There is an Error");
  }
};

const getAuth = async (req, res, next) => {
  try {
    const email = req.body.email;
    const user = await authSchema.findOne({ email: email });

    if (!user) {
      throw BaseError.BadRequest("user not found");
    }
    if (user.role == "admin") {
      const cars = await carSchema.find({ adminID: user._id });
      const models = await carsModelSchema.find({ adminID: user._id });

      return res.json({
        message: "success",
        id: user._id,
        email: user.email,
        role: user.role,
        cars: cars,
        models: models,
      });
    }
    res.json({
      message: "success",
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  verify,
  login,
  logout,
  getAuth,
};
