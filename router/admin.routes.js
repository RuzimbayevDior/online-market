/**
 * @swagger
 * components:
 *   schemas:
 *     Anime:
 *       type: object
 *       required:
 *         - data
 *         - name
 *         - desc
 *         - eye
 *         - director
 *         - category
 *         - country
 *       properties:
 *         data:
 *           type: number
 *           description: The release year of the anime
 *         name:
 *           type: string
 *           description: The title of the anime
 *         desc:
 *           type: string
 *           description: A short description of the anime
 *         eye:
 *           type: number
 *           description: View count
 *         director:
 *           type: string
 *           description: The director of the anime
 *         category:
 *           type: string
 *           enum: [Drama, Komediya, Shatranj, Dizi, Aksiyon, Kriminal]
 *           description: The genre of the anime
 *         country:
 *           type: string
 *           description: The country of origin
 *         trailer:
 *           type: string
 *           description: Trailer URL
 *         banner:
 *           type: string
 *           description: Banner image URL
 *         animeImage:
 *           type: string
 *           description: Main anime image URL
 */



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
