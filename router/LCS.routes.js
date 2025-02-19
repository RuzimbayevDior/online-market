const { Router } = require("express");
const {addComment , getVideoComment }  = require("../controller/comment.ctr");



const LCSRouter = Router();

LCSRouter.post('/addComment' , addComment);
LCSRouter.get('/comments/:id' , getVideoComment);

// LCSRouter.get("/shorts", getShorts);
module.exports = LCSRouter;
