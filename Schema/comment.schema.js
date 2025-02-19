

const { Schema, model } = require("mongoose");

const CommentSchema = new Schema(
  {
   text : {
    type : String,
    required : true,
   },
   video_id : {
    type : String,
    required : true,
   },
   user_id : {
    type : String,
    required : true,
   }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("comments", CommentSchema);
