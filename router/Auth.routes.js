const { Router } = require("express");
const {
  register,
  verify,
  login,
  logout,
  getAuth,
} = require("../controller/auth.controller");
const verifyRefreshToken = require("../middleware/refresh.middleware");

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/verify", verify);
authRouter.post("/login", login);
authRouter.post("/refresh", verifyRefreshToken);
authRouter.post("/logout", logout);
authRouter.get("/getAuth", getAuth);

module.exports = authRouter;
