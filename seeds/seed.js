
const sequelize = require("../config/connection");
const { User } = require("../models");

const userData = require("./userData.json");

async function seedData()
{
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, { individualHooks: true });

    process.exit(0);
}

seedData();