const { Router } = require("express");
const addAnime = require("../controller/createAnime.ctr");
const upload = require("../middleware/upload.middleware")

const AnimeRouter = Router();

AnimeRouter.post("/addAnime",upload.fields([
    { name: "bannerImg", maxCount: 1 },
    { name: "animeFotoImg", maxCount: 1 },
    {name: "trailer", maxCount: 1 },
]), addAnime);


module.exports = AnimeRouter;
