//Imports
const sequelize = require("../config/connection");
const { User } = require("../models");

const userData = require("./userData.json");

//Functino to create test data.
async function seedData()
{
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, { individualHooks: true });

    process.exit(0);
}

//Call the function.
seedData();