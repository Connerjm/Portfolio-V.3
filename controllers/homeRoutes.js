//Imports.
const router = require("express").Router();
const { getProjects } = require("./projectsGrabber");
const auth = require("../utils/auth");

//An array of fake user info.
const fakes = [
    {
        username: "LukeSkywalker",
        email: "Luke@force.com",
        password: "PieceOfJunk"
    },
    {
        username: "Michael_Jackson",
        email: "mjackson@gmail.com",
        password: "theKINGofpop8"
    },
    {
        username: "Naruto-Uzumaki",
        email: "naruto@leaf.com",
        password: "B3LI3V3-IT"
    },
    {
        username: "yOURgRANDMA",
        email: "elivsfan43@aol.com",
        password: "password123"
    },
    {
        username: "thewintersoldier",
        email: "bucky1917@avengers.com",
        password: "samsucks"
    },
    {
        username: "BigFootWasHere",
        email: "iamreal@yahoo.com",
        password: "fromthePNW"
    },
    {
        username: "jonathanDoeathan",
        email: "fakeityfake@fake.com",
        password: "0pancakes4orwaffles99"
    },
    {
        username: "XxDragonXSniperX69xX",
        email: "zachschoolemail@outlook.com",
        password: "tiktokStar07"
    },
    {
        username: "LilithTheDemoness",
        email: "lilith@hell.com",
        password: "allhailME"
    },
    {
        username: "Hodor",
        email: "hodor@hodor.hodor",
        password: "hodor"
    },
    {
        username: "Sierra117",
        email: "masterchief@halo.com",
        password: "BOOMheadshot"
    }
];

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
        res.render("signup", { fake: fakes[Math.floor(Math.random() * fakes.length)] });
});

//Everything else / 404 page someday.
router.get("*", (req, res) =>
{
    res.redirect("/");
});

//Exports.
module.exports = router;