//Imports.
const router = require("express").Router();

//Grab routes.
const userRoutes = require("./userRoutes");
const projectRoutes = require("./projectRoutes");

//Set middleware.
router.use("/users", userRoutes);
router.use("/projects", projectRoutes);

//Exports.
module.exports = router;