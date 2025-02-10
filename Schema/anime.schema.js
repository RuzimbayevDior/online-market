const { Schema, model } = require("mongoose");

const AnimeSchema = new Schema(
  {
   data : {
    type : Number,
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
   eye : {
    type : Number,
    required : true,
   },
   director : {
    type : String,
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
    type : String
   },
   banner : {
    type : String
   },
   animeImage : {
    type : String
   }


  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("anime", AnimeSchema);
