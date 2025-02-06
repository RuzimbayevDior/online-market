const AnimeSchema = require("../Schema/anime.schema");
const jwt = require("jsonwebtoken");
const BaseError = require("../utils/error");
require('dotenv').config();
const path = require('path')

const addAnime = async (req, res, next) => {
  try {
    const accessToken = req.cookies["accesstoken"];

    if (!accessToken) {
      throw BaseError.BadRequest("Access token not found")
    }
    const decoded = jwt.verify(accessToken, process.env.SECRET_ACCESS_KEY);

    

    if (decoded.role == "admin" || decoded.role == "superadmin") {
      const {
        data,
        name,
        desc,
        genre,
        eye,
        director,
        part,
        category,
        country,
        // bannerImg
      } = req.body;


   
     
      if (!req.files || !req.files.bannerImg || !req.files.animeFotoImg || !req.files.trailer) {
        throw BaseError.BadRequest("Missing required files (bannerImg, animeFotoImg, trailer)");
      }
      // console.log(req.files.bannerImg[0]);
      
      const bannerImg = req.files.bannerImg[0].filename ;
      const animeFotoImg =  req.files.animeFotoImg[0].filename;
      const trailer =  req.files.trailer[0].filename ;
      
      // Faylning mavjudligini tekshirish
   
  

      const anime = await AnimeSchema.create({
        data,
        name,
        desc,
        genre,
        eye,
        director,
        part,
        category,
        country,
        bannerImg,
        animeFotoImg,
        trailer
      });
      return res.json({
        message: "Added Anime",
      });
    } else {
      throw BaseError.BadRequest("You were not admin");
    }
  } catch (error) {
    next(error);
  }
};















module.exports =addAnime  ;