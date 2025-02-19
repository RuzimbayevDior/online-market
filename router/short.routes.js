const { Router } = require("express");
const {addShort, getShorts}  = require("../controller/shorts.ctr");
const upload = require("../middleware/upload.middleware")


const ShortRouter = Router();

ShortRouter.post('/addShort', upload.fields([
    { name: 'shortVideo', maxCount: 1 }
]), addShort);

ShortRouter.get("/shorts", getShorts);
module.exports = ShortRouter;
