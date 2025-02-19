const ShortSchema = require('../Schema/shorts.schema')
const jwt = require("jsonwebtoken");
const BaseError = require("../utils/error");
require("dotenv").config();
const path = require("path");
const CommentSchema = require('../Schema/comment.schema');

const addComment = async (req, res, next) => {
  try {


    const accessToken = req.cookies["accesstoken"];
    if (!accessToken) {
      throw BaseError.BadRequest("Access token not found");
    }
    const decoded = jwt.verify(accessToken, process.env.SECRET_ACCESS_KEY);
    const user_id = decoded.id;

      const { text } = req.body;
      const id = req.params
      const video_id = id

      const newComment = shortsSchema({
        text,
        video_id,
        user_id
      });
      await newComment.save();

      res.json({ message: "Comment muvaffaqiyatli yuklandi!", data: newComment });
    
  } catch (error) {
    next(error);
  }
};


const getVideoComment = async (req, res, next) => {
    try {
        const {id} = req.params
        const comments = await CommentSchema.find({ video_id : id})

        res.status(200).json({
            message: "found comments",
            comments
        })
    } catch (error) {
        next(error);
    }
}

module.exports = { addComment , getVideoComment}