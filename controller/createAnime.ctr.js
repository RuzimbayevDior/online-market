const AnimeSchema = require("../Schema/anime.schema");
const jwt = require("jsonwebtoken");
const BaseError = require("../utils/error");
require("dotenv").config();
const path = require("path");

const addAnime = async (req, res, next) => {
  try {
    const accessToken = req.cookies["accesstoken"];

    if (!accessToken) {
      throw BaseError.BadRequest("Access token not found");
    }
    const decoded = jwt.verify(accessToken, process.env.SECRET_ACCESS_KEY);

    if (decoded.role == "admin" || decoded.role == "superadmin") {
      const { name, data, director, eye, country, desc, category } = req.body;
      const banner = req.files["banner"] ? req.files["banner"][0].path : null;
      const animeImage = req.files["animeImage"]
        ? req.files["animeImage"][0].path
        : null;
      const trailer = req.files["trailer"]
        ? req.files["trailer"][0].path
        : null;


        const serverUrl = `${req.protocol}://${req.get('host')}/`;


      const newAnime = AnimeSchema({
        name,
        data,
        eye,
        director,
        country,
        desc,
        banner: serverUrl + banner.replace(/\\/g, "/"),
        category,
        animeImage : serverUrl + animeImage.replace(/\\/g, "/"),
        trailer : serverUrl + trailer.replace(/\\/g, "/"),
      });
      await newAnime.save();

      res.json({ message: "Anime muvaffaqiyatli yuklandi!", data: newAnime });
    } else {
      throw BaseError.BadRequest("You were not admin");
    }
  } catch (error) {
    next(error);
  }
};

const getAnime = async (req, res) => {
  try {
    const animes = await AnimeSchema.find();
    res.json(animes);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ma’lumotlarni olishda xatolik", details: error.message });
  }
};

module.exports = { addAnime, getAnime };
