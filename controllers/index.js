//Imports.
const router = require("express").Router();

//Grab routes.
const apiRoutes = require("./apiRoutes");
const homeRoutes = require("./homeRoutes");

//Set the middleware.
router.use("/api", apiRoutes);
router.use("/", homeRoutes);

//Exports.
module.exports = router;