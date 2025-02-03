const { Router } = require("express");
const {
  register,
  verify,
  login,
  logout,
  profil,
} = require("../controller/Auth.ctr");


const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/verify", verify);
authRouter.post("/login", login);
// authRouter.post("/refresh");
authRouter.post("/logout", logout);
authRouter.get("/getAuth", profil);

module.exports = authRouter;
