const express = require('express');
const problemRouter = express.Router();

// these 3 can only be done by admin
problemRouter.post("/create",ProblemCreate);
problemRouter.patch("/:id",ProblemUpdate);
problemRouter.delete("/:id",ProblemDelete);

// these 3 can be done by users
problemRouter.get("/:id",ProblemFetch);
problemRouter.get("/",AllProblemFetch);
problemRouter.get("/user",SolvedProblem);