//Imports.
const router = require("express").Router();
const { getProjects } = require("./projectsGrabber");

//Home.
router.get("/", (req, res) =>
{
    res.render("home");
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

    res.render("portfolio", { projects });
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