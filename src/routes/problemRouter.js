const express = require('express');
const problemRouter = express.Router();
const adminMiddleware = require('../middleware/adminMiddleware');
const CreateProblem = require('../controllers/userproblem');

// these 3 can only be done by admin
problemRouter.post("/create",adminMiddleware,CreateProblem);
// problemRouter.patch("/:id",UpdateProblem);
// problemRouter.delete("/:id",DeleteProblem);

// // these 3 can be done by users
// problemRouter.get("/:id",getProblembyID);
// problemRouter.get("/",getAllProblem);
// problemRouter.get("/user",SolvedProblembyUser);

module.exports = problemRouter;