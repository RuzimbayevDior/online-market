const { Router } = require("express");
const {appointment, dismissal , getUsers} = require("../controller/superAdmin.ctr")


const superAdminRouter = Router();

superAdminRouter.get("/getUsers", getUsers);
superAdminRouter.post("/appointment", appointment);
superAdminRouter.post("/dismissal", dismissal);



module.exports = superAdminRouter;
