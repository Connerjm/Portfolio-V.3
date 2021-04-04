const router = require("express").Router();

//Home
router.get("/", (req, res) =>
{
    res.status(200).json({ message: "Hello, World!" });
});

module.exports = router;