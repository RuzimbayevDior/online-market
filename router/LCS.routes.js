/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - text
 *         - video_id
 *         - user_id
 *       properties:
 *         text:
 *           type: string
 *           description: The content of the comment
 *           example: "This is a great video!"
 *         video_id:
 *           type: string
 *           description: The ID of the video the comment belongs to
 *           example: "605c72d3e7781e23b8d4e7e1"
 *         user_id:
 *           type: string
 *           description: The ID of the user who made the comment
 *           example: "609b15eb29f1b55a887d3e72"
 *       example:
 *         text: "Awesome content!"
 *         video_id: "605c72d3e7781e23b8d4e7e1"
 *         user_id: "609b15eb29f1b55a887d3e72"
 */




/**
 * @swagger
 * components:
 *   schemas:
 *     Like:
 *       type: object
 *       required:
 *         - video_id
 *         - user_id
 *       properties:
 *         video_id:
 *           type: string
 *           description: ID of the liked video
 *           example: "65f8a3b29a3c1f002b8e4f10"
 *         user_id:
 *           type: string
 *           description: ID of the user who liked the video
 *           example: "65f8a4d59a3c1f002b8e4f11"
 *       example:
 *         video_id: "65f8a3b29a3c1f002b8e4f10"
 *         user_id: "65f8a4d59a3c1f002b8e4f11"
 */
const { Router } = require("express");
const {addComment , getShortComment , like }  = require("../controller/LCS.ctr");



const LCSRouter = Router();



/**
 * @swagger
 * /addComment:
 *   post:
 *     summary: Add a new comment
 *     description: Allows a user to add a comment to a video.
 *     tags:
 *       - Comments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *                 description: The content of the comment
 *                 example: "This is an amazing video!"
 *     responses:
 *       200:
 *         description: Successfully added a comment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Comment muvaffaqiyatli yuklandi!"
 *                 data:
 *                   $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Bad request or missing access token
 *       401:
 *         description: Unauthorized or invalid token
 */


LCSRouter.post('/addComment' , addComment);


/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     summary: Get comments for a video
 *     description: Retrieve all comments for a specific video using its ID.
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the video
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved comments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "found comments"
 *                 comments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Bad request or missing parameters
 */
LCSRouter.get('/comments/:id' , getShortComment);


/**
 * @swagger
 * /like/{id}:
 *   post:
 *     summary: Like or unlike a video
 *     description: Likes a video if it hasn't been liked yet, or removes the like if it's already liked.
 *     tags:
 *       - Likes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the video to like or unlike
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Like added or removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Liked"
 *       400:
 *         description: Access token not found or invalid request
 *       500:
 *         description: Internal server error
 */


LCSRouter.get('/like/:id' , like )
module.exports = LCSRouter;
