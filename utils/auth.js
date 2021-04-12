//Function to check that the user is checked in, otherwise direct them to the login page.
function auth (req, res, next)
{
    !req.session.loggedIn ? res.redirect("/login") : next();
}

//Exports.
module.exports = auth;