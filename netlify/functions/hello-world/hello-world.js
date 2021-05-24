const axios = require("axios");

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const handler = async (event) => {
  const name = event.queryStringParameters.name || 'ireade';
  const token = process.env.GITHUB_KEY;
  const body = {
    query: `query {
    user(login:${JSON.stringify(name)}){
      avatarUrl
      createdAt
      bio
      name
      
      email
      repositories(first: 20, orderBy:{field: CREATED_AT, direction:DESC}){
           edges{
            node{
              ... on Repository{
                name,
                id,
                owner{
                  login
                },
                stargazers{
                  totalCount
                },
                primaryLanguage {
                  name
                }
                description
                url
                pushedAt
                updatedAt
                forkCount
               
                
               
              }
            }
          }
      }
      
    }
  }
  `,
  }


  const baseUrl = "https://api.github.com/graphql";

  const headersKey = {
    Authorization: `${token}`
  };


  try {
    
  const {data} = await axios
    .post(baseUrl, JSON.stringify(body), {
      method: "POST",
      headers: headersKey,
    })

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      data
    }
  } catch (error) {
    const { status, statusText, headers, data } = error.response
    return {
      statusCode: status,
      body: JSON.stringify({status, statusText, headers, data})
    }
  }

}

module.exports = { handler }
