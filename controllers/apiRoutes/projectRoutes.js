//Imports.
const router = require("express").Router();
const axios = require("axios");
require("dotenv").config();

//Get projects.
router.get("/", async (req, res) =>
{
    const howManyProjects = 10;
    const myquery =
        `{
            user(login: "connerjm")
            {
                repositories (first: ${howManyProjects}, orderBy:{field: CREATED_AT direction: DESC}, ownerAffiliations: OWNER)
                {
                    nodes
                    {
                        name
                        description
                        openGraphImageUrl
                        url
                    }
                }
            }
        }`;

    //axios call to the github api.
    axios({
        url: "https://api.github.com/graphql",
        method: "post",
        headers: {
            "Content-Type": "application/json","Authorization":
            `bearer ${process.env.GITHUB_TOKEN}`
        },
        data: { query: myquery },
        transformResponse: [(data) =>
        {   //Return only the relevent array of repos.
            return JSON.parse(data).data.user.repositories.nodes;
        }]
    })
        .then((result) => { res.status(200).json(result.data); })
        .catch(err => { res.status(400).json(err); });
});

//Exports.
module.exports = router;