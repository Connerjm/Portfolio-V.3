//Imports.
const express = require("express");
const path = require("path");

//Create the server object.
const app = express();
const PORT = process.env.PORT || 8008;

//Express setup.
app.use(express.json());
app.use(express.urlencoded({ extrended: true }));
app.use(express.static(path.join(__dirname, "public")));

//Strat the server
app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));