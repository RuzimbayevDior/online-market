const jwt = require("jsonwebtoken");
const UserSchema = require("../Schema/user.schema");
require("dotenv").config();
const BaseError = require("../utils/error");

const appointment = async (req, res, next) => {
  try {
    const accessToken = req.cookies["accesstoken"];
    const decoded = jwt.verify(accessToken, process.env.SECRET_ACCESS_KEY);

    if (decoded.role == "superadmin") {
      const { id } = req.body;

      const findUser = await UserSchema.findOne({ _id : id });

      if (!findUser) {
        throw BaseError.BadRequest("User not found");
      }
      if (findUser.role == "admin") {
        throw BaseError.BadRequest("this user is admin!");
      }
      findUser.role = "admin";
      await findUser.save();
      return res.json({
        message: "Successfully changed user role to admin",
        user: findUser,
      });
    } else {
      throw BaseError.BadRequest("you where not superadmin");
    }
  } catch (error) {
    next(error);
  }
};

const dismissal = async (req, res, next) => {
  try {
    const accessToken = req.cookies["accesstoken"];
    const decoded = jwt.verify(accessToken, process.env.SECRET_ACCESS_KEY);

    if (decoded.role == "superadmin") {
      const { id } = req.body;

      const findUser = await UserSchema.findOne({ _id : id });

      if (!findUser) {
        throw BaseError.BadRequest("User not found");
      }
      if (findUser.role == "user") {
        throw BaseError.BadRequest("this user is user!");
      }

      findUser.role = "user";

      await findUser.save();
      return res.json({
        message: "Successfully changed admin role to user",
        user: findUser,
      });
    } else {
      throw BaseError.BadRequest("you where not superadmin");
    }
  } catch (error) {
    next(error);
  }
};



const getUsers  = async(req, res , next) => {
    try {
      const accessToken = req.cookies["accesstoken"];
      const decoded = jwt.verify(accessToken, process.env.SECRET_ACCESS_KEY);
      
      if (decoded.role == "superadmin") {
        const users = await UserSchema.find();
        res.json({ users });
      } else {
        throw BaseError.BadRequest("you where not superadmin");
      }
    } catch (error) {
      next(error);
    }
}




module.exports = { appointment, dismissal , getUsers};
