/* Imports. */

const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

//Create the server object.
const app = express();
const PORT = process.env.PORT || 8008;

//Set up Handlebars.js engine with custom helpers.
const hbs = exphbs.create({ helpers });

//Session db rules.
const sess =
{
    secret: ["super", "extra", "bonus", "extreme", "mega", "uber", "plus", "ultra"],
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({ db: sequelize })
};

app.use(session(sess));

//Handlebars setup.
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

//Express setup.
app.use(express.json());
app.use(express.urlencoded({ extrended: true }));
app.use(express.static(path.join(__dirname, "public")));

//Routes setup.
app.use(routes);

//Start the server.
sequelize.sync({ force: false}).then(() =>
{
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});