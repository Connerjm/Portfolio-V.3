//Imports
const sequelize = require("../config/connection");
const faker = require("faker");
const { User } = require("../models");

//Functino to create test data.
async function seedData()
{
    const userAmount = 10;//Create 10 fake users.
    const users = [];//An array to hold the created user objects.

    for(let x = 0; x < userAmount; x++)
    {
        let user =
        {
            username: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        }
        users.push(user);
    }

    //Recreate the database.
    await sequelize.sync({ force: true });

    //Bulk create all the user entries.
    await User.bulkCreate(users, { individualHooks: true });

    //Exit when complete.
    process.exit(0);
}

//Call the function.
seedData();