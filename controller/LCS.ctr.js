const ShortSchema = require('../Schema/shorts.schema')
const jwt = require("jsonwebtoken");
const BaseError = require("../utils/error");
require("dotenv").config();
const path = require("path");
const CommentSchema = require('../Schema/comment.schema');
const LikeSchema = require('../Schema/like.schema');

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


const getShortComment = async (req, res, next) => {
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




const like = async (req, res, next) => {
  try {
    const {id} = req.params

    const accessToken = req.cookies["accesstoken"];
    if (!accessToken) {
      throw BaseError.BadRequest("Access token not found");
    }
    const decoded = jwt.verify(accessToken, process.env.SECRET_ACCESS_KEY);
    const user_id = decoded.id;
    const video_id = id;
    const like = await likeSchema.findOne({ user_id, video_id });
    if (like) {
      await likeSchema.findByIdAndDelete({ _id: like._id });
      return res.json({ message: "like delete successfully" });
    }
    await likeSchema.create({ user_id, car_id });
    res.json({
      message: "Liked",
    });
  } catch (error) {
    next(error)
  }
}





module.exports = { addComment , getShortComment , like}