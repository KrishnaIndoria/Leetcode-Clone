const express = require('express');
const problemRouter = express.Router();
const adminMiddleware = require('../middleware/adminMiddleware');
const userMiddleware = require('../middleware/userMiddleware');
const {CreateProblem,UpdateProblem,DeleteProblem,getProblembyID,getAllProblem} = require('../controllers/userproblem');

// these 3 can only be done by admin
problemRouter.post("/create",adminMiddleware,CreateProblem);
problemRouter.put("/update/:id",adminMiddleware,UpdateProblem);
problemRouter.delete("/delete/:id",adminMiddleware,DeleteProblem);

// these 3 can be done by users
problemRouter.get("/problemID/:id",userMiddleware,getProblembyID);
problemRouter.get("/getAllProblem",userMiddleware,getAllProblem);
// problemRouter.get("/solvedByUser",userMiddleware,SolvedProblembyUser);

module.exports = problemRouter;