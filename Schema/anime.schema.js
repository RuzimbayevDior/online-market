const { Schema, model } = require("mongoose");

const AnimeSchema = new Schema(
  {
   data : {
    type : String,
    required : true,
   },
   name : {
    type : String,
    required : true,
   },
   desc : {
    type : String,
    required : true,
   },
   genre : {
    type : String,
    required : true,
   },
   eye : {
    type : Number,
    required : true,
   },
   director : {
    type : String,
    required : true,
   },
   part : {
    type : Number,
    required : true,
   },
   category : {
    type : String,
    required : true,
    enum: {
      values: ["Drama", "Komediya", "Shatranj", "Dizi", "Aksiyon", "Kriminal"],
      message: "{VALUE} - this is not found",
    },
   },
   country : {
    type : String,
    required : true,
   },
   trailer : {
    type : String,
    required : true,
   },
   bannerImg : {
    type : String,
    required : true,
   },
   animeFotoImg : {
    type : String,
    required : true,
   }


  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("users", UserSchema);
