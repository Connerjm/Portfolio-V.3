//Imports.
const axios = require("axios");
require("dotenv").config();

//Get projects.
async function getProjects ()
{
    const howManyProjects = 12;
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
                        deployments(first: 1)
                        {
                            nodes
                            {
                                state
                            }
                        }
                    }
                }
            }
        }`;

    //axios call to the github api.
    let projects;
    try
    {
        projects = await axios({
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
        });
    }
    catch (err)
    {
        console.error(err);
    }

    return projects.data;
}

//Exports.
module.exports = { getProjects };