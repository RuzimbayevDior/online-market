const { Router } = require("express");
const {
  register,
  verify,
  login,
  logout,
  profil,
} = require("../controller/Auth.ctr");


const AuthRouter = Router();

AuthRouter.post("/register", register);
AuthRouter.post("/verify", verify);
AuthRouter.post("/login", login);
// authRouter.post("/refresh");
AuthRouter.post("/logout", logout);
AuthRouter.get("/getAuth", profil);

module.exports = AuthRouter;
