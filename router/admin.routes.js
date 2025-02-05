const { Router } = require("express");
const addAnime = require("../controller/createAnime.ctr");


const AnimeRouter = Router();

AnimeRouter.post("/addAnime", addAnime);


module.exports = AnimeRouter;
