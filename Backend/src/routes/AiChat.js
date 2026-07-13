const express = require('express');
const AiRouter = express.Router();
const userMiddleware = require('../middleware/userMiddleware');
const solveDoubt = require('../controllers/solveDoubt');

AiRouter.post("/Chat",userMiddleware,solveDoubt);

module.exports = AiRouter;