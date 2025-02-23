

const { Schema, model } = require("mongoose");

const LikeSchema = new Schema(
  {
   
   video_id : {
    type : String,
    required : true,
   },
   user_id : {
    type : String,
    required : true,
   },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("likes", LikeSchema);
