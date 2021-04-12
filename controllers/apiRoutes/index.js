//Imports.
const router = require("express").Router();

//Grab routes.
const userRoutes = require("./userRoutes");

//Set middleware.
router.use("user", userRoutes);

//Exports.
module.exports = router;