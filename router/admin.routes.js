const { Router } = require("express");
const {addAnime , getAnime}  = require("../controller/createAnime.ctr");
const upload = require("../middleware/upload.middleware")


const AnimeRouter = Router();

AnimeRouter.post('/addAnime', upload.fields([
    { name: 'banner', maxCount: 1 },
    { name: 'animeImage', maxCount: 1 },
    { name: 'trailer', maxCount: 1 }
]), addAnime);

AnimeRouter.get("/getAnime", getAnime);
module.exports = AnimeRouter;
