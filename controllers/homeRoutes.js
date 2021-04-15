//Imports.
const router = require("express").Router();

//Home.
router.get("/", (req, res) =>
{
    res.render("home");
});

//Portfolio.
router.get("/portfolio", (req, res) =>
{
    res.render("portfolio");
});

//Contact.
router.get("/contact", (req, res) =>
{
    res.render("contact");
});

//Login.
router.get("/login", (req, res) =>
{
    //TODO
});

//Sign up.
router.get("/signup", (req, res) =>
{
    //TODO
});

//Everything else / 404 page someday.
router.get("*", (req, res) =>
{
    res.redirect("/");
});

//Exports.
module.exports = router;