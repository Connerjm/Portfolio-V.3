/* Imports */

const Sequelize = require("sequelize");
require("dotenv").config();

// The sequelize object.
let sequelize;

// Setting the object.
if (process.env.JAWSDB_URL)// If Heroku gives the DB.
{
    sequelize = new Sequelize(process.env.JAWSDB_URL);
}
else// Else its a local connection.
{
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: "localhost",
            dialect: "mysql",
            port: 3306
        }
    );
}

// Exports the object.
module.exports = sequelize;