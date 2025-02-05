const AnimeSchema = require("../Schema/anime.schema");

const addAnime = async (req, res, next) => {
  try {
    const accessToken = req.cookies["accesstoken"];
    const decoded = jwt.verify(accessToken, process.env.SECRET_ACCESS_KEY);

    console.log(decoded);

    if (decoded.role == "admin") {
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
      } = req.body;

      const model = await carModelSchema.findOne({ _id: marka });

      if (!model) {
        throw BaseError.BadRequest("Model mavjud emas!");
      }

      await carSchema.create({
        data,
        name,
        desc,
        genre,
        eye,
        director,
        part,
        category,
        country,
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


module.exports = addAnime;