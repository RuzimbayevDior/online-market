const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
      enum: {
        values: ["user","premium_user", "admin", "superadmin"],
        message: "{VALUE} - this is not found",
      },
    },
    premium: {
      type: String,
      enum:{
        values: ["free","1_oylik", "3_oylik", "6_oylik", "12_oylik"],
        message: "{VALUE} - this is not found",
      }
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verify_code: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("users", UserSchema);
