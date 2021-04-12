//Imports.
const router = require("express").Router();

//Home.
router.get("/", (req, res) =>
{
    res.status(200).json({ message: "Hello, World!" });
});

//Exports.
module.exports = router;