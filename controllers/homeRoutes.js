//Imports.
const router = require("express").Router();
const { getProjects } = require("./projectsGrabber");
const auth = require("../utils/auth");

//Home.
router.get("/", (req, res) =>
{
    res.render("home", { logged_in: req.session.loggedIn });
});

//Portfolio.
router.get("/portfolio", async (req, res) =>
{
    const projects = await getProjects();

    projects.forEach(e =>
    {
        if (e.deployments.nodes.length > 0)
        {
            e.deployment = `https://connerjm.github.io/${e.url.split("/")[4]}/`;
        }
        delete e.deployments;
    });

    console.log(projects);

    res.render("portfolio", { projects, logged_in: req.session.loggedIn });
});

//Contact.
router.get("/contact", auth, (req, res) =>
{
    res.render("contact", { logged_in: req.session.loggedIn });
});

//Login.
router.get("/login", (req, res) =>
{
    if (req.session.loggedIn)
        res.redirect("/");
    else
        res.render("login");
});

//Sign up.
router.get("/signup", (req, res) =>
{
    if (req.session.loggedIn)
        res.redirect("/");
    else
        res.render("signup");
});

//Everything else / 404 page someday.
router.get("*", (req, res) =>
{
    res.redirect("/");
});

//Exports.
module.exports = router;