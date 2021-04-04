//Imports
const router = require('express').Router();
const { User } = require('../../models');
const auth = require("../../utils/auth");

//Create new user.
router.post("/new", async (req, res) =>
{
    try
    {
        //Requires username, email, and password.
        const userData = await User.create(req.body);

        //Logs the user in after creating the profile.
        req.session.save(() =>
        {
            req.session.userId = userData.id;
            req.session.loggedIn = true;

            res.status(200).json(userData);
        });
    }
    catch (err)
    {
        res.status(400).json(err);
    }
});

//Login existing user.
router.post("/login", async (req, res) =>
{
    try
    {
        //Get the info assosiated with the given username.
        const userData = await User.findOne({ where: { username: req.body.username } });

        //if theres no entry matching that username.
        if (!userData)
            res.status(400).json({ message: "Incorrect username or password." });

        //Make sure the passwords match.
        const validPassword = await userData.checkPassword(req.body.password);
        
        //if they don't, don't state that the password is the problem.
        if (!validPassword)
            res.status(400).json({ message: "Incorrect username or password." });

        //Set the session data.
        req.session.save(() =>
        {
            req.session.userId = userData.id;
            req.session.loggedIn = true;

            res.status(200).json(userData);
        });
    }
    catch (err)
    {
        res.status(400).json(err);
    }
});

//Change username.
router.patch("/edit-username", auth, async (req, res) =>
{
    try
    {
        const userData = await User.findByPk(req.session.userId);
        userData.username = req.body;
        await userData.save();
    }
    catch (err)
    {
        res.status(400).json(err);
    }
});

//Change password.
router.patch("/edit-password", auth, async (req, res) =>
{
    try
    {
        const userData = await User.findByPk(req.session.userId);
        userData.password = req.body;
        await userData.save();
    }
    catch (err)
    {
        res.status(400).json(err);
    }
});

//Logout user.
router.post("/logout", auth, (req, res) =>
{
    //Destroy the session.
    req.session.destroy(() =>
    {
        res.status(204).end();
    });
});

//Delete user.
router.delete("/delete", auth, async (req, res) =>
{
    try
    {
        //Get the user data.
        const userData = await User.findByPk(req.session.userId);

        //If we found the user info, then we can delete it as well as the session.
        if (userData)
        {
            userData.destroy();
            req.session.destroy(() =>
            {
                res.status(204).end();
            });
        }
    }
    catch (err)
    {
        res.status(400).json(err);
    }
});

//Exports
module.exports = router;