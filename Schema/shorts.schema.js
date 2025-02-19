const { Schema, model } = require("mongoose");

const ShortSchema = new Schema(
  {
   desc : {
    type : String,
    required : true,
   },
   shortVideo : {
    type : String,
    required : true,
    required : true,
   },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("shorts", ShortSchema);

