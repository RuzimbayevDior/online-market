/**
 * @swagger
 * components:
 *   schemas:
 *     Short:
 *       type: object
 *       required:
 *         - desc
 *         - shortVideo
 *       properties:
 *         _id:
 *           type: string
 *           example: "65c3f74a2e4b4d001a4c9a72"
 *         desc:
 *           type: string
 *           description: Description of the short video
 *           example: "This is a short video description"
 *         shortVideo:
 *           type: string
 *           format: url
 *           description: URL of the uploaded short video
 *           example: "http://localhost:3000/uploads/video.mp4"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the short video was uploaded
 *           example: "2024-02-21T12:34:56.789Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the short video was last updated
 *           example: "2024-02-21T12:34:56.789Z"
 */




const { Router } = require("express");
const {addShort, getShorts}  = require("../controller/shorts.ctr");
const upload = require("../middleware/upload.middleware")


const ShortRouter = Router();


/**
 * @swagger
 * /addShort:
 *   post:
 *     summary: Upload a short video
 *     description: Allows admin or superadmin to upload a short video
 *     tags:
 *       - Shorts
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               desc:
 *                 type: string
 *                 description: Description of the short video
 *               banner:
 *                 type: string
 *                 format: binary
 *                 description: Optional banner image
 *               shortVideo:
 *                 type: string
 *                 format: binary
 *                 description: Short video file
 *     responses:
 *       200:
 *         description: Short video successfully uploaded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Short muvaffaqiyatli yuklandi!"
 *                 data:
 *                   type: object
 *                   properties:
 *                     desc:
 *                       type: string
 *                     shortVideo:
 *                       type: string
 *       400:
 *         description: Bad request (e.g., missing access token or invalid role)
 *       500:
 *         description: Server error
 */
ShortRouter.post('/addShort', upload.fields([
    { name: 'shortVideo', maxCount: 1 }
]), addShort);






/**
 * @swagger
 * /shorts:
 *   get:
 *     summary: Get all short videos
 *     description: Retrieves a list of all uploaded short videos.
 *     tags:
 *       - Shorts
 *     responses:
 *       200:
 *         description: A list of short videos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "65c3f74a2e4b4d001a4c9a72"
 *                   desc:
 *                     type: string
 *                     example: "This is a short video description"
 *                   shortVideo:
 *                     type: string
 *                     format: url
 *                     example: "http://localhost:3000/uploads/video.mp4"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Ma’lumotlarni olishda xatolik"
 *                 details:
 *                   type: string
 */
ShortRouter.get("/shorts", getShorts);
module.exports = ShortRouter;
