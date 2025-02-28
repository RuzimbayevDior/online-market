const ShortSchema = require('../Schema/shorts.schema')
const jwt = require("jsonwebtoken");
const BaseError = require("../utils/error");
require("dotenv").config();
const path = require("path");
const shortsSchema = require('../Schema/shorts.schema');

const addShort = async (req, res, next) => {
  try {
    const accessToken = req.cookies["accesstoken"];

    if (!accessToken) {
      throw BaseError.BadRequest("Access token not found");
    }
    const decoded = jwt.verify(accessToken, process.env.SECRET_ACCESS_KEY);

    if (decoded.role == "admin" || decoded.role == "superadmin") {

      const { desc, shortVideo} = req.body;
      const banner = req.files["banner"] ? req.files["banner"][0].path : null
      const video = req.files['shortVideo'] ? req.files['shortVideo'][0].path : null


        const serverUrl = `${req.protocol}://${req.get('host')}/`;


      const newShort = shortsSchema({
        desc,
        shortVideo: serverUrl + video.replace(/\\/g, "/")
      });
      await newShort.save();

      res.json({ message: "Short muvaffaqiyatli yuklandi!", data: newShort });
    } else {
      throw BaseError.BadRequest("You were not admin");
    }
  } catch (error) {
    next(error);
  }
};



const getShorts = async (req, res, next) => {
  try {
    const shorts = await ShortSchema.find();
    res.status(200).json(shorts);
  } catch (error) {
    res.status(500).json({ error: "Ma’lumotlarni olishda xatolik", details: error.message });
  }
};

module.exports = { addShort , getShorts }