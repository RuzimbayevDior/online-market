const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    name: {
      type: String,
    },
    last_name: {
        type: String,
      },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
      enum: {
        values: ["user", "admin", "superadmin"],
        message: "{VALUE} - this is not found",
      },
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
